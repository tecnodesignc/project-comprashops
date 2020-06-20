<template>
   <div class="row  q-col-gutter-lg">
      <div class="col-xs-6  q-mb-xl text-center" v-for="(product, index) in products" :key="index">
         <product :product="product"></product>
      </div>
   </div>

</template>
<script>
   import product from '@imagina/qmarketplace/_components/themes/02/mainProduct'

   export default {
      name: 'MainP',
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
            //
            let params = {
               //remember: false,
               params: {
                  include: '',
                  filter: {
                     store: this.storeData.id,
                  },
                  take: 2
               }
            };//params
            this.$crud.index("apiRoutes.qcommerce.products", params).then(response => {
               this.products = response.data;
            }).catch(error => {

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
</style>
