<template>
   <div style="display: inline-block">
      <q-btn @click="openChat = !openChat" color="primary"
             class="q-mx-sm">enviar mensaje
      </q-btn>
      <q-dialog v-model="openChat" >
         <q-card class="q-pa-lg bg-fondo" style="height: 51vh; max-width: 450px; width: 100% ">
            <q-toolbar>
               <q-btn flat v-close-popup color="primary" round dense icon="fas fa-arrow-left"/>
               <q-toolbar-title class="text-primary font-family-secondary">Enviar Mensajes</q-toolbar-title>
            </q-toolbar>
            <q-card id="qchats"
                    style="width: 100%;  margin: auto">
               <q-bar class="bg-primary text-white">
                  <div class="cursor-pointer">
                     <q-icon name="comment"/>
                     {{userSelect.fullName}}
                  </div>
                  <q-space/>
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
         </q-card>
      </q-dialog>

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
      props: ['userSelect'],
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
                  this.userSelect.id,
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
                .listen(`.notification_${this.$store.state.quserAuth.userData.id}_${this.userSelect.id}`, message => {

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

      display block
      width: 350px
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
