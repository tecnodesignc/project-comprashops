<template>
<div class="WAL position-relative bg-grey-4" :style="style" v-if="$q.platform.is.desktop">
  <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
    <q-header elevated>
      <q-toolbar class="bg-grey-3 text-black">
        <q-btn
                round
                flat
                icon="keyboard_arrow_left"
                class="WAL__drawer-open q-mr-sm"
                @click="leftDrawerOpen = true"
        />

        <q-btn round flat>
          <q-avatar>
            <img :src="currentConversation.avatar">
          </q-avatar>
        </q-btn>

        <span class="q-subtitle-1 q-pl-md">
            {{ currentConversation.person }}
          </span>

        <q-space/>
      <!--
        <q-btn round flat icon="search" />
        <q-btn round flat>
          <q-icon name="attachment" class="rotate-135" />
        </q-btn>
        <q-btn round flat icon="more_vert">
          <q-menu auto-close :offset="[110, 0]">
            <q-list style="min-width: 150px">
              <q-item clickable>
                <q-item-section>Contact data</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Block</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Select messages</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Silence</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Clear messages</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Erase messages</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>-->
      </q-toolbar>
    </q-header>

    <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            :breakpoint="690"
    >
      <q-toolbar class="bg-grey-3">
        <q-avatar class="cursor-pointer">
          <img src="https://cdn.quasar.dev/app-icons/icon-128x128.png" />
        </q-avatar>
        <q-space />
      </q-toolbar>



      <q-scroll-area id="users-chat" style="height: calc(100% - 100px)">
        <q-list>
          <q-item
                  v-for="(conversation, index) in conversations"
                  :key="conversation.id"
                  clickable
                  v-ripple
                  class="q-mt-md"
                  @click="currentConversationIndex = index2"
          >
            <q-item-section avatar>
              <q-avatar>
                <img :src="conversation.avatar">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">
                {{ conversation.person }}
              </q-item-label>
              <q-item-label class="conversation__summary" caption>
                <q-icon name="check" v-if="conversation.sent" />
                <q-icon name="not_interested" v-if="conversation.deleted" />
                {{ conversation.caption }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label caption>
                {{ conversation.time }}
              </q-item-label>
              <q-icon name="keyboard_arrow_down" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>

    <q-footer>
      <q-toolbar class="bg-grey-3 text-black row">
        <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
        <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message" placeholder="Type a message" />
        <q-btn round flat icon="mic" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</div>
</template>

<script>

  export default {
    name: 'ChatLayout',
    components:{
      Picker,
    },
    data () {
      return {
        tab: 'chats',
        leftDrawerOpen: false,
        search: '',
        message: '',
        currentConversationIndex: 0,
        conversations: [
          {
            id: 1,
            person: 'Razvan Stoenescu',
            avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
            caption: 'I\'m working on Quasar!',
            time: '15:00',
            sent: true
          },
          {
            id: 2,
            person: 'Dan Popescu',
            avatar: 'https://cdn.quasar.dev/team/dan_popescu.jpg',
            caption: 'I\'m working on Quasar!',
            time: '16:00',
            sent: true
          },
          {
            id: 3,
            person: 'Jeff Galbraith',
            avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
            caption: 'I\'m working on Quasar!',
            time: '18:00',
            sent: true
          },
          {
            id: 4,
            person: 'Allan Gaunt',
            avatar: 'https://cdn.quasar.dev/team/allan_gaunt.png',
            caption: 'I\'m working on Quasar!',
            time: '17:00',
            sent: true
          }
        ],
        echo:null,
        loading: false,
        close:!this.openChat,
        openChat:false,
        minimize:false,
        maximize:false,
        paginate:{
          page: 1,
          take: 20,
          lastPage:0,
        },
        user:this.$store.state.quserAuth.userData,
        conversation: {
          users: [],
          messages: []
        },
        conversationId:null,
        messages: [],
        showEmoji: false,
        maximizedToggle: false,
        text: '',
        form:{
          body: '',
          userId: this.$store.state.quserAuth.userId,
          conversationId:null
        }
      }
    },
    computed: {
      currentConversation () {
        return this.conversations[this.currentConversationIndex]
      },
      style () {
        return {
          height: this.$q.screen.height + 'px'
        }
      },
      storeData(){
        let storeSlug = this.$route.params.slug
        return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
      },
      lastMessage () {
        let lastIndex = this.conversation.messages.length-1
        if ( lastIndex == -1 ){
          return {
            id: null
          }
        }
        return this.conversation.messages[this.conversation.messages.length-1]
      },
    },
    watch:{
      openChat: async function (n) {
        if(this.openChat){
          await this.initconversation ()
          await  this.getConversation(true)
          await  this.getMessagesPaginated(true)
          this.initPusher()
        }
      }
    },
    created() {
      this.messages = []
      if (this.conversationId != null) {
        this.$root.$on("newMessage", message => {
          this.messages.push(message)
        });
      }
    },
    methods:{
      async createMessage(data){
        this.$crud.create('apiRoutes.qchat.messages',data)
                .then( response => {
                  return response.data
                })
                .catch( error => {})
      },
      getConversation(refresh = false){
        this.loading = true
        let params = {
          refresh: refresh,
          params: {
            include: 'messages,users'
          }
        }
        let criteria=this.conversationId;
        this.$crud.show('apiRoutes.qchat.conversations', criteria, params)
                .then( response => {
                  this.conversation = response.data
                  this.loading = false
                })
                .catch( error => {
                  this.loading = false
                })
      },
      getMessagesPaginated(refresh = false){
        this.loading = true
        let params = {
          refresh: refresh,
          params: {
            filter:{
              conversation: this.conversationId,
              order:{
                field: 'created_at',
                way: 'desc'
              }
            },
            page: this.paginate.page,
            take: this.paginate.take,
          }
        }
        this.$crud.index('apiRoutes.qchat.messages', params)
                .then( response => {
                  //this.messages = response.data.reverse()
                  this.paginate.lastPage = response.meta.page.lastPage
                  response.data.forEach(item => {
                    this.messages.unshift(item)
                  })
                  this.loading = false
                  this.animateScroll()
                })
                .catch( error => {
                  this.loading = false
                })
      },
      loadMoreMessage(){
        if (this.paginate.page < this.paginate.lastPage){
          this.paginate.page++
          this.getMessagesPaginated(true)
        }
      },
      getUrlImg(uri){
        return `${config('apiRoutes.api.base_url')}/${uri}`
      },
      isSendMessage(message){
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
      sendMessage(){
        if (this.form.body != ''){
          this.form.conversationId=this.conversationId
          this.loading = true
          this.$crud.create('apiRoutes.qchat.messages', this.form)
                  .then( response => {
                    this.form.body = ''
                    this.messages.push(response.data)
                    this.loading = false
                    this.animateScroll()
                  })
                  .catch( error => {
                    this.loading = false
                  })
        }
      },
      onInput( event ){
        if( !event ){
          return false
        }
        if( !this.form.body ){
          this.form.body = event.native
        }else{
          this.form.body = this.form.body + event.native
        }
        this.showEmoji = false
      },
      async initconversation () {
        let conversation = await this.createConversation()
        this.conversationId=conversation.id
      },
      async createConversation(){
        let res
        let form = {
          users: [
            this.$store.state.quserAuth.userId,
            this.storeData.userId,
          ]
        }
        await this.$crud.create('apiRoutes.qchat.conversations',form)
                .then( response => {
                  res = response.data
                })
                .catch( error => {
                  res = null
                })
        return res
      },
      initPusher(){


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
      closeChat(){
        this.close=!this.close
        this.openChat=!this.openChat
      },
      animateScroll () {
        this.$refs.scrollArea.setScrollPosition(10000000, 300)
      }
    }
  }
</script>

<style lang="sass">
  .WAL
    width: 100%
    height: 100%
    padding-top: 20px
    padding-bottom: 20px
    &__layout
      margin: 0 auto
      z-index: 4000
      height: 100%
      width: 90%
      max-width: 100%
      border-radius: 5px
    &__field.q-field--outlined .q-field__control:before
      border: none
    .q-drawer--standard
      .WAL__drawer-close
        display: none
  @media (max-width: 850px)
    .WAL
      padding: 0
      &__layout
        width: 100%
        border-radius: 0
  @media (min-width: 691px)
    .WAL
      &__drawer-open
        display: none
  .conversation__summary
    margin-top: 4px
  .conversation__more
    margin-top: 0!important
    font-size: 1.4rem
</style>