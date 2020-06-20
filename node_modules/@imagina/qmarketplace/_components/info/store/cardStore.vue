<template>
   <div>
      <q-card class="card-store" id="card-store">
         <q-img :src="card.info.mainImage.path"/>
         <q-card-section class="text-center">
            <q-avatar size="100px">
               <img :src="card.info.logo.path">
            </q-avatar>
            <div class="text-h6 ellipsis">{{card.info.name}}</div>
            <div class="text-subtitle2 text-grey ellipsis">
               <q-icon name="place" color="primary"/>
               {{card.info.address}}
            </div>
            <q-rating :v-model="card.info.averageRating"  readonly size="30px" color="amber-6"/>
            <div class="q-mt-md" v-if="card.info.categories.length">
               <q-chip color="tertiary" text-color="white" v-for="item in card.info.categories" :key="item.id">{{item.title}}</q-chip>
            </div>
            <div class="q-my-md">
               <router-link :to="{name: 'stores.show',params: {slug: card.info.slug}}" color="primary"
                            class="q-mx-sm q-btn q-btn-item non-selectable no-outline q-mx-sm q-btn--standard q-btn--rectangle bg-primary text-white q-btn--actionable q-focusable q-hoverable">
                  <div class="q-btn__wrapper col row no-wrap q-anchor--skip">
                     <div class="q-btn__content text-center col items-center q-anchor--skip justify-center row">Ver
                        Tienda
                     </div>
                  </div>

               </router-link>
            </div>
            <div class="text-subtitle2 text-grey">{{card.info.slogan}}</div>
            <div class="q-mt-md" v-if="card.info.social.length">
               <div class="text-subtitle2 text-grey ellipsis">
                  <span class="text-primary text-weight-bold q-px-xs">Redes Sociales</span>
               </div>
               <div class="q-pa-md q-gutter-sm">
                  <q-btn round :color="item.color" text-color="white" :icon="item.icon"
                         @click="openUrl(item.url, '_blank')"
                         v-for="(item, i) in card.info.social" :key="i" v-if="item.active"/>
               </div>
            </div>
         </q-card-section>
         <q-separator/>

         <q-card-actions align="around" class="button-footer">
            <q-btn :label="card.info.usersFollowing" stack flat>Seguidores</q-btn>
            <q-btn icon="far fa-thumbs-up"  stack flat v-if="!followedStore"
                   @click="followStore()">segir tienda</q-btn>
            <q-btn icon="far fa-handshake" stack flat v-else>Ya sigues esa tienda</q-btn>

            <q-btn :label="card.info.averageRating" stack flat>Puntos</q-btn>
         </q-card-actions>
      </q-card>


   </div>
</template>
<script>
   import chat from '@imagina/qmarketplace/_components/info/chat'
   import notification from '@imagina/qmarketplace/_components/info/notification'

   export default {
      name: 'card-store',
      props: {card:{default:()=>{return {}}}},
      watch: {},
      components: {
         chat,
         notification
      },
      mounted(){
         this.getFollowedStore()
      },
      data() {
         return {
            pointsAvailables: 0,
            userSelect: [],
            openModalChat: false,
            openModalNotific: false,
            followedStore: false,
         }
      },
      methods: {
        async getFollowedStore() {
           this.loading = true
            this.$crud.index("apiRoutes.qmarketplace.favoriteStore", {
               params: {
                  filter: {
                     userId: this.$store.state.quserAuth.userId,
                     storeId: this.card.info.id
                  }
               }
            }).then(response => {
               if (response.data.length > 0) {
                  this.followedStore = true;
                  this.loading = false
               }
            }).catch(error => {
               //this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
               console.error('GET FAVORITESTORE', error)
               this.loading = false
            });
         },
         followStore() {
            this.$crud.create("apiRoutes.qmarketplace.favoriteStore", {
               userId: this.$store.state.quserAuth.userId,
               storeId: this.card.info.id
            }).then(response => {
               this.followedStore = true;
               this.$alert.success({message: "Ahora sigues esta tienda", pos: 'bottom'})
            }).catch(error => {
               console.error('Create FAVORITESTORE ', error)
               //this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
            });
         },
         openUrl(url, target) {
            return window.open(url, target)
         }
      }
   }
</script>

<style lang="stylus">
   #card-store
      .q-img
         height 150px

      .q-card__section
         margin-top -50px
      .button-footer
         .q-btn
            .q-btn__content
               div
                  font-weight bold
                  color $primary
                  font-size 16px
               .q-icon
                  color $primary
</style>
