<template>
   <div id="addCartOptions" class="relative-position">
      <!--Select Options Product -->
      <productOptionValues v-model="template.productOptions" :additional-price="additionalPrice"
                           :options="template.options" @input="updateTotal"/>
      <div class="row q-my-sm">
         <div class="col-12">
            <div class="q-my-sm">
               <select-quantity v-model="template.quantity"/>
            </div>
         </div>
      </div>

      <div class="row q-my-sm">
      <!--   <div class="col text-right">
            <spam class="q-ma-none text-primary q-subheading price text-wight-bold">
               $ {{$n(price) }}
            </spam>
         </div>-->
         <div class="col text-right">
            <span class="q-ma-none text-primary q-subheading price text-wight-bold ">
               $ {{$n(price) }}
            </span>
         </div>
      </div>
      <div class="row q-my-sm" v-if="additionalPrice">
         <div class="col-12 text-center">
            <q-btn @click="addCart()" icon="shopping_cart"
                   label="AÑADIR" color="positive"
                   :disable="addCartDisable"/>
         </div>
      </div>
      <!--Loading-->
      <inner-loading :visible="loading"/>
   </div>
</template>

<script>
   //Plugins
   import _cloneDeep from 'lodash.clonedeep'

   // SERVICES
   import commerceServices from '@imagina/qcommerce/_services/index'

   // COMPONENTS
   import productOptionValues from '@imagina/qcommerce/_components/frontend/products/widgets/selectOptionsProduct'
   import selectQuantity from '@imagina/qmarketplace/_components/cart/selectQuantity'

   export default {
      name: 'add-to-cart',
      props: {
         price: {default: 0},
         productId: {default: false},
         addCartDisable: {type: Boolean, default: false},
         additionalPrice: {default: true}
      },
      components: {
         productOptionValues,
         selectQuantity
      },
      watch: {
         productId() {
            this.init()
         }
      },
      data() {
         return {
            loading: false,
            template: {
               productOptions: {},
               quantity: 1,
               total: 0,
               options: [],
            }
         }
      },
      mounted() {
         this.$nextTick(() => {
            this.init()
         })
      },
      computed: {
         initData() {
            return {
               loading: false,
               productOptions: {},
               quantity: 1,
               total: 0,
               options: [],
            }
         },
         updateTotal() {
            if (this.template.productOptions) {
               let optionsTotal = _cloneDeep(this.template.productOptions.total)
               this.template.total = parseInt(this.price) + parseInt(optionsTotal)
            }
         },
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         }
      },
      methods: {
         //Init
         init() {
            this.template = _cloneDeep(this.initData)
            this.template.total = parseInt(this.price)//Add total of product
            this.getOptions()//Get options
         },
         //Get options
         getOptions() {
            this.loading = true
            //Params
            let params = {
               refresh: true,
               params: {
                  filter: {
                     productId: this.productId
                  },
                  include: 'productOptionValues'
               }
            }
            //Request
            this.$crud.index('apiRoutes.qcommerce.productOptions', params).then(response => {
               this.template.options = this.$array.select(response.data)
               this.loading = false
            }).catch(error => {
               this.loading = false
            })
         },
         //Add product to cart
         async addCart() {
            if (!this.template.productOptions.required) {
               this.loading = true
               let formData = {
                  storeId: this.storeData.id,
                  productId: this.productId,
                  quantity: this.template.quantity,
                  productOptionValues: this.template.productOptions.options,
                  price: this.template.total,
               }

               this.$store.dispatch('qmarketplaceCart/SET_PRODUCT_INTO_CART', formData).then(response => {
                  this.$q.dialog({
                     title: 'Producto agregado al carrito!',
                     color: 'positive',
                     ok: 'Ir al carrito',
                     cancel: 'Seguir comprando'
                  }).onOk(() => {
                     this.$router.push({name: 'marketplace.checkout', params:{storeId:this.storeData.id}})
                  }).onCancel(() => {
                     this.init()
                     this.loading = false
                  })
               }).catch(error => {
                  this.$alert.error(error)
                  this.loading = false
               })
            } else this.$alert.error('Faltan opciones requeridas por definir', 'bottom')
         },
      }
   }
</script>

<style lang="stylus">
   #addCartOptions
      .price
         font-size 1.5rem
         font-weight bold
         color $primary

   #selectQuantityComponent
      .q-btn-item
         font-size 15px
         padding 0
         border-radius 20% !important

      .remove
         background $red !important
         color #ffffff !important

      .add
         background $positive!important
         color #fff !important

</style>
