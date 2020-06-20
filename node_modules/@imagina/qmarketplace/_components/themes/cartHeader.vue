<template>
   <div id="cartHeader">
      <q-btn-dropdown :loading="loading"
                      split dense
                      :text-color="color"
      >
         <template v-slot:label>
            <div class="row items-center no-wrap">
               <q-icon left name="fa fa-shopping-cart" :color="color"></q-icon>
               <q-badge align="top" class="bg-store-secondary" floating>{{products.length}}</q-badge>
            </div>
         </template>
         <div class="row no-wrap q-pa-md" id="productCartHeader" v-if="products.length">
            <div class="column">
               <q-list>
                  <q-item class="q-my-sm" v-close-popup v-for="product in products" :key="product.id">
                     <q-item-section avatar top>
                        <q-avatar rounded default text-color="white">
                           <img :src="product.mainImage.path" alt="">
                        </q-avatar>
                     </q-item-section>
                     <q-item-section top>
                        <q-item-label lines="1">
                           <span class="text-weight-medium">{{product.name}}</span></q-item-label>
                        <q-item-label class="text-right">
                           <span class="text-weight-bold">Cant.</span>
                           {{product.quantity}}
                        </q-item-label>
                        <q-item-label class="text-right text-weight-bold" color="primary">$ {{$n(product.total)}}
                        </q-item-label>
                     </q-item-section>
                     <q-item-section top side>
                        <div class="text-grey-8 q-gutter-xs">
                           <q-btn @click="deleteProduct(product)" class="" size="12px" flat dense round
                                  icon="delete"></q-btn>
                        </div>
                     </q-item-section>
                  </q-item>
                  <q-separator spaced></q-separator>
                  <q-item class="q-my-md text-right">
                        <div class="text-grey-8 q-gutter-xs">
                           <q-item-label class="text-weight-bold total" color="primary"><span class="text-primary">Total a Pagar: </span>$ {{$n(cart.total)}}</q-item-label>
                        </div>
                  </q-item>
                  <q-item class="q-my-sm">
                     <q-btn
                             @click="$router.push({name: 'marketplace.checkout', params:{storeId:storeData.id}})"
                             color="primary"
                             label="Ir a Pagar"
                             push
                             size="md"
                             v-close-popup
                             style="margin: auto"
                     ></q-btn>
                  </q-item>
               </q-list>

            </div>


         </div>
      </q-btn-dropdown>

   </div>
</template>
<script>

   export default {
      name: 'CardUserComponent',
      props: {
         color: {default: "white"}
      },
      data() {
         return {
            loading: false,
         }
      },

      mounted() {
         this.$nextTick(function () {
            this.init()
         })
      },

      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$clone(this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data)
         },
         cart() {
            return this.$clone(this.$store.state.qmarketplaceCart.cart)
         },
         products() {
            return this.$clone(this.cart && this.cart.products ? this.cart.products : [])
         },
      },
      methods: {
         async init() {
            this.loading = true
            await this.$store.dispatch('qmarketplaceCart/GET_CART', this.storeData.id);
            this.loading = false
         },
         async deleteProduct(product) {
            this.loading = true

            this.$q.dialog({
               title: `Esta seguro de eliminar  ${product.name} del carrito!`,
               color: 'negative',
               ok: 'Eliminar',
               cancel: 'Cancelar'
            }).onOk(() => {
               this.loading = true
               product.storeId=this.storeData.id
               this.$store.dispatch('qmarketplaceCart/DEL_PRODUCT_FROM_CART', product).then(response => {
                 this.loading = false
               }).catch(error => {
                  this.$alert.error(error)
                  this.loading = false
               })
            }).onCancel(() => {
               this.init()
               this.loading = false
            })

         },
      }
   }
</script>

<style lang="stylus">
   #cartHeader
      .q-btn-group
         box-shadow: none

      .q-btn-dropdown__arrow
         display block !important

      .q-btn-dropdown--split .q-btn-dropdown__arrow-container
         border-left 0   

   #productCartHeader
      .total
         font-size 15px !important
</style>
