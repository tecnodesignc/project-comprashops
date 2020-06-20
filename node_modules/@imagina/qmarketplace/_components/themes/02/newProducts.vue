<template>
   <div class="q-mb-xl">
      <div class="bg-primary rounded-sm text-weight-bold q-inline-block text-white q-px-lg q-py-md">
         NUEVO
      </div>
      <div class="row q-col-gutter-md q-pt-lg">
         <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6" v-for="product in products">
            <product :product="product" className="cardProductH"></product>
         </div>
      </div>
   </div>
</template>
<script>
   import product from 'src/components/themes/02/productHorizontal'

   export default {
      name: 'NewProductsComponent',
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
</style>
