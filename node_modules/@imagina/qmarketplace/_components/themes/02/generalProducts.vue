<template>
   <div class="general-products">
      <div class="q-container">
         <h4 class="line-text text-center q-mb-lg">
            <hr class="line-store-secondary q-my-none full-width">
            <span class="bg-store-background q-px-lg">LO MÁS RECOMENDADO</span>
         </h4>
      </div>
      <div class="bg-store-primary q-py-lg q-px-sm">
         <div class="q-container">
            <q-infinite-scroll @load="getProducts" :offset="250" ref="infinityScroll">
               <div v-for="(item,i) in items" :key="i">
                  <div class="row q-py-lg" :class="$q.platform.is.desktop ? 'q-col-gutter-lg' : 'q-col-gutter-sm'">
                     <div class="col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3" v-for="product in item.products">
                        <product :product="product" className="cardProductTwo"></product>
                     </div>
                  </div>
               </div>
               <template v-slot:loading v-if="loadingScroll">
                  <div class="row justify-center q-my-md">
                     <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
                  </div>
               </template>
            </q-infinite-scroll>

         </div>
      </div>
   </div>
</template>
<script>
   import product from '@imagina/qmarketplace/_components/themes/02/product'

   export default {
      name: 'GeneralProductsComponent',
      components: {
         product
      },
      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         }
      },
      mounted() {
      },
      methods: {
         getProducts(index, done) {
            return new Promise((resolve, reject) => {
               let currentPage = this.page
               //Validate last page before do request
               if ((currentPage != 1) && (currentPage > this.totalPage)) return this.$refs.infinityScroll.stop()
               let params = {
                  //remember: true,
                  params: {
                     include: '',
                     filter: {
                        store: this.storeData.id,
                     },
                     take: this.take,
                     page: currentPage
                  }
               };//params
               this.$crud.index("apiRoutes.qcommerce.products", params).then(response => {
                  this.items.push({products: response.data})
                  this.totalPage = response.meta.page.lastPage
                  this.page++
                  this.numSlide++
                  done()
                  resolve(true)//Resolve
               }).catch(error => {
                  this.$refs.infinityScroll.stop()
                  reject(true)//Resolve
               });
            });
         }
      },
      data() {
         return {
            products: [],
            loading: false,
            loadingScroll: true,
            page: 1,
            items: [],
            totalPage: 0,
            take: 8,
            numSlide: 0
         }
      }
   }
</script>
<style lang="stylus">
   .theme-layout-02
      .line-text
         position relative
         color $storeSecondary

         .line-store-secondary
            position absolute
            top 50%
            z-index 1
            @media screen and (max-width: $breakpoint-xs)
               display none

         span
            position relative
            z-index 2
            font-size 30px
            font-weight bold
            @media screen and (max-width: $breakpoint-sm)
               font-size 20px

      .general-products
         .VueCarousel-pagination
            .VueCarousel-dot
               background-color #ffffff !important
               padding 5px !important
               width 15px !important
               height 15px !important

               &:focus
                  outline 0 !important

            .VueCarousel-dot.VueCarousel-dot--active
               background-color #ffffff !important

</style>
