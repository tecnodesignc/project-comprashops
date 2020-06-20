<template>
   <div>
      <q-card id="qchat-admin" class="qchat"  v-if="conversationId>0">
         <q-bar>
            <div class="cursor-pointer">
               <q-avatar>
                  <img :src="userReceive.smallImage">
               </q-avatar>
               {{userReceive.fullName}}
            </div>
            <inner-loading :visible="loading"/>
         </q-bar>
         <q-card-section>
            <div style="width: 100%; max-width:720px;  height: 450px;  position: absolute; z-index: 10" class="bg-grey-2"
                        v-if="loading">
           <inner-loading :visible="loading"/>
         </div>
            <q-scroll-area ref="scrollArea" style="height: 450px;">

               <q-btn label="Load More" @click="loadMoreMessage()"/>
               <div
                       v-for="(message, index) in messages"
                       :key="index">
                  <q-chat-message
                          bg-color="primary"
                          text-color="white"
                          :name="isSendMessage(message) ? 'me' : message.user.fullName"
                          :avatar="message.user.mainImage"
                          :text="[message.body]"
                          :stamp="message.createdAt"
                          :sent="isSendMessage(message)"
                  />
               </div>
              <q-chat-message
                v-if="loadingMessage"
                name="me"
                :avatar="user.smallImage"
                text-color="white"
                bg-color="primary"
                sent>
                <q-spinner-dots size="2rem" />
              </q-chat-message>
              <q-chat-message
                v-if="loadingMessageSender"
                name="me"
                :avatar="userReceive.smallImage"
                text-color="white"
                bg-color="primary">
                <q-spinner-dots size="2rem" />
              </q-chat-message>

            </q-scroll-area>
         </q-card-section>
         <q-separator/>
         <q-card-actions class="messageSend">
            <div class="relative-position q-pt-lg">
               <picker
                       native
                       v-if="showEmoji"
                       set="emojione"
                       @select="onInput"
                       title="Pick your emoji…"
                       class="absolute-bottom-left"/>
            </div>
            <q-input outlined class="full-width" bottom-slots :readonly="loading"
                     @keyup.enter="sendMessage()"
                     @focus="updateConversation"
                     placeholder="Type Message ... "
                     v-model="form.body" counter maxlength="140" dense>
               <template v-slot:before>
                  <q-avatar>
                     <img :src="user.smallImage">
                  </q-avatar>
                  <q-btn @click="showEmoji=!showEmoji" icon="fas fa-smile" flat color="yellow-8"></q-btn>
               </template>

               <template v-slot:append>
                  <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer"/>
               </template>

               <template v-slot:hint>
                  Field hint
               </template>

               <template v-slot:after>
                  <q-btn round dense flat icon="send" @click="sendMessage()"/>
               </template>
            </q-input>

         </q-card-actions>
      </q-card>
      <q-card class="qchat" v-else style="box-shadow: none;  border-top-left-radius: 20px">
         <q-bar style="min-height: 50px">
            <div class="cursor-pointer">
               <q-avatar>
                  <img :src="$store.getters['qsiteSettings/getSettingMediaByName']('isite::favicon').path"
                       alt="">
               </q-avatar>
            </div>
            <inner-loading :visible="loading"/>
         </q-bar>
         <q-card-section class="q-gutter-md row items-center" style="height: 550px">
            <img :src="$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path"
                 style="max-width: 150px; margin: auto"/>
         </q-card-section>
      </q-card>
   </div>
</template>
<script>
   import {Picker} from 'emoji-mart-vue'
   import Echo from "laravel-echo";
   import Pusher from 'pusher-js';

   export default {
      name: 'ChatComponent',
      components: {
         Picker,
      },
      props: {
        conversationId:{default:0},
        conversationUser:{default:{}}
      },
      data() {
         return {
            echo: null,
            loading: false,
            loadingMessage: false,
            loadingMessageSender: false,
            close: !this.openChat,
            store: null,
            openChat: true,
            minimize: false,
            maximize: false,
            paginate: {
               page: 1,
               take: 20,
               lastPage: 0,
            },
            user: this.$store.state.quserAuth.userData,
            conversation: {
               users: [],
               messages: []
            },
            userReceive: {
               smallImage: this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::favicon').path
            },
            messages: [],
            showEmoji: false,
            maximizedToggle: false,
            text: '',
            form: {
               body: '',
               userId: this.$store.state.quserAuth.userId,
               conversationId: null
            }
         }
      },
      mounted() {
         this.storeData();
          this.updateConversation()
      },
     beforeDestroy(){
       this.disconnectPusher()
     },
      watch: {
        conversationId: async function (n) {
            await this.disconnectPusher()
            await this.getConversation(true)
            await this.getMessagesPaginatedInit(true)
            await this.updateConversation()
         }
      },
      computed: {
         lastMessage() {
            let lastIndex = this.conversation.messages.length - 1
            if (lastIndex == -1) {
               return {
                  id: null
               }
            }
            return this.conversation.messages[this.conversation.messages.length - 1]
         },
      },
      created() {
         this.messages = []
         if (this.conversationId != null) {
            this.$root.$on("newMessage", message => {
               this.messages.push(message)
            });
         }
      },
      methods: {
         async storeData() {
            let params = {
               params: {
                  filter: {}
               }
            }
            let criteria = this.$store.state.qmarketplaceStores.storeSelected;
            this.$crud.show("apiRoutes.qmarketplace.store", criteria, params).then(response => {
               this.store = response.data
            })
         },
         async createMessage(data) {
            this.$crud.create('apiRoutes.qchat.messages', data)
                .then(response => {
                   return response.data
                })
                .catch(error => {
                })
         },
         async getConversation(refresh = false) {
            this.loading = true
           if(!this.conversationId) this.initconversation();
            let params = {
               refresh: refresh,
               params: {
                  include: 'messages,users'
               }
            }
            let criteria = this.conversationId;
            this.$crud.show('apiRoutes.qchat.conversations', criteria, params).then(response => {
               this.conversation = response.data
               this.userReceive = response.data.users.find(user => user.id != this.$store.state.quserAuth.userId);
                this.initPusher(response.data.users.find(user => user.id != this.$store.state.quserAuth.userId))
               this.loading = false
            }).catch(error => {
               this.loading = false
            })
         },
        getMessagesPaginatedInit(refresh = false) {
          this.loadingMessageSender = true

           let params = {
              refresh: refresh,
              params: {
                 filter: {
                    conversation: this.conversationId,
                    order: {
                       field: 'created_at',
                       way: 'desc'
                    }
                 },
                 page: this.paginate.page,
                 take: this.paginate.take,
              }
           }
          this.animateScroll()
           this.$crud.index('apiRoutes.qchat.messages', params)
               .then(response => {
                 this.messages=[]
                  //this.messages = response.data.reverse()
                  this.paginate.lastPage = response.meta.page.lastPage
                  response.data.forEach(item => {
                     this.messages.unshift(item)
                  })
                  this.animateScroll()
                  this.loadingMessageSender = false
               })
               .catch(error => {
                  this.loadingMessageSender = false
               })
        },
         getMessagesPaginated(refresh = false) {
            this.loading = true
            let params = {
               refresh: refresh,
               params: {
                  filter: {
                     conversation: this.conversationId,
                     order: {
                        field: 'created_at',
                        way: 'desc'
                     }
                  },
                  page: this.paginate.page,
                  take: this.paginate.take,
               }
            }
            this.$crud.index('apiRoutes.qchat.messages', params)
                .then(response => {
                   //this.messages = response.data.reverse()
                   this.paginate.lastPage = response.meta.page.lastPage
                   response.data.forEach(item => {
                      this.messages.unshift(item)
                   })
                   this.loading = false
                })
                .catch(error => {
                   this.loading = false
                })
         },


         loadMoreMessage() {
            if (this.paginate.page < this.paginate.lastPage) {
               this.paginate.page++
               this.getMessagesPaginated(true)
            }
         },
         getUrlImg(uri) {
            return `${config('apiRoutes.api.base_url')}/${uri}`
         },
         isSendMessage(message) {
            return message.userId == this.$store.state.quserAuth.userId ? true : false
         },
         updateConversation() {
            let params = {params: {}}
            if (this.conversationUser.lastMessageReaded != null) {
               this.conversationUser.lastMessageReaded = null
               this.$crud.update('apiRoutes.qchat.conversationUser', this.conversationUser.id, this.conversationUser, params).then(response => {
               }).catch(error => {
               })
            }
         },
         sendMessage() {
            if (this.form.body != '') {
              this.animateScroll()
               this.form.conversationId = this.conversationId
               let message=this.$clone(this.form)
               this.form.body = ''
               this.loadingMessage = true
               this.$crud.create('apiRoutes.qchat.messages', message)
                   .then(response => {
                      //this.form.body = ''
                      this.messages.push(response.data)
                      this.loadingMessage = false
                      this.animateScroll()
                   })
                   .catch(error => {
                      this.loadingMessage = false
                   })
            }
         },
         onInput(event) {
            if (!event) {
               return false
            }
            if (!this.form.body) {
               this.form.body = event.native
            } else {
               this.form.body = this.form.body + event.native
            }
            this.showEmoji = false
         },
         async initconversation() {
            let conversation = await this.createConversation()
         },
         async createConversation() {
            let res
            let form = {
               users: [
                  this.$store.state.quserAuth.userId,
                  this.userReceive.id,
               ]
            }
            await this.$crud.create('apiRoutes.qchat.conversations', form)
                .then(response => {
                   res = response.data
                })
                .catch(error => {
                   res = null
                })
            return res
         },
        initPusher(userReceive) {
          this.echo = new Echo({
            broadcaster: env('BROADCAST_DRIVER', 'pusher'),
            key: env('PUSHER_APP_KEY'),
            cluster: env('PUSHER_APP_CLUSTER'),
            encrypted: env('PUSHER_APP_ENCRYPTED'),
          })
          let event = `.notification_${this.$store.state.quserAuth.userData.id}_${userReceive.id}`
          console.error(event)
          this.echo.channel('global').listen(event, message => {
            console.error('message recibed', event)
            this.messages.push(message.data)
            this.animateScroll()
          })
        },
        disconnectPusher(){
           if (this.echo != null ) {
             this.echo.disconnect()
             console.warn('Disconnect Pusher')
           }
        },
        animateScroll() {
          this.$refs.scrollArea.setScrollPosition(10000000, 300)
        }
      }
   }
</script>
<style lang="stylus">
   #qchat-admin
      display block
      border-radius: 20px 0 0 20px;

      .q-bar
         background $grey-5
         height 50px

         .q-avatar
            margin 10px
            font-size 30px
            height: 35px;
            width: 35px;

         .cursor-pointer
            .q-icon
               color $storeSecondary

      .q-avatar
         position: relative
         vertical-align: middle
         display: inline-block
         border-radius: 50%
         font-size: 48px
         height: 45px
         width: 45px

      .messageSend
         border-radius inherit
      .q-scrollarea
          .scroll
            .full-width
                padding-right 15px !important
   .minimizeChat
      height 60px !important

      .q-card__section, .q-card__actions
         display none

   .closeChat
      display none !important
</style>
