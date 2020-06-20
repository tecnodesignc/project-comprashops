<template>
  <div class="share-networks" :style="`background-image: url('${storeData.mainImage.path}');`">
    <div class="row items-center">
      <div class="col-12">

        <div class="networks text-center">
          <div class="text-h3  text-center title-networks">Compartir</div>
          <!--<i :class="soc.icon" v-for="soc in storeData.social" v-if="soc.active">
            <q-tooltip>
              {{soc.url}}
            </q-tooltip>
          </i>-->
          <social-sharing :url="url"
                          :title="storeData.name"
                          :description="storeData.slogan"
                          :quote="storeData.slogan"
                          inline-template
          >
            <div>
              <network network="facebook">
                <i class="fab fa-facebook">
                  <q-tooltip>
                  Compartir en Facebook
                  </q-tooltip>
                </i>

              </network>
              <network network="twitter">
                <i class="fab fa-twitter">
                  <q-tooltip>
                    Compartir en Twitter
                  </q-tooltip>
                </i>
              </network>
              <network network="whatsapp">
                <i class="fab fa-whatsapp">
                  <q-tooltip>
                   Compartir en WhatsApp
                  </q-tooltip>
                </i>
              </network>
            </div>
          </social-sharing>
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
.theme-layout-01
  .share-networks
    background-attachment fixed
    background-size cover
    padding 10% 0
    position relative
    width 100%
    &:before
      height 100%
      width 100%
      background-color  rgba(#282d46, 0.7)
      content ''
      position absolute
      top 0
    .networks
      position relative
      z-index 3
      a
      & i
        margin 10px
        font-size 2rem
        color #ffffff
        &:hover
          color $storeSecondary
      .title-networks
        color #ffffff
        z-index 1000
        margin-bottom 32px
</style>
