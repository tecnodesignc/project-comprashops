<template>
   <div style="display: inline-block">
      <q-item @click="openChat = !openChat" v-if="type==='1'" clickable>
         <q-item-section avatar class="q-mr-md">
            <q-icon :color="color" size="lg" name="far fa-comment-dots" />
         </q-item-section>
         <q-item-section class="q-pb-lg">
            <div class="text-subtitle1 text-bold">
               ¡Chatea con nosotros ahora!
            </div>
         </q-item-section>
      </q-item>
      <q-item @click="openChat = !openChat" v-else-if="type==='2'" clickable>
         <q-item-section avatar class="q-mr-md">
            <q-icon :color="color" size="lg" name="far fa-comment-dots" />
         </q-item-section>
         <q-item-section>
            <div class="text-subtitle1 text-bold">¿Tienes alguna duda?</div>
            <div class="text-subtitle1">Chatea aquí con la Tienda</div>
         </q-item-section>
      </q-item>
      <q-btn :color="color"  @click="openChat = !openChat" v-else-if="type==='3'" clickable no-caps class="rounded-sm q-py-md q-px-xl">
         <div class="text-subtitle1 q-mb-sm full-width">¿Tienes alguna duda?</div>
         <q-icon size="3em" color="white" name="far fa-comment-dots" />
         <div class="text-subtitle1 q-mt-sm">CHATEA AQUI CON LA TIENDA</div>
      </q-btn>
      <q-item @click="openChat = !openChat" v-else-if="type==='4'" clickable>
         <q-item-section avatar>
            <q-icon :color="color" name="far fa-comment-dots" />
         </q-item-section>
         <q-item-section>
            <div class="text-subtitle1 text-bold">
               ¡Chatea con nosotros ahora!
            </div>
         </q-item-section>
      </q-item>
      <q-btn no-caps flat class=" q-py-sm" @click="openChat = !openChat" v-else-if="type==='5'">
        <q-icon size="3em" color="store-primary" name="far fa-comment-dots" />
        <h5 class="text-store-secondary q-mt-sm q-mb-none full-width">Chatea conmigo ahora</h5>
      </q-btn>
      <q-btn flat icon="far fa-comment-dots" @click="openChat = !openChat" no-caps label="Chatea con la tienda"
             :color="color" v-else-if="$q.platform.is.desktop"/>
      <q-btn flat round dense icon="far fa-comment-dots" @click="openChat = !openChat" :color="color" v-else/>

      <q-card id="qchat" v-bind:class="[!openChat ? 'closeChat':'', minimize?'minimizeChat':'']"
              style="min-width: 300px;">
         <q-bar>
            <div class="cursor-pointer">
               <q-icon name="comment"/>
               {{storeData.name}}
            </div>
            <q-space/>
            <q-btn dense flat icon="minimize" @click="minimize = !minimize"/>
            <q-btn dense flat icon="crop_square" @click="maximizedToggle = !maximizedToggle"/>
            <q-btn dense flat icon="close" v-close-popup @click="closeChat()"/>
         </q-bar>
         <q-card-section>
            <div style="width: 100%; max-width: 340px; height: 250px; position: absolute; z-index: 10" class="bg-grey-2"
                 v-if="loading">
               <inner-loading :visible="loading"/>
            </div>
            <q-scroll-area ref="scrollArea" style="height: 250px; max-width: 340px;">

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
      props: ['color','type'],
      data() {
         return {
           loadingMessage: false,
           loadingMessageSender: false,
            echo: null,
            loading: false,
            close: !this.openChat,
            openChat: false,
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
            conversationId: null,
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
      watch: {
         openChat: async function (n) {
            if (this.openChat) {
               await this.initconversation()
               await this.getConversation(true)
               await this.getMessagesPaginated(true)
               this.initPusher()
            }
         }
      },
      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         },
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
         async createMessage(data) {
            this.$crud.create('apiRoutes.qchat.messages', data)
                .then(response => {
                   return response.data
                })
                .catch(error => {
                })
         },
         getConversation(refresh = false) {
            this.loading = true
            let params = {
               refresh: refresh,
               params: {
                  include: 'messages,users'
               }
            }
            let criteria = this.conversationId;
            this.$crud.show('apiRoutes.qchat.conversations', criteria, params)
                .then(response => {
                   this.conversation = response.data
                   this.loading = false
                })
                .catch(error => {
                   this.loading = false
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
                   this.animateScroll()
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
            this.loading = true
            let conversationsUsers = this.$store.getters['qchatConversation/getConversationsUsers']
                .find(item => {
                   return item.conversationId == this.conversationId;
                })
            let params = {params: {}}
            if (parseInt(conversationsUsers.lastMessageReaded) != null) {
               conversationsUsers.lastMessageReaded = null
               this.$crud.update('apiRoutes.qchat.conversationUser', conversationsUsers.id, conversationsUsers, params)
                   .then(response => {
                      this.loading = false
                   })
                   .catch(error => {
                      this.loading = false
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
            this.conversationId = conversation.id
         },
         async createConversation() {
            let res
            let form = {
               users: [
                  this.$store.state.quserAuth.userId,
                  this.storeData.userId,
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
         initPusher() {
            this.echo = new Echo({
               broadcaster: env('BROADCAST_DRIVER', 'pusher'),
               key: env('PUSHER_APP_KEY'),
               cluster: env('PUSHER_APP_CLUSTER'),
               encrypted: env('PUSHER_APP_ENCRYPTED'),
            })
            this.echo.channel('global')
                .listen(`.notification_${this.$store.state.quserAuth.userData.id}_${this.storeData.userId}`, message => {
                   this.messages.push(message.data)
                   this.animateScroll()
                })
         },
         closeChat() {
            this.close = !this.close
            this.openChat = !this.openChat
         },
         animateScroll() {
            this.$refs.scrollArea.setScrollPosition(10000000, 300)
         },
        disconnectPusher(){
          if (this.echo != null ) {
            this.echo.disconnect()
            console.warn('Disconnect Pusher')
          }
        },
      },
     beforeDestroy() {
       this.disconnectPusher()
     }
   }
</script>
<style lang="stylus">
   #qchat
      position fixed
      display block
      bottom 0
      right 10px
      width: 300px
      z-index: 999999 !important;
      height: 413px
      border-radius: 10px 10px 0 0 !important;

      .q-bar
         background $storePrimary
         height 60px

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

   .minimizeChat
      height 60px !important

      .q-card__section, .q-card__actions
         display none

   .closeChat
      display none !important
</style>
