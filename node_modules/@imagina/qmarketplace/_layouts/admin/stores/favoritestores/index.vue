<template>
   <q-page class="bg-fondo-q store-page layout-padding">

      <div class="q-container">

         <div class="row q-mb-md">
            <div class="text-h5 text-primary q-mb-xs font-family-secondary">
               Seguidores
            </div>
         </div>

         <div class="row">
            <q-card class="rounded-md q-mb-xl full-width q-py-md">
               <q-card-section class="q-px-xl form-general">

                  <div v-if="!alertContent.active" class="row q-col-gutter-xl">
                     <!-- select -->
                     <div class="col-xs-12 col-sm-6">

                     </div>
                     <!-- buscador -->
                     <div class="col-xs-12 col-sm-6">
                        <q-input
                                rounded
                                dense
                                outlined
                                placeholder="busqueda"
                                v-model="searchText"
                                @keydown.enter="searchInfor()"
                        >
                           <template v-slot:append>
                              <q-icon name="search"/>
                           </template>
                        </q-input>
                     </div>
                  </div>
                  <q-infinite-scroll @load="getUsersByStore" :offset="550" ref="infinityScrollFavoryteUser">
                     <div v-for="(item,i) in items" :key="i">
                        <!-- Users -->
                        <div class="row q-col-gutter-lg q-my-md">

                           <!-- results -->
                           <div class="col-xs-12 col-sm-6" v-for="(result, index) in item.users" :key="index">
                              <!-- USER -->
                              <q-card class="flat bordered">

                                 <q-card-section>

                                    <div class="row text-center card-seguidor">
                                       <div class="col-xs-12 col-md-12 col-lg-4">
                                          <q-avatar size="100px">
                                             <img :src="result.user.mediumImage">
                                          </q-avatar>
                                       </div>
                                       <div class="col-xs-12 col-md-12  col-lg-8">
                                          <div class="text-h6">{{result.user.fullName}}</div>
                                          <div class="text-subtitle2 text-tertiary">Nivel: Club de Conocidos</div>
                                          <div class="text-subtitle2">
                                             <q-icon name="fas fa-envelope" color="primary"/>
                                             {{result.user.email}}
                                          </div>
                                       </div>
                                    </div>

                                 </q-card-section>

                                 <q-separator/>

                                 <q-card-section class="q-pa-none">
                                    <div class="link-profile text-right">
                                       <!-- <q-btn flat label="+ Ver Perfil" :to="{name:'quser.account.public.profile',params:{userId:result.user.id}}" /> -->

                                       <q-btn flat color="primary" class="text-bold" label="+ Ver Perfil"
                                              @click="openProfile(result.user)"/>
                                    </div>
                                 </q-card-section>
                              </q-card>
                              <q-dialog v-model="card.open">
                                 <card-user :card="card"></card-user>
                              </q-dialog>
                           </div>
                        </div>
                     </div>
                  </q-infinite-scroll>
                  <!-- not results -->
                  <div v-if="false" class="col-12">
                     <q-banner class="bg-red q-mx-sm q-mt-xl q-mb-xl">
                        <template v-slot:avatar>
                           <q-icon :name="alertContent.icon" color="white"/>
                        </template>

                        <div class="text-center text-white">
                           NO EXISTEN RESULTADOS DISPONIBLES
                        </div>
                     </q-banner>
                  </div>


                  <!-- msj -->
                  <div v-if="alertContent.active" class="row">
                     <div class="col-12">
                        <q-banner :class="alertContent.color" class="q-mx-sm q-mt-xl q-mb-xl">
                           <template v-slot:avatar>
                              <q-icon :name="alertContent.icon" color="white"/>
                           </template>

                           <div class="text-center text-white">
                              {{alertContent.msj}}
                           </div>
                        </q-banner>
                     </div>
                  </div>

               </q-card-section>
            </q-card>
         </div>
      </div>

      <!--Loading-->
      <inner-loading :visible="loading"/>
   </q-page>
   <!--
   <div id="pageId">
     <crud :crud-data="import('@imagina/qmarketplace/_crud/favoriteStores')"/>
   </div>
   -->

</template>
<script>
   import cardUser from '@imagina/qmarketplace/_components/info/cardUser'

   export default {
      props: {},
      components: {
         cardUser
      },
      watch: {},
      validations() {
         return {}
      },
      mounted() {
         this.$nextTick(function () {
            this.init();
         })
      },
      data() {
         return {
            visible: false,
            page: 1,
            loadingScroll: true,
            items: [],
            totalPage: 0,
            take: 16,
            position: [],
            loading: false,
            success: false,
            card: {
               open: false,
               info: [],
               stars: 2,
            },
            storeId: this.$store.state.qmarketplaceStores.storeSelected ? this.$store.state.qmarketplaceStores.storeSelected : null,
            alertContent: {
               active: false,
               color: 'bg-red',
               icon: 'error',
               msj: 'DEBE TENER UNA TIENDA SELECCIONADA'
            },
            searchText: ''
         }
      },
      methods: {
         // init Method
         async init() {
            this.loading = true
            this.storeId = this.$store.state.qmarketplaceStores.storeSelected ? this.$store.state.qmarketplaceStores.storeSelected : null
            if (this.storeId === null) {
               this.alertContent.active = true
            }
            this.success = true
            this.loading = false
         },
         // Get User By store ID
         getUsersByStore(index, done) {
            return new Promise((resolve, reject) => {
               let currentPage = this.page
               //Validate last page before do request
               if ((currentPage != 1) && (currentPage > this.totalPage)) return this.$refs.infinityScrollFavoryteUser.stop()
               this.visible = true;
               //Params
               let params = {
                  refresh: true,
                  params: {
                     include: 'user',
                     filter: {storeId: this.storeId},
                     take: this.take,
                     page: currentPage
                  }
               }

               this.$crud.index("apiRoutes.qmarketplace.favoriteStore", params)
                   .then(response => {
                      this.items.push({users: response.data});
                      this.totalPage = response.meta.page.lastPage
                      this.page++
                      this.numSlide++
                      this.visible = false;
                      resolve(true)//Resolve
                      done()
                   }).catch(error => {
                  return this.$refs.infinityScrollFavoryteUser.stop()
                  done()
                  console.error("ERROR - GET USERS FROM FAVORITE STORES")
               });
            })
         },
         // search text
         searchInfor() {

            this.loading = true

            this.favoriteUsers = []

            //Params
            let params = {
               refresh: true,
               params: {
                  include: 'user',
                  filter: {
                     search: this.searchText,
                     storeId: this.storeId
                  },
                  take: 5
               }
            }

            this.$crud.index("apiRoutes.qmarketplace.favoriteStore", params).then(response => {
               this.favoriteUsers = response.data

               if (this.favoriteUsers.length == 0)
                  this.$alert.error({message: 'No existen resultados disponbles', pos: 'bottom'})

               this.loading = false

            }).catch(error => {

               this.loading = false

               console.error("ERROR - SEARCH USERS FROM FAVORITE STORES")
               this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})

            })


         },
         openProfile(result) {
            this.card.open = true;
            this.card.info = result;
            this.card.info.fields = this.$helper.convertToFrontField(this.card.info.fields);
         }

      }
   }
</script>
<style lang="stylus">
   .card-seguidor
      @media screen and (max-width: $breakpoint-sm)
         text-align center
</style>
