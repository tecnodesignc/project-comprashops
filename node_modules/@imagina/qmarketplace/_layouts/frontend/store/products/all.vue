<template>
   <div class="searchProduct">
      <header-store></header-store>
      <div class="bg-fondo">
         <div class="q-container ">
            <div class="row q-col-gutter-lg q-py-lg">
               <div class="col-md-12 title">
                  <h1 class="text-primary text-center font-family-secondary text-h4 q-mb-sm q-mx-lg">
                     Búsqueda de productos
                  </h1>
               </div>
            </div>
         </div>
         <div class="q-container">
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
         <inner-loading :visible="loading"></inner-loading>
      </div>
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
            let storeSlug = currentRoute.params.slug
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
         let routetitle = this.$route.params.search || 'Productos de la tienda ' + this.storeData.name;
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
      watch: {
         '$route.params.search': {
            handler: function(search) {
               this.init();
            },
            deep: true,
            immediate: true
         }
      },
      mounted() {
         this.init();
      },
      data() {
         return {
            loading: false,
            showProduct: false,
            categoryId: null,
            products: [],
            categories: [],
            paginate: {
               page: 1,
               take: 10,
               minPages: 1,
               maxPages: 0
            },
            search: ''
         }
      },
      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         },
      },
      methods: {
         //Init
         async init() {
           this.loading=true
            await this.getProducts()//Get products
            this.loading=false
         },
         // Get all products by category :slug
         getProducts() {
            return new Promise((resolve, reject) => {
               this.loading = true
               let params = {
                  params: {
                     filter: {
                        storeSlug: this.$route.params.slug,
                        locale: 'es',
                        search:  this.$route.params.search
                     },
                     take: this.paginate.take,
                     page: this.paginate.page,
                  }
               }
               if (this.categoryId) {
                  params.params.filter.categories = [this.categoryId]
               }
               this.$crud.index('apiRoutes.qcommerce.products', params)
                   .then(response => {
                      this.paginate.maxPages = response.meta.page.lastPage
                      this.products = response.data
                      this.loading = false
                      resolve(true);
                   })
                   .catch(error => {
                      this.$alert.error({message: 'Failed: ' + error, pos: 'bottom'})
                      this.loading = false
                      reject(false)//Resolve
                   })//

            })

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

   @media screen and (max-width: $breakpoint-xs)
      .searchProduct
         .title
            padding-top 0

            h2
               font-size 20px
               margin-top 0
               margin-bottom 0
</style>
