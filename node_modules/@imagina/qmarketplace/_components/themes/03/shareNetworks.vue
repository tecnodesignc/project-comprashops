<template>
  <div class="share-networks bg-white">
    <div class="row items-center">
      <div class="col-12">
        <div class="networks text-center">
          <a v-for="soc in store.social" v-if="soc.active" :href="soc.url" target="_blank">
            <i :class="soc.icon"></i>
            <q-tooltip>
              {{soc.url}}
            </q-tooltip>
          </a>
          <!--
          <a href="" target="_blank"><i class="fab fa-whatsapp"></i></a>
          <a href="" target="_blank"><i class="fab fa-twitter"></i></a>
          <a href="" target="_blank"><i class="fab fa-instagram"></i></a>
          -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed:{
    storeData(){
      let storeSlug = this.$route.params.slug
      return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
    },
    url(){
      return 'https://dondeestaesavaina.com/#/tienda/'+this.$route.params.slug
    }
  },
}
</script>
<style lang="stylus">
.theme-layout-03
  .share-networks
    padding 2% 0
    .networks
      a
      & i
        margin 10px
        font-size 2rem
        color $storeSecondary
        &:hover
          color $storePrimary
</style>
