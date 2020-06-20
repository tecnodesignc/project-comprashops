<template>
   <div class="featured-products q-mb-xl" v-if="products.length">
      <h4 class="line-text q-mb-lg q-mt-none">
         <hr class="line-store-secondary q-my-none full-width">
         <span class="bg-store-background q-pr-lg">DESTACADOS</span>
      </h4>
      <div class="row q-col-gutter-lg q-py-lg">
         <div class="col-xs-12">
            <carousel autoplay
                      :autoplayTimeout="4000"
                      :loop="true"
                      :centerMode="true"
                      :perPageCustom="[[576, 1], [768, 2], [992, 3]]"
                      navigationNextLabel="<i class='fas fa-angle-right'></i>"
                      navigationPrevLabel="<i class='fas fa-angle-left'></i>">

               <slide v-for="(product,index) in products" :key="index">
                  <product :product="product" className="cardProductTwo"></product>
               </slide>
            </carousel>

         </div>
      </div>
   </div>
</template>
<script>
   import product from '@imagina/qmarketplace/_components/themes/02/product'

   export default {
      name: 'FeaturedProductsComponent',
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
         getProducts() {
            return new Promise((resolve, reject) => {
               let params = {
                  //remember: false,
                  params: {
                     include: '',
                     filter: {
                        store: this.storeData.id,
                        visible: true,
                        order: {
                           field: 'created_at',
                           way: 'desc'
                        }
                     },
                     take: 2
                  }
               };//params
               this.$crud.index("apiRoutes.qcommerce.products", params).then(response => {
                  this.products = response.data;
                  resolve(true)//Resolve
               }).catch(error => {
                  reject(true)//Resolve
               });
            });
         }
      },
      data() {
         return {
            products: []
         }
      }
   }
</script>
<style lang="stylus">
   .theme-layout-02
      .featured-products
         .cardProductTwo
            .text-ellipsis
               white-space normal
         .line-text
            position relative
            color $storeSecondary

            .line-store-secondary
               position absolute
               top 50%
               z-index 0
               @media screen and (max-width: $breakpoint-xs)
                  display none

            span
               position relative
               z-index 2
               font-size 30px
               font-weight bold
               @media screen and (max-width: $breakpoint-sm)
                  font-size 20px

         .VueCarousel-pagination
            position absolute
            top -117px
            text-align right !important
            right -2px

            .VueCarousel-dot-container
               background-color #fff !important
               z-index 9
               padding-left 10px
               padding-right 10px

               .VueCarousel-dot
                  background-color #fff !important
                  border 1px solid $storeSecondary !important
                  padding 0 !important
                  width 15px !important
                  height 15px !important
                  margin 5px

                  &:focus
                     outline 0 !important

               .VueCarousel-dot.VueCarousel-dot--active
                  background-color $storeSecondary !important
</style>
