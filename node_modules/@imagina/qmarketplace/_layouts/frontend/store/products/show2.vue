<template>
   <div>
      <header-store></header-store>
      <div id="showProductPage" class="q-container">
         <div class="row gutter-x-sm q-mt-md">
            <!--== Content ==-->
            <div id="product" class="col-12">
               <div class="row">
                  <div class="col-12 col-md-6 Image">
                     <lingallery
                             :items="images"
                     />
                  </div>
                  <div class="col-12 col-md-6 attributes q-pl-xl">
                     <h1 class="text-h1">{{productData.name}}</h1>
                     <q-rating size="40px"
                               v-model="productData.averageRating" color="store-secondary"
                               :max="5" @input="val => { rating() }"
                     />
                     <div class="summary q-pt-lg">
                        {{productData.summary}}
                     </div>
                     <add-to-cart :product-id="productData.id" :product-name="productData.name"
                                  :price="productData.price"/>
                                  <div class="relative-position">
                                    <div class="row q-my-sm">
                                      <div class="col-12 text-center">
                                        <q-btn @click="commentProduct=true;" icon="comments"
                                               label="Comentar" color="positive"
                                               />
                                      </div>
                                    </div>
                                  </div>



                  </div>
               </div>
<br>


<q-card>
       <q-tabs
         v-model="tab"
         dense
         class="bg-grey-3 text-grey-7"
         active-color="primary"
         indicator-color="purple"
         align="justify"
       >
         <q-tab name="description" label="Descripción" class="arrowDown text-white" style="
         font-size:18px;
         height: 70px;
         background-color: var(--q-color-tertiary);
         border-radius: 10px;
transform: skew(15deg);
color: #fff;
font-size: 30px;
position: relative;
         " />
         <q-tab name="comments" class="arrowDown text-white" label="Comentarios" style="
         font-size:18px;
         height: 70px;
         background-color: var(--q-color-tertiary);
         border-radius: 10px;
         margin-left: 10px;
transform: skew(15deg);
color: #fff;
font-size: 30px;
position: relative;
         "/>
       </q-tabs>

       <q-tab-panels v-model="tab" animated >
         <q-tab-panel name="description">
           <div class="q-container">
             <div class="row q-pa-lg">
               <div class="col" v-html="productData.description">
               </div>
             </div>
           </div>
         </q-tab-panel>

         <q-tab-panel name="comments">
           <ul id="comments-list" class="comments-list" v-if="comments.length>0">
             <li v-for="comentary in comments">
               <div class="comment-main-level">
                 <div class="comment-avatar"><img
                   :src="comentary.user.smallImage"
                   alt=""></div>
                   <div class="comment-box">
                     <div class="comment-head">
                       <h6 class="comment-name">
                         <a href="#">
                           {{comentary.user.fullName}}
                         </a>
                       </h6>
                       <span>{{comentary.diffTime}}</span>
                     </div>
                     <div class="comment-content">
                       {{comentary.comment}}
                     </div>
                   </div>
                 </div>
               </li>
             </ul>
         </q-tab-panel>

       </q-tab-panels>
     </q-card>

<br>


<!--
<q-splitter
v-model="splitterModel"
style="height: 250px"
>

<template v-slot:before>
  <q-tabs
  v-model="tab"
  vertical
  class="text-teal"
  >
  <q-tab name="description" icon="edit" label="Descripción" />
  <q-tab v-if="comments.length>0" name="comments" icon="comments" label="Comentarios" />
  </q-tabs>
</template>

<template v-slot:after>
  <q-tab-panels
  v-model="tab"
  animated
  swipeable
  vertical
  transition-prev="jump-up"
  transition-next="jump-up"
  >
  <q-tab-panel name="description">
    <div class="q-container">
      <div class="row q-pa-lg">
        <div class="col" v-html="productData.description">
        </div>
      </div>
    </div>
  </q-tab-panel>

  <q-tab-panel name="comments">
    <ul id="comments-list" class="comments-list" v-if="comments.length>0">
      <li v-for="comentary in comments">
        <div class="comment-main-level">
          <div class="comment-avatar"><img
            :src="comentary.user.smallImage"
            alt=""></div>
            <div class="comment-box">
              <div class="comment-head">
                <h6 class="comment-name">
                  <a href="#">
                    {{comentary.user.fullName}}
                  </a>
                </h6>
                <span>{{comentary.diffTime}}</span>
              </div>
              <div class="comment-content">
                {{comentary.comment}}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </q-tab-panel>


  </q-tab-panels>
</template>

</q-splitter> -->


<!--
               <div class="row description q-pt-xl">
                  <div class="col">
                     <h3 class="title-label-tertiary text-center">
                        <div>Descripción</div>
                     </h3>
                     <div class="q-container">
                        <div class="row q-pa-lg">
                           <div class="col" v-html="productData.description">
                           </div>
                        </div>
                     </div>
                  </div>
               </div> -->

               <!-- <div class="row description q-pt-xl" v-if="comments.length>0">
                  <div class="col">
                     <h3 class="title-label-tertiary text-center">
                        <div>Comentarios</div>
                     </h3>

                     <ul id="comments-list" class="comments-list" v-if="comments.length>0">
                       <li v-for="comentary in comments">
                         <div class="comment-main-level">
                           <div class="comment-avatar"><img
                             :src="comentary.user.smallImage"
                             alt=""></div>
                             <div class="comment-box">
                               <div class="comment-head">
                                 <h6 class="comment-name">
                                   <a href="#">
                                     {{comentary.user.fullName}}
                                   </a>
                                 </h6>
                                 <span>{{comentary.diffTime}}</span>
                               </div>
                               <div class="comment-content">
                                 {{comentary.comment}}
                               </div>
                             </div>
                           </div>
                         </li>
                       </ul>

                  </div>
               </div> -->

            </div>
         </div>

                 <!-- Add comment product QDIALOG -->
                 <q-dialog v-model="commentProduct" @hide="commentProduct=false">
                   <q-card>
                     <q-card-section>
                       <div class="text-h6">¿Qué te ha parecido el producto {{productData.name}}?</div>
                     </q-card-section>

                     <q-card-section class="text-center">
                       <div class="input-title">
                         <h5>Añadir un comentario</h5>
                       </div>

                       <q-input class="q-mt-sm" v-model="comment" outlined dense
                       label="Comentario"  type="textarea"/>

                     </q-card-section>

                     <q-card-actions align="right">
                       <q-btn @click="addComment();" flat label="Agregar comentario" color="primary"/>
                       <q-btn flat label="Cancelar" color="secondary" v-close-popup/>
                     </q-card-actions>

                   </q-card>
                 </q-dialog>
         <!--Inner Loading-->
         <inner-loading :loading="loading"></inner-loading>
      </div>
      <footer-store></footer-store>
   </div>
</template>

<script>
   // Components
   import addToCart from '@imagina/qmarketplace/_components/cart/addToCart'
   import headerStore from '@imagina/qmarketplace/_components/themes/header'
   import footerStore from '@imagina/qmarketplace/_components/themes/footer'
   // Services
   import icommerceService from '@imagina/qcommerce/_services/index';
   import {helper} from '@imagina/qhelper/_plugins/helper'

   export default {
      preFetch({store, currentRoute, previousRoute, redirect, ssrContext}) {
         return new Promise(async resolve => {
            //Get data post
            let storeSlug = currentRoute.params.slug
            let slugProduct = currentRoute.params.product
            await store.dispatch('qcrudMaster/SHOW', {
               indexName: `qmarketplace-store-${storeSlug}-product-${slugProduct}`,
               criteria: slugProduct,
               apiRoute: 'apiRoutes.qcommerce.products',
               requestParams: {
                  refresh: true,
                  params: {}
               }
            })

            await store.dispatch('qcrudMaster/SHOW', {
               indexName: `qmarketplace-store-${storeSlug}`,
               criteria: storeSlug,
               apiRoute: 'apiRoutes.qmarketplace.store',
               requestParams: {
                  refresh: true,
                  params: {include: 'categories,user,products,paymentMethods,shippingMethods'}
               }
            })
            resolve(true)
         })
      },
      meta() {
         let slugProduct = this.$route.params.product || false
         let storeSlug = this.$route.params.slug || false
         let routetitle = slugProduct || 'productos'
         let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
         let siteDescription = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-description')
         //Set category data
         let product = this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}-product-${slugProduct}`].data
         if (product) {
            routetitle = product.name
            siteDescription = product.description
         }
         return {
            title: `${routetitle.charAt(0).toUpperCase() + routetitle.slice(1)} | ${siteName}`,
            meta: {
               description: {name: 'description', content: (siteDescription || siteName)},
            },
         }
      },
      props: {},
      components: {
         addToCart,
         footerStore,
         headerStore,
      },
      mounted() {
         this.$nextTick(function () {
            this.getData(),
                this.getDataStore();
                this.getComments();


         })
      },
      watch: {
         $route(to, from) {
            this.getData()
         }
      },
      data() {
         return {
            loading: false,
            productData: false,
            productSelectd: false,
            images:[],
            tab: 'description',
            splitterModel: 20,
            comment:"",
            comments:[],
            commentProduct:false,
            items: [
               {
                  src: 'https://picsum.photos/600/400/?image=0',
                  thumbnail: 'https://picsum.photos/64/64/?image=0',
               },
               {
                  src: 'https://picsum.photos/600/400/?image=10',
                  thumbnail: 'https://picsum.photos/64/64/?image=10'
               },
            ]
         }
      },
      methods: {
        getComments() {
            this.$axios.get(config('apiRoutes.icomments.comments'), {
                params: {
                    filter: {
                        commentableId: this.productData.id,
                        commentableType: "Modules\\Icommerce\\Entities\\Product",
                        order: {
                            field: 'created_at',
                            way: 'desc',
                        }
                    },
                    take: 8
                }
            }).then(response => {
                this.comments = response.data.data;
            }).catch(error => {
                this.$alert.error({message: error.response.data.errors, pos: 'bottom'})
            });
        },
        addComment() {
            if (this.comment != "") {
                this.$axios.post(config('apiRoutes.icomments.comments'), {
                    attributes: {
                        comment: this.comment,
                        commentable_id: this.productData.id,
                        commentable_type: "Modules\\Icommerce\\Entities\\Product"
                    }
                }, {
                    headers: {
                        Authorization: this.$store.state.quserAuth.userToken
                    }
                }).then(response => {
                    this.comment = "";
                    this.$alert.success({message: "Comentario almacenado exitosamente", pos: 'bottom'});
                    this.commentProduct=false;
                    this.getComments();
                }).catch(error => {
                    this.$alert.error({message: error.response.data.errors, pos: 'bottom'})
                });
            }
        },//comment
         //Get data
         getData() {
            return new Promise((resolve, reject) => {
               this.loading = true
               let slugProduct = this.$route.params.product
               let params = {
                  refresh: true,
                  params: {filter: {field: 'slug'}, include: 'productOptions,optionValues'}
               }
               this.$crud.show('apiRoutes.qcommerce.products', slugProduct, params).then(response => {
                  this.productData = response.data//Add data
                  this.productSelectd = response.data.slug//Set product selected
                  let images = [
                     {
                        id: 0,
                        src: this.productData.mainImage.path,
                        thumbnail: this.productData.mainImage.path.replace('.jpg', '_mediumThumb.jpg'),
                     },
                  ]
                  this.productData.gallery.map(function (item, i) {
                     images.push({id: i + 1, src: item.path, thumbnail: item.path})
                  })

                  this.images = images
                  this.loading = false
                  resolve(true)//Resolve
               }).catch(error => {
                  this.$alert.error({message: 'Failed: ' + error, pos: 'bottom'})
                  this.loading = false
                  reject(error)//Resolve
               })
            })
         },
         getDataStore() {
            return new Promise((resolve, reject) => {
               const itemId = this.$clone(this.storeSlug)
               if (itemId) {
                  //Params--
                  let params = {
                     refresh: true,
                     params: {
                        include: 'products,paymentMethods,shippingMethods',
                        filter: {
                           allTranslations: true,
                           field: 'slug',
                        },
                     }
                  }//test
                  //Request
                  this.$crud.show(this.configName, itemId, params).then(response => {
                     this.store = this.$clone(response.data);
                     colors.setBrand('storeprimary', this.store.options.theme_config.color_primary)
                     colors.setBrand('storesecondary', this.store.options.theme_config.color_secondary)
                     colors.setBrand('storebackground', this.store.options.theme_config.background)
                     resolve(true)//Resolve
                  }).catch(error => {
                     this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                     reject(error)//Resolve
                  })
               } else {
                  resolve(true)//Resolve
               }

            }).catch(error => {
            })
         },
         rating() {
            return new Promise((resolve, reject) => {
               this.$axios.post(config('apiRoutes.qcommerce.products') + '/rating/' + this.productData.id, {
                  attributes: {
                     rating: this.productData.averageRating
                  }
               }).then(response => {
                  this.$alert.success({message: "Calificación registrada exitosamente", pos: 'bottom'});
                  this.getData();
                  resolve(true)//Resolve
               }).catch(error => {
                  reject(error)//Resolve
                  this.$alert.error({message: error.response.data.errors, pos: 'bottom'})
               });
            })
         },
      }
   }
</script>

<style lang="stylus">
   #showProductPage
   #comments-list
       margin-top 30px
       position relative
       &:after
           content ''
           position absolute
           background #c7cacb
           bottom 0
           left 27px
           width 7px
           height 7px
           border 3px solid #dee1e3
           -webkit-border-radius 50%
           -moz-border-radius 50%
           border-radius 50%

       li
           margin-bottom 15px
           display block
           position relative

           &:after
               content ''
               display block
               clear both
               height 0
               width 0

       .comment-avatar
           width 65px
           height 65px
           position relative
           z-index 99
           float left
           border 3px solid #FFF
           -webkit-border-radius 4px
           -moz-border-radius 4px
           border-radius 4px
           -webkit-box-shadow 0 1px 2px rgba(0, 0, 0, 0.2)
           -moz-box-shadow 0 1px 2px rgba(0, 0, 0, 0.2)
           box-shadow 0 1px 2px rgba(0, 0, 0, 0.2)
           overflow hidden

           img
               width 100%
               height 100%

       .comment-box
           width 680px
           float right
           position relative
           -webkit-box-shadow 0 1px 1px rgba(0, 0, 0, 0.15)
           -moz-box-shadow 0 1px 1px rgba(0, 0, 0, 0.15)
           box-shadow 0 1px 1px rgba(0, 0, 0, 0.15)

           &:before
               border-width 11px 13px 11px 0
               border-color transparent rgba(0, 0, 0, 0.05)
               left -12px

       .reply-list:before, .reply-list:after
           display none

       .reply-list
           padding-left 88px
           clear both
           margin-top 15px

           li
               &:before
                   content ''
                   width 60px
                   height 2px
                   background #c7cacb
                   position absolute
                   top 25px
                   left -55px

           .comment-avatar
               width 50px
               height 50px

           .comment-box
               width 610px
               width 320px

       .comment-main-level
           &:after
               content ''
               width 0
               height 0
               display block
               clear both

       .comments-list .comment-box:before, .comments-list .comment-box:after
           content ''
           height 0
           width 0
           position absolute
           display block
           border-width 10px 12px 10px 0
           border-style solid
           border-color transparent #FCFCFC
           top 8px
           left -11px

       .comment-box
           .comment-head
               background #FCFCFC
               padding 10px 12px
               border-bottom 1px solid #E5E5E5
               overflow hidden
               -webkit-border-radius 4px 4px 0 0
               -moz-border-radius 4px 4px 0 0
               border-radius 4px 4px 0 0

               i
                   float right
                   margin-left 14px
                   position relative
                   top 2px
                   color #A6A6A6
                   cursor pointer
                   -webkit-transition color 0.3s ease
                   -o-transition color 0.3s ease
                   transition color 0.3s ease

                   &:hover
                       color #03658c

               span
                   float left
                   color #999
                   font-size 13px
                   position relative
                   top 1px

           .comment-name
               color #283035
               font-size 14px
               font-weight 700
               float left
               margin-right 10px

               a
                   color #283035

               &.by-author
                   &:after
                       content 'autor'
                       background #03658c
                       color #FFF
                       font-size 12px
                       padding 3px 5px
                       font-weight 700
                       margin-left 10px
                       -webkit-border-radius 3px
                       -moz-border-radius 3px
                       border-radius 3px

           .comment-content
               background #FFF
               padding 12px
               font-size 15px
               color #595959
               -webkit-border-radius 0 0 4px 4px
               -moz-border-radius 0 0 4px 4px
               border-radius 0 0 4px 4px

       .comment-box .comment-name.by-author, .comment-box .comment-name.by-author a
           color #03658c

      #product
         .arrowDown
            @media screen and (min-width: 760px)
                width 500px
            &:before
                height: 70px;
                background-image:url(https://dondeestaesavaina.com/statics/img/arrow-down-blue.png);
                position: absolute;
                right: 1px;
                width: 55px;
                background-repeat: no-repeat;
                content: '';
                top: 0px;
         .text-h1
            font-size 1.5rem
            font-weight bold
            color $storeprimary

         .summary
            font-size 1rem

         .q-rating
            color $amber-6 !important

         .description
            font-size 1.1rem
      .Image
         figure
            height 400px !important
            .lingallery_spinner
               display: inline-block;
               height 100%
               vertical-align: middle;
            img
               vertical-align: middle;

</style>
