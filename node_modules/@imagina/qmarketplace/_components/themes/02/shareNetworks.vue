<template>
  <q-list class="share-networks q-mb-lg border-0">
    <div class="bg-store-secondary title-share text-white rounded-sm q-mb-sm text-center">
      <div class="q-py-sm text-subtitle1"> <q-icon color="white" name="share" /> COMPARTIR</div>
    </div>
    <div no-ssr>
      <social-sharing :url="url"
                      :title="storeData.name"
                      :description="storeData.slogan"
                      :quote="storeData.description"
                      inline-template
      >
        <div>
          <network network="facebook">
            <q-item>
              <q-item-section avatar>
                <q-icon color="store-primary" name="fab fa-facebook" />
              </q-item-section>
              <q-item-section class="q-py-md">Facebook</q-item-section>
            </q-item>
            <q-separator />
          </network>
          <network network="twitter">
            <q-item>
              <q-item-section avatar>
                <q-icon color="store-primary" name="fab fa-twitter" />
              </q-item-section>
              <q-item-section class="q-py-md">Twitter</q-item-section>
            </q-item>
            <q-separator />
          </network>
          <network network="whatsapp">
            <q-item>
              <q-item-section avatar>
                <q-icon color="store-primary" name="fab fa-whatsapp" />
              </q-item-section>
              <q-item-section class="q-py-md">Whatsapp</q-item-section>
            </q-item>
            <q-separator />
          </network>
        </div>
      </social-sharing>
    </div>
  </q-list>
</template>
<script>
export default {
  name: 'ShareNetworksComponent',
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
.theme-layout-02
  .share-networks
    overflow hidden
    .title-share
      -webkit-transform skew(10deg)
      transform skew(10deg)
      margin-left -10px
      margin-right 20px
      & > div
        -webkit-transform  skew(-10deg)
        transform skew(-10deg)
</style>
