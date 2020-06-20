<template>
   <q-card :class="className">
      <q-card-section class="q-pa-sm">
         <router-link
                 :to="{name: 'stores.product.show',params:{slug: storeData.slug, product: product.slug}}">
            <q-img :ratio="1" :src="product.mainImage.path" class="rounded-sm"/>
         </router-link>
      </q-card-section>
      <q-card-section class="card-title bg-store-primary">
         <q-list>
            <q-item>
               <q-item-section><h5 class="q-my-none price text-white">${{$n(product.price)}}</h5></q-item-section>
               <q-item-section avatar>
                  <add-cart-favorite :productId="product.id"  :favorite="true" :addCartDisable="false" color="white"></add-cart-favorite>
               </q-item-section>
            </q-item>
         </q-list>
      </q-card-section>
      <q-card-section class="card-main q-pt-sm">
         <q-rating v-model="product.averageRating" color="store-secondary"
                   :max="5" @input="val => { rating() }"
         />
         <router-link :to="{name: 'stores.product.show',params:{slug: storeData.slug, product: product.slug}}">
            <p class="q-my-sm text-dark text-ellipsis" :title="product.name">{{product.name}}</p>
         </router-link>
         <p class="q-my-sm text-ellipsis" :title="storeData.name"><small>{{storeData.name}}</small></p>
      </q-card-section>
      <q-card-actions>
         <add-cart-favorite  :product-id="product.id" :price="product.price" :favorite="false" color="storeSecondary"></add-cart-favorite>
      </q-card-actions>
   </q-card>
</template>
<script>
   import addCartFavorite from '@imagina/qmarketplace/_components/cart/addCartFavorite';
   export default {
      name: 'ProductComponent',
      props: ['product', 'className'],
      components: {
         addCartFavorite
      },
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
.theme-layout-02
   .cardProductTwo
      border-radius 20px 20px 20px 0
      position relative
      margin 8px
      background-color var(--q-color-light)
      overflow hidden
      .text-ellipsis
         white-space nowrap
         overflow hidden
         text-overflow ellipsis 
      & .card-title
         margin-right 30px
         margin-top -30px
         z-index 9
         position relative
         margin-bottom 10px
         padding 10px
         border-radius 0 10px 10px 0 !important
         margin-left -10px
         -webkit-transform skew(10deg)
         transform skew(10deg)
         & .q-list
            -webkit-transform  skew(-10deg)
            transform skew(-10deg)
         @media screen and (max-width: $breakpoint-xs)
            padding 5px
            margin-top 0
            margin-right 5px
            .price 
               font-size 1rem!important
               line-height 1rem !important      
      & .card-main
         font-size 16px
         .q-rating
            font-size 20px
         @media screen and (max-width: $breakpoint-xs)
            .q-rating 
               font-size 15px    
      & .q-card__actions
         .q-btn
            margin-left -8px
            border-radius 0
            margin-bottom 10px
            box-shadow none
            padding-right 10px
            padding-top 3px
            padding-bottom 3px
            background-color $storeSecondary
            .q-icon
               color #fff
            .q-btn__content > div
               display block !important
               color #fff
            @media screen and (max-width: $breakpoint-xs)   
               padding-left 10px
               .q-btn__content > div
                  display none !important
                  
</style>
