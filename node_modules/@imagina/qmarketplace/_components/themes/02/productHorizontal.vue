<template>
   <q-card :class="className">
      <q-card-main class="q-pb-lg">
         <div class="row gutter-sm">
            <div class="col-6">
               <q-card-media>
                  <div class="ratio-1">
                     <img :src="product.image">
                  </div>
               </q-card-media>
            </div>
            <div class="col-6">
               <p class="q-my-none text-truncate">{{product.name}}</p>
               <q-rating size="20px"
                         v-model="product.averageRating" color="store-secondary"
                         :max="5" @input="val => { rating() }"
               />
               <p class="q-my-none text-truncate"><small>{{product.tienda}}</small></p>
               <h5 class="q-my-sm">${{$n(product.price)}}</h5>

               <q-card-actions>
                  <q-btn @click="addCart" color="store-secondary" label="COMPRAR" icon="shopping_cart"/>
               </q-card-actions>
            </div>
         </div>
      </q-card-main>
   </q-card>
</template>
<script>
   export default {
      name: 'ProductHorizontalComponent',
      props: ['product', 'className'],
      mounted() {
      },
      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         },
      },
      methods: {
         rating() {
            this.$axios.post(config('apiRoutes.qcommerce.products') + '/rating/' + this.product.id, {
               attributes: {
                  rating: this.product.averageRating
               }
            }).then(response => {
               this.$alert.success({message: "Calificación registrada exitosamente", pos: 'bottom'});
               this.getData();
            }).catch(error => {
               this.$alert.error({message: error.response.data.errors, pos: 'bottom'})
            });
         },//rating
         createCart() {
            this.$crud.create("apiRoutes.qcommerce.cart", {
               total: 0
            }).then(response => {
               var id = response.data.id;
               var carts = this.$q.localStorage.getItem("carts");
               if (carts) {
                  carts.push({id: id, storeId: this.storeData.id});
               } else {
                  var carts = [];
                  carts.push({id: id, storeId: this.storeData.id});
               }
               this.$q.localStorage.set("carts", carts)
               this.addCart();
            })
         },
         addCart() {
            var carts = this.$q.localStorage.getItem("carts");
            if (carts) {
               var cartId = 0;
               for (var i = 0; i < carts.length; i++) {
                  if (carts[i].storeId == this.storeData.id) {
                     cartId = carts[i].id;
                     break;
                  }//if
               }//for
               if (cartId == 0) {
                  this.createCart();
               } else {
                  this.$crud.create("apiRoutes.qcommerce.cartProducts", {
                     cart_id: cartId,
                     product_id: this.product.id,
                     product_name: this.product.name,
                     price: this.product.price,
                     quantity: 1
                  }).then(response => {
                     this.$alert.success({message: "Producto agregado al carrito exitosamente.", pos: 'bottom'})
                  }).catch(error => {
                     this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
                  });
               }//else
            } else {
               this.createCart();
            }
         }//addCart

      }
   }
</script>
<style lang="stylus">
   .cardProductH
      border-radius 0
      background-color #ffffff
      position relative

      h5
         color $primary

      & .q-card-main
         font-size 16px

      & .q-card-actions
         background-color $secondary
         position absolute
         right 0
         bottom 15px

         .q-btn
            color #fff
            border-radius 0

         .q-btn:first-child
            border-left 1px solid #fff

         .q-btn:last-child
            border-right 1px solid #fff

      &:hover
         background-color $secondary
         color #fff

         h5
            color #fff

         & .q-card-actions
            background-color $primary

</style>
