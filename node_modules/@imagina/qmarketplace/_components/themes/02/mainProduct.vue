<template>
   <div class="q-mt-lg">
      <router-link
              :to="{name: 'stores.product.show',params:{slug: storeData.slug, product: product.slug}}">
      <q-img :ratio="1" class="line-grey" :src="product.mainImage.path" :alt="product.name" />
      </router-link>
      <q-btn :to="{name: 'stores.product.show',params:{slug: storeData.slug, product: product.slug}}" no-caps class="rounded-lg btn-banner"  color="store-secondary" :label="product.name" />
   </div>
</template>
<script>
   export default {
      name: 'MainProduct',
      props: ['product'],
      mounted() {
      },
      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         },
      },
      methods: {}
   }
</script>
<style lang="stylus">
.theme-layout-02
   .btn-banner
      border 2px solid #fff
      padding 5px 25px
      font-size 18px
      font-weight bold
      margin-top -25px
      @media screen and (max-width: $breakpoint-sm)
         padding 5px
         font-weight 15px 
      @media screen and (max-width: $breakpoint-xs)
         font-weight 13px 
</style>
