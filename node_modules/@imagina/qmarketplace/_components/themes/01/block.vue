<template>
  <div class="theme-layout-01">
    <div class="q-container" v-if="$q.platform.is.desktop">
      <div class="row q-col-gutter-lg justify-end">
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3 q-mb-lg">
          <div class="bg-store-secondary  text-white text-center q-pa-md">
            <div class="text-h4">{{storeData.usersFollowing}}</div>
            <div class="text-subtitle1">usuario (s) siguen esta tienda</div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-pa-md">
      <div class="q-container">
        <div class="row q-col-gutter-lg">
          <div class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
            <featured-products ></featured-products>
            <new-products :store="storeData"></new-products>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
            <quiz :system-name="`home-${storeData.id}`"/>
            <qbanner :systemName="`home-${storeData.id}`" height="auto"/>
          </div>
        </div>
      </div>
    </div>
    <!-- Productos -->
    <general-products ></general-products>
    <!-- Compartir -->
    <share ></share>


  </div>
</template>
<script>
import imSocial from 'src/components/master/imSocial';
import generalProducts from '@imagina/qmarketplace/_components/themes/01/generalProducts'
import featuredProducts from '@imagina/qmarketplace/_components/themes/01/featuredProducts'
import newProducts from '@imagina/qmarketplace/_components/themes/01/newProducts'
import quiz from '@imagina/qmarketplace/_components/themes/quiz'
import share from '@imagina/qmarketplace/_components/themes/01/shareNetworks'
import qbanner from '@imagina/qbanner/_components/frontend/qbanner'
export default {

  components: {
    imSocial,
    featuredProducts,
    generalProducts,
    newProducts,
    quiz,
    share,
    qbanner
  },
  mounted() {
    /*
    console.warn('block', this.store)
    */
  },
  computed:{
    storeData(){
      let storeSlug = this.$route.params.slug
      return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
    }
  },
  methods:{
  },
}
</script>
<style lang="stylus">
.theme-layout-01
  .banner-bottom
    background-size cover
    padding-top 60%
    padding-bottom 40%
    position relative
    .content
      position relative
      z-index 3
    &:before
      height 100%
      width 100%
      background rgba(#282d46, 0.7)
      content ''
      position absolute
      top 0
  .block-title
    width 100%
    max-width 320px
    max-height 54px
    text-align center
    font-size 24px
    padding: 9px;

</style>
