<template>
   <q-card :class="className" class="q-pa-md">
      <q-card-section class="q-pb-lg">
         <div class="row">
               <div class="col-6">
                  <router-link
                          :to="{name: 'stores.product.show',params:{slug: storeData.slug, product: product.slug}}">
                  <q-img :ratio="1" :src="product.mainImage.path"/>
                  </router-link>
               </div>
            <div class="col-6">
               <router-link
                       :to="{name: 'stores.product.show',params:{slug: storeData.slug, product: product.slug}}">
                  <q-card-section>
                     <p class="q-my-none text-truncate text-dark text-weight-bold">{{product.name}}</p>
                     <p class="q-my-none text-truncate"><small>{{storeName}}</small></p>
                     <h5 class="q-my-sm text-store-primary">${{$n(product.price)}}</h5>
                     <q-rating size="20px"
                               @input="val => { rating() }"
                               v-model="product.averageRating"
                               :max="5"
                     />
                  </q-card-section>
               </router-link>
               <q-card-actions>
                  <add-cart-favorite :productId="product.id"  :price="product.price"></add-cart-favorite>
               </q-card-actions>
            </div>
         </div>
      </q-card-section>
   </q-card>
</template>
<script>
   import addCartFavorite from '@imagina/qmarketplace/_components/cart/addCartFavorite';
   export default {
      props: ['product', 'className', 'storeName', 'storeId', 'storeThemeConfig'],
      components: {
         addCartFavorite
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
               }
            } else {
               this.createCart();
            }
         }//addCart

      }
   }
</script>
<style lang="stylus">
   .cardProductH01
      border-radius 0
      background-color #ffffff
      position relative

      h5
         color $storePrimary

      & .q-card__section
         font-size 16px

      & .q-card__actions
         background-color $storeSecondary
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
         background-color $storeSecondary
         color #fff !important

         h5
            color #fff !important

         & .q-card__actions
            background-color $storePrimary

</style>
