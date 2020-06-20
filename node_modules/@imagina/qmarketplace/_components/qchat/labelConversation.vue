<template>
  <q-item
    v-if="user"
    clickable
    v-ripple
    @click="goTo">
    <q-item-section avatar>
      <q-avatar class="q-ma-sm">
        <img :src="user.smallImage">
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{user.fullName}} {{conversationUser.lastMessageReaded}} </q-item-label>
    </q-item-section>
    <q-item-section avatar>
      <q-icon
        :color="`${conversationUser.lastMessageReaded ? 'primary' : ''}`"
        name="fas fa-comment-dots" />
    </q-item-section>
  </q-item>
</template>

<script>
  export default {
    components: {},
    props: {
      conversationUser:{
        type: Object,
        required: true,
        default: () => {
          conversation:{
            users:[]
          }
        }
      },
    },
    computed:{
      user (){
        return this.conversationUser.conversation.users.find( user => {
          return user.id !== this.$store.state.quserAuth.userId
        })
      }
    },
    methods:{
      goTo(){
        this.$emit('showConversation', this.conversationUser)
      },
    }
  }
</script>
