<template>
   <q-page class="page-chat">
      <div class="q-py-xs">
         <div class="q-container">
            <div class="row">
               <div class="col-12">
                  <div class="text-h5 text-primary q-mb-xs font-family-secondary">
                    Chat
                  </div>
               </div>
               <div class="col-12">
                  <q-card class="rounded-md bg-white full-width q-my-sm">
                     <div class="row gutter-md justify-center">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 card-border-right">
                           <chat
                             :conversationUser="currentConversation"
                             :conversation-id="currentConversation.conversationId"/>
                        </div>
                        <div
                          class="col-xs-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 bg-light"
                          style="border-bottom-right-radius: 20px;">
                           <q-toolbar
                             class="bg-grey-9 text-white q-pr-none"
                             style="border-top-right-radius: 20px;">
                              <q-btn
                                flat
                                icon="fas fa-arrow-left"/>
                              <q-toolbar-title>
                                 Mensajes directos
                              </q-toolbar-title>
                           </q-toolbar>
                           <q-card-section class="userMessages">
                             <q-input
                               outlined
                               placeholder="Búsqueda"
                               bg-color="white"
                               class="full-width q-mb-lg"
                               v-model="search"
                               dense>
                               <q-btn round color="primary" flat icon="search"/>
                             </q-input>
                             <q-scroll-area ref="scrollArea" style="height: 450px;">
                               <q-list no-border>
                                 <labelConversation
                                   :class="`${currentConversation.conversationId == conversation.conversationId ? 'bg-grey text-white rounded-borders' : ''}`"
                                   @showConversation="handlerShowConversation"
                                   :conversationUser="conversation"
                                   v-for="(conversation, index) in conversationsUsersFiltered"
                                   :key="index"/>
                               </q-list>
                             </q-scroll-area>
                             <inner-loading :visible="loading"/>
                           </q-card-section>
                        </div>
                     </div>
                  </q-card>
               </div>
            </div>
         </div>
      </div>
   </q-page>
</template>

<script>
  import chat from '@imagina/qmarketplace/_components/admin/qchat/chat'
  import labelConversation from '@imagina/qmarketplace/_components/qchat/labelConversation'
  import Echo from "laravel-echo";

  export default {
    components:{
      chat,
      labelConversation
    },
    data () {
      return {
        search: '',
        echo: null,
        loading: false,
        conversationsUsers: {
          data: [],
          filter:''
        },
        currentConversation: {
          conversationId: null
        },
      }
    },
    created() {
      this.$nextTick( () => {
        this.getData(true)
        this.initPusher()
      })
    },
    computed: {
      conversationsUsersFiltered () {
        let data = [...this.conversationsUsers.data]
        return data.filter( item => {
          return item.conversation.users.find( user => {
            return user.fullName.toLowerCase().includes(this.search.toLowerCase())
          })
        })
      }
    },
    methods:{
      getData (refresh = false) {
        let params = {
          refresh: refresh,
          params: {
            filter: this.conversationsUsers.filter,
            include: 'conversationsusers',
          },
        }
        this.loading = true
        this.$crud.show('apiRoutes.qchat.users', this.$store.state.quserAuth.userId, params).then( response => {
          this.conversationsUsers.data  = this.orderConversations(response.data.conversationsusers, 'lastMessageReaded')
          this.loading = false
        }).catch( error => {
          this.loading = false
        })
      },
      initPusher () {
        this.echo = new Echo({
          broadcaster: env('BROADCAST_DRIVER', 'pusher'),
          key: env('PUSHER_APP_KEY'),
          cluster: env('PUSHER_APP_CLUSTER'),
          encrypted: env('PUSHER_APP_ENCRYPTED'),
        })
        this.echo.channel('global').listen(`.conversationsUserUpdated${this.$store.state.quserAuth.userData.id}`, response => {
          this.getData(true)
        })
      },
      orderConversations(data, key){
        return data.sort((a,b) => {
          if(b[key] == null){
            return -1
          }
          let response = 0;
          let aValue = parseInt(a[key])
          let bValue = parseInt(b[key])
          if (aValue > bValue) {
            response = 1;
          } else if (aValue < bValue) {
            response = -1;
          }
          return response * -1
        })
      },
      handlerShowConversation (event) {
        this.currentConversation = event
      }
    }
  }

</script>

