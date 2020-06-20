<template>
   <q-page class="bg-fondo best-companies">
      <div class=" q-py-xl q-container">
         <div class="row">
            <div class="col-12">
               <div class="text-h5 text-primary q-mb-md font-family-secondary">Mejores Empresas</div>
            </div>
            <div class="col-12">
               <q-card class="rounded-md bg-white q-mb-xl">
                  <q-card-section>
                     <div class="row">
                        <div class="col-xs-12 col-sm-4 q-px-sm filters">
                           <q-select
                                   outlined
                                   v-model="filter.categories"
                                   :options="cateOption"
                                   stack-label
                                   clearable
                                   map-options
                                   emit-value
                                   use-input
                                   @filter="(val, update)=>update(()=>{cateOption = $helper.filterOptions(val,categoryOptions,filter.categories)})"
                                   @input="getFilter"
                                   label="Filtrar Por Categoria"
                           />
                        </div>
                     </div>
                  </q-card-section>
                  <q-card-section class="q-pa-lg">
                     <div style="min-height: 550px">
                        <q-infinite-scroll @load="getStores" :offset="550" ref="infinityScrollOfferStore">
                           <ul v-for="(item,i) in items" :key="i">
                              <li v-for="(item,i) in item.stores" :key="item.id">
                                 <div class="row q-col-gutter-md items-center" v-if="$q.platform.is.desktop">
                                    <div class="col text-truncate">
                                       <div class="row">
                                          <div class="col-xs-12 col-md-3 col-xl-2 text-truncate">
                                             <q-avatar round class="bg-white mx-auto">
                                                <img :src="item.logo.path" width="100%">
                                             </q-avatar>
                                          </div>
                                          <div class="col-xs-12 col-md-9 col-xl-10 ">
                                             <div class="row"><span class="text-primary text-bold ">{{item.name}}</span>
                                             </div>
                                             <div class="row">{{item.slogan}}</div>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="col-xs-2 text-truncate">
                                       <div class="row">
                                          <div class="col-xs-12 col-md-10 col-xl-11 ">
                                             <div class="row"><span class="text-primary text-bold ">Categoria</span>
                                             </div>
                                             <div class="row" v-if="item.categories[0].title">
                                                {{item.categories[0].title}}
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="col-xs-2 text-truncate">
                                       <div class="row">
                                          <div class="col-xs-12 col-md-10 col-xl-11 ">
                                             <div class="row"><span class="text-primary text-bold ">Nivel</span>
                                             </div>
                                             <pre>{{item.sumRating}}</pre>
                                             <!-- <div class="row" v-if="item.level.name">{{item.level.name}}</div>-->
                                          </div>
                                       </div>
                                    </div>
                                    <div class="col-xs-1 text-truncate">
                                       <div class="row">
                                          <div class="col-xs-12 col-md-10 col-xl-11 ">
                                             <div class="row"><span class="text-primary text-bold ">Puntos</span>
                                             </div>
                                             <div class="row">{{item.averageRating}}/{{item.countRatings}}</div>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="col-xs-1 text-truncate">
                                       <div class="row">
                                          <div class="col-xs-12 col-md-10 col-xl-11 ">
                                             <div class="row"><span class="text-primary text-bold ">Seguidores</span>
                                             </div>
                                             <div class="row">{{item.usersFollowing}}</div>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="col-xs-1 text-truncate">
                                       <div class="row">
                                          <div class="col-xs-12 col-md-10 col-xl-11 ">
                                             <div class="row"><span class="text-primary text-bold ">Ventas</span>
                                             </div>
                                             <div class="row">{{item.completedOrders}}</div>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="col-auto">
                                       <q-btn dense round icon="fas fa-eye" class="q-mr-sm q-pa-xs"
                                              size="10px" color="primary"
                                              :to="{name:'stores.show',params:{slug:item.slug}}"/>
                                    </div>
                                 </div>
                                 <div class="row q-col-gutter items-center" v-else>
                                    <div class="col-12">
                                       <div class="row q-mb-sm">
                                          <div class="row">
                                             <div class="col-xs-12 text-center">
                                                <q-avatar round class="bg-white mx-auto" size="100px">
                                                   <img :src="item.logo.path">
                                                </q-avatar>
                                             </div>
                                             <div class="col-xs-12">
                                                <div class="row"><span
                                                        class="text-primary text-bold ">{{item.name}}</span>
                                                </div>
                                                <div class="row">{{item.slogan}}</div>
                                             </div>
                                          </div>
                                       </div>
                                       <div class="row q-col-gutter-md q-mb-sm">
                                          <div class="col-3 text-truncate">
                                             <div class="row">
                                                <div class="col-xs-12">

                                                   <div class="row"><span class="text-primary text-bold ">Nivel</span>
                                                   </div>
                                                   <div class="row">{{item.levelName}}</div>

                                                </div>
                                             </div>
                                          </div>
                                          <div class="col-3 text-truncate">
                                             <div class="row">
                                                <div class="col-xs-12">
                                                   <div class="row"><span class="text-primary text-bold ">Puntos</span>
                                                   </div>
                                                   <div class="row">{{item.averageRating}}/{{item.countRatings}}</div>
                                                </div>
                                             </div>
                                          </div>
                                          <div class="col-3 text-truncate">
                                             <div class="row">
                                                <div class="col-xs-12 col-md-10 col-xl-11 ">
                                                   <div class="row"><span
                                                           class="text-primary text-bold ">Seguidores</span>
                                                   </div>
                                                   <div class="row">{{item.usersFollowing}}</div>
                                                </div>
                                             </div>
                                          </div>
                                          <div class="col-3 text-truncate">
                                             <div class="row">
                                                <div class="row">
                                                   <div class="col-xs-12 col-md-10 col-xl-11 ">
                                                      <div class="row"><span
                                                              class="text-primary text-bold ">Ventas</span>
                                                      </div>
                                                      <div class="row">{{item.completedOrders}}</div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <div class="row q-mb-sm">
                                          <div class="col text-center">
                                             <div class="row">
                                                <div class="col text-center">
                                                   <q-btn dense size="md"
                                                          label="Ir a Tienda" color="primary" :to="item.link"/>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </li>
                           </ul>
                           <template v-slot:loading v-if="loadingScroll">
                              <div class="row justify-center q-my-md">
                                 <q-spinner-dots color="primary" size="40px"/>
                              </div>
                           </template>
                        </q-infinite-scroll>

                     </div>
                  </q-card-section>
                  <inner-loading :visible="loading"/>

               </q-card>
            </div>
         </div>

      </div>
   </q-page>
</template>
<script>

   export default {
      components: {},
      meta() {
         let routetitle = this.$route.params.slug || 'Mejores Empresas'
         let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
         let siteDescription = "Listado de las mejores empresas"
         let iconHref = this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::favicon').path
         //Set category data
         return {
            title: `${routetitle.charAt(0).toUpperCase() + routetitle.slice(1)} | ${siteName}`,
            meta: {
               description: {name: 'description', content: (siteDescription || siteName)},
            },
         }
      },
      mounted() {
         this.$nextTick(function () {
            this.init()
         })
      },
      data() {
         return {
            loading: false,
            filter: {
               categories: null,
            },
            visible: false,
            page: 1,
            loadingScroll: true,
            items: [],
            totalPage: 0,
            take: 16,
            categoryOptions: [],
            cateOption: [],
         }
      },
      computed: {},
      methods: {
         async init() {
            await this.getCategoryStore()
         },
         getStores(index, done) {
            return new Promise((resolve, reject) => {
               let currentPage = this.page
               //Validate last page before do request
               if ((currentPage != 1) && (currentPage > this.totalPage)) return this.$refs.infinityScrollOfferStore.stop()
               this.visible = true;

               let params = {
                  refresh: true,
                  params: {
                     include: 'categories',
                     filter: {
                        categories: this.filter.categories,
                        rating: 'top'
                     },
                     take: this.take,
                     page: currentPage
                  }
               }
               //Request
               this.$crud.index('apiRoutes.qmarketplace.store', params).then(response => {

                  this.items.push({stores: response.data})
                  this.totalPage = response.meta.page.lastPage
                  this.page++
                  this.numSlide++
                  this.visible = false;
                  resolve(true)//Resolve
                  done()
               }).catch(error => {
                  console.error('ERROR GET STORES:'+error)
                  return this.$refs.infinityScrollOfferStore.stop();
                  done()
               })
            })
         },
         getFilter() {
            this.items = [];
            this.page= 1,
            this.getStores({},function () {});
         },
         getCategoryStore() {
            return new Promise((resolve, reject) => {
               let params = {
                  params: {
                     filter: {},
                     include: ''
                  }
               };
               let child = [];
               this.$crud.index("apiRoutes.qmarketplace.category", params).then(response => {
                  this.categoryOptions = this.$array.select(response.data, {label: 'title', id: 'id'})
                  this.cateOption = this.$clone(this.categoryOptions)
                  resolve(true);
               }).catch(error => {
                  this.loading = false
                  console.error('[ERROR - GET STORES SEARCH] ', error)
                  this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                  reject(error)//Resolve
               })
            });
         },
      },
   }
</script>

<style lang="stylus">
   .best-companies
      .q-list
         padding 0

      .q-collapsible-sub-item
         background white
         padding 8px 0 8px 35px

         .mesageNotification
            padding 15px

      ul
         list-style none
         padding-left 0

         li
            border 1px solid $primary
            padding 20px
            border-radius 10px
            margin-bottom 20px

      .filters
         font-size 12px
      @media screen and (max-width: $breakpoint-xs)
         ul
            li
               .q-avatar
                  font-size 12px
</style>
