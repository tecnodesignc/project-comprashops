<template>
   <div class="q-pa-md">
      <q-carousel
              animated
              v-model="slide"
              navigation
              infinite
              autoplay
              transition-prev="slide-right"
              transition-next="slide-left"
      >
         <q-carousel-slide v-for="banner in positions.banners" :key="banner.id" :name="banner.id" :img-src="banner.imageUrl"/>
      </q-carousel>
   </div>
</template>
<script>
   export default {
      name: 'banner-position',
      props: ['userSelect'],
      data() {
         return {
            loading: false,
            slide:1,
            positions:[]
         }
      },
      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         }
      },
      mounted() {
         this.$nextTick(function () {
            this.init()
         })
      },
      methods: {
         init(){
            this.getBanner()
         },
         getBanner(refresh = false) {
            this.loading = true
            let params = {
               refresh: refresh,
               params: {
                  include: 'banners',
                  filter:{
                     store:this.storeData.id,
                     field:'system_name'
                  }
               }
            }
            let criteria = 'home-'+this.storeData.id
            this.$crud.show('apiRoutes.qchat.conversations', criteria, params)
                .then(response => {
                   this.positions = response.data
                   this.loading = false
                })
                .catch(error => {
                   this.loading = false
                })
         },

      }
   }
</script>
<style lang="stylus">
</style>
