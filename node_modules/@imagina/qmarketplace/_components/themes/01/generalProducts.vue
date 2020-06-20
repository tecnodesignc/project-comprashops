<template>
   <div class="bg-light q-py-lg q-px-md">
      <h4 class="text-center block-title-2 text-store-secondary">
         PRODUCTOS
      </h4>
      <div class="q-container">
         <q-infinite-scroll @load="getProducts" :offset="250" ref="infinityScroll">
            <div v-for="(item,i) in items" :key="i">
               <div class="row q-col-gutter-lg q-py-lg">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3" v-for="product in item.products">
                     <product :product="product" className="cardProductOne"></product>
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
</template>
<script>
   import product from '@imagina/qmarketplace/_components/themes/01/product'

   export default {

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
         this.getProducts();
      },
      methods: {
         getProducts(index, done) {
            let currentPage = this.page
            //Validate last page before do request
            if ((currentPage != 1) && (currentPage > this.totalPage)) return this.$refs.infinityScroll.stop()
            let params = {
               //remember: false,
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
            }).catch(error => {
               return this.$refs.infinityScroll.stop()
               done()
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
   .block-title-2
      font-size 24px
      font-weight: bold

      &:after
         content: "•";
         display: inline-block;
         padding-left: 36px;
         vertical-align: initial;


      &:before
         content: "•";
         display: inline-block;
         padding-right: 36px;
         vertical-align: initial;


</style>
