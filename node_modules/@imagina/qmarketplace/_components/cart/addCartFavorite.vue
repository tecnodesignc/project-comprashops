<template>
   <div id="addCartOptions">
      <q-btn v-if="favorite" flat dense icon="favorite" :text-color="color" @click="addFavorite()"/>
      <q-btn v-if="addCartDisable" @click="addCart()"
             icon="shopping_cart"
             flat dense
             :loading="loading"
             :text-color="color"
             label="COMPRAR"
      >
         <template v-slot:loading>
            <q-spinner-facebook></q-spinner-facebook>
         </template>
      </q-btn>
   </div>
</template>

<script>

   export default {
      name: 'add-cart-favorite',
      props: {
         price: {default: 0},
         productId: {default: false},
         addCartDisable: {type: Boolean, default: true},
         favorite: {type: Boolean, default: true},
         color: {default: "white"}
      },
      components: {},
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
            this.template = this.$clone(this.initData)
            this.template.total = parseInt(this.price)//Add total of product
         },
         //Add product to cart
         async addCart() {
            this.loading = true
            let formData = {
               storeId: this.storeData.id,
               productId: this.productId,
               quantity: 1,
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
         },
         addFavorite() {
            return new Promise((resolve, reject) => {

               this.visible = true
               let formData = {
                  storeId: this.storeData.id,
                  productId: this.productId,
                  userId:this.$store.state.quserAuth.userId,
               }

               this.$crud.create('apiRoutes.qcommerce.wishlists',formData).then(response => {
                  this.$q.dialog({
                     title: 'Producto agregado a su lista de deseo!',
                     color: 'positive',
                  }).onOk(() => {
                     this.visible = false
                     resolve(true)//Resolve
                  })

               }).catch(error => {
                  this.$q.dialog({
                     title: 'Producto ya existe en su lista de deseo, ¿Desea Eliminarlo?!',
                     color: 'negative',
                     ok: 'Eliminar',
                     cancel: 'Cancel'
                  }).onOk(() => {
                     this.removeFavorite()
                  }).onCancel(() => {
                     this.visible = false
                     resolve(true)//Resolve
                  })

               })
            });
         },
         removeFavorite() {
            return new Promise((resolve, reject) => {
               //console.warn(this.productId)
               this.visible = true
               let params = {
                  params: {
                     filter: {
                        field: 'product_id'
                     }
                  }
               }
               let criteria=this.productId

               this.$crud.delete('apiRoutes.qcommerce.wishlists',criteria,params).then(response => {
                  this.$q.dialog({
                     title: 'Producto eliminado de sus lista de deseo!',
                     color: 'negative',
                  }).onOk(() => {
                     this.visible = false
                     resolve(true)//Resolve
                  })

               }).catch(error => {
                  reject(false)
                /*  this.$q.dialog({
                     title: 'Producto ya existe en su lista de deseo!',
                     color: 'negative',
                  }).onOk(() => {
                     this.visible = false
                     reject(false)//Resolve
                  })*/

               })
            });
         }
      }
   }
</script>

<style lang="stylus">
   #addCartOptions
      display inline-block
      .q-btn__content > div
         display none
</style>
