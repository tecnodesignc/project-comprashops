<template>
   <div class="bg-grey-2">
      <header-store></header-store>
      <div class="q-container">
         <h4 class="title-label bg-store-secondary text-white text-center"><div>Lista de deseo</div></h4>
         <div class="row q-col-gutter-lg q-py-lg">
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3" v-if="products.length"
                 v-for="product in products" :key="product.id">
               <product :product="product" className="cardProductH" color-btn="store-primary"></product>
            </div>
            <div
                    class="row"
                    v-else>
               <div class="col-md-12">
              <span class="q-display-1">
                No hay productos que concuerden con la selección.
              </span>
               </div>
            </div>
            <div
                    class="row"
                    v-if="paginate.maxPages > 1">
               <div class="col-md-12 flex justify-end q-pt-xl">
                  <q-pagination
                          direction-links
                          @input="getProducts()"
                          v-model="paginate.page"
                          :min="paginate.minPages"
                          :max="paginate.maxPages"/>
               </div>
            </div>
         </div>
      </div>
      <!--Inner Loading-->
      <inner-loading :visible="visible"></inner-loading>
      <footer-store></footer-store>
   </div>
</template>

<script>
   import icommerceService from '@imagina/qcommerce/_services/index';
   import product from '@imagina/qmarketplace/_components/themes/01/product'
   import headerStore from '@imagina/qmarketplace/_components/themes/header'
   import footerStore from '@imagina/qmarketplace/_components/themes/footer'

   export default {
      preFetch({store, currentRoute, previousRoute, redirect, ssrContext}) {
         return new Promise(async resolve => {
            //Get data post
            let storeSlug = currentRoute.params.slug || false
            await store.dispatch('qcrudMaster/SHOW', {
               indexName: `qmarketplace-store-${storeSlug}`,
               criteria: storeSlug,
               apiRoute: 'apiRoutes.qmarketplace.store',
               requestParams: {
                  refresh: true,
                  params: {include: 'categories,user,products'}
               }
            })
            resolve(true)
         })
      },
      meta() {
         let routetitle = 'Lista de Deseo'
         let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
         let siteDescription = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-description')

         return {
            title: `${routetitle.charAt(0).toUpperCase() + routetitle.slice(1)} | ${siteName}`,
            meta: {
               description: {name: 'description', content: (siteDescription || siteName)},
            },
         }
      },
      components: {
         product,
         footerStore,
         headerStore,
      },
      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         }
      },
      watch: {},
      mounted() {
         this.$nextTick(() => {
            this.init()
         })
      },
      data() {
         return {
            showProduct: false,
            visible: false,
            products: [],
            paginate: {
               page: 1,
               take: 12,
               minPages: 1,
               maxPages: 0
            },
         }
      },
      methods: {
         //Init
         init() {
            this.getProducts()//Get products
         },
         // Get all products by category :slug
         getProducts() {
            return new Promise((resolve, reject) => {
               this.visible = true
               let params = {
                  params: {
                     filter: {
                        store: this.storeData.id,
                        user: this.$store.state.quserAuth.userId,
                     },
                     take: this.paginate.take,
                     page: this.paginate.page,
                  }
               }

               this.$crud.index('apiRoutes.qcommerce.wishlists', params).then(response => {
                  //console.warn(response.data)
                  this.paginate.maxPages = response.meta.page.lastPage
                  this.products =  response.data.map( item => {
                         return item.product
                      })
                 //console.warn(this.products)
                  this.visible = false
                  resolve(true)//Resolve
               }).catch(error => {
                  this.$alert.error({message: 'Failed: ' + error, pos: 'bottom'})
                  this.visible = false
                  reject(false)//Resolve
               })
            });
         }

      }
   }

</script>

<style lang="stylus">
   div.product
      cursor pointer

   .product-img
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%
      height 260px
      border: 1px solid #dddddd52
      border-radius 10px

   .btn-product
      margin-top 240px

   .color-secondary
      color: $secondary

   .color-primary
      color: $secondary

</style>
