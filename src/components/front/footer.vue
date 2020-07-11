<template xmlns="http://www.w3.org/1999/html">
  <footer>
    <!--=== Copyright ===-->
    <q-no-ssr>

    <q-footer class="bg-degradado" v-if="$q.platform.is.desktop">
      <div class="row  flex gutter-x-sm q-py-md" style="height: 310px">
          <div class="col-xs-1">

          </div>
          <div class="col-xs-5 text-h5 text-left">
              <strong>Suscribirse al boletín informativo</strong>
            <div class="text-body1">
                No te pierdas miles de productos y promociones súper geniales
            </div>

          </div>
          <div class="col-xs-3 text-left">
              <q-input filled bg-color="white" color="black" v-model="text" label="Enter your email here..."></q-input>

          </div>
          <div class="col-xs-3">
              <q-btn style="background: goldenrod; color: #656262; height: 55px" icon="mail" label="Suscribir" />
          </div>
        </div>

    </q-footer>

        <q-footer class="bg-component itemsFooter" v-if="$q.platform.is.desktop">
            <div class="row flex gutter-x-sm q-py-md" style="height: 220px">
            <div class="col-xs-1">

            </div>

            <div class="col-xs-3 text-left	">
                <div class="col text-h5 "style="height: 50px" >
                    Contact Us
                </div>

                <div class="col text-h6 text-bold">
                    HOTLINE: 038-2747903
                </div>
                <div class="col text-body1">
                    (Free Call, 8:00 – 22:00)
                </div>
                <div class="col text-body1">
                    Cll 28a N°30-29 Hipodromo
                </div>
                <div class="col text-body1">
                    Ibague - Tolima
                </div>
                <div class="col text-body1">
                    contact@tecnodesing.com
                </div>
            </div>

            <div class="col-xs-2">
                <div class="col text-h5 "style="height: 50px" >
                    About Us
                </div>
                <div class="col">
                    <a class="q-href" href="">About CompraShop</a>
                </div>

                <div class="col">
                    <a class="q-href" href="">Sell On CompraShop</a>
                </div>
                <div class="col">
                    <a class="q-href" href="">Affiliate Program</a>
                </div>
                <div class="col">
                    <a class="q-href" href="">Careers</a>
                </div>
                <div class="col">
                    <a class="q-href" href="">Term & Conditions</a>
                </div>
                <div class="col">
                    <a class="q-href" href="">Privacy Policy</a>
                </div>
            </div>
                <div class="col-xs-2">
                    <div class="col text-h5 "style="height: 50px" >
                        Help & Guide
                    </div>
                    <div class="col">
                        <a class="q-href" href="">Help Center</a>
                    </div>
                    <div class="col">
                        <a class="q-href" href="">How To Buy</a>
                    </div>
                    <div class="col">
                        <a class="q-href" href="">Shipping & Delivery</a>
                    </div>
                    <div class="col">
                        <a class="q-href" href="">Product Policy</a>
                    </div>
                    <div class="col">
                        <a class="q-href" href="">How To Return</a>
                    </div>
                </div>
                <div class="col-xs-3">
                    <div class="col text-h5 "style="height: 50px" >
                        Download the App
                    </div>
                    <div class="col">
                        <a class="q-href" href="">– Fast & Simple for shopping anywhere</a>
                    </div>
                    <div class="col">
                        <a class="q-href" href="">– Support for iOS & Android</a>
                    </div>

                    <div class="col-xs-3">
                        <br>
                        <a href="https://play.google.com/store">
                            <img style="width: 150px" src="\statics\icons\android.png"></a>



                        <a href="https://www.apple.com/ios/app-store/">
                            <img style="width: 150px" src="\statics\icons\apple.png"></a>

                    </div>
                    </div>

                </div>

        </q-footer>

      <q-footer bordered v-else>
      <q-tabs no-caps color="transparent" class="bg-degradado text-white">
        <q-route-tab
          icon="home"
          :to="{ name: 'app.home'}"
          exact
        />
        <q-tab name="xtab-1" icon="search" @click="modal = !modal" />
      </q-tabs>

      <q-dialog v-model="modal">
        <q-card class="bg-degradado">
          <q-card-section>
            <div class="text-h6 text-white font-family-secondary">Buscador de Tiendas</div>
          </q-card-section>

          <q-card-section>
            <search-store></search-store>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat color="white" label="CERRAR" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>


    </q-footer>
    </q-no-ssr>
  </footer>
</template>
<script>
  import menuList from "src/components/master/recursiveItem"
  import logoImagina from 'src/components/master/imaginaSVG'
  import searchStore from 'src/components/master/searchStore'

  export default {
    props: {},
    components: {
      menuList,
      logoImagina,
      searchStore
    },
    watch: {},
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {
        modal: false,
      }
    },
    computed: {
      menu() {
        let menu = config('sidebar')
        let menufooter = ['app.home', 'app.reservations', 'app.branchOffices', 'app.contact']
        let response = []
        //Get just menufooter items
        menu.forEach(item => {
          if(menufooter.indexOf(item.name) != -1) response.push(item)
        })
        return response//Response
      }
    },
    methods: {
    }

  }
</script>
<style lang="stylus">
  #footer
    @media screen and (max-width: $breakpoint-md)
      padding-bottom 50px
    .menuFooter
      text-align center
      background-color $dark
      color white
      padding 5px 0
      @media screen and (max-width: $breakpoint-md)
        padding 2px 0
        position fixed
        bottom 0
        width 100%
      @media screen and (max-width: $breakpoint-sm)
        padding 0

      .q-item
        display inline-block
        border 0px !important

        .q-item-side
          display inline-block

          .q-icon
            font-size 17px
            color white
            @media screen and (max-width: $breakpoint-sm)
              font-size 10px !important

        .q-item-main
          display inline-block
          margin-left 5px
          font-size 17px !important
          @media screen and (max-width: $breakpoint-sm)
            font-size 10px !important

        &.router-link-active
          background transparent !important

    .search
      background-color red
      .select-cities
        display block

  .q-font-footer
  text-weight-bolder
    font-size 17px
  .itemsFooter
   background-color $grey-13
  .q-href
                    font-size 17px
                    color white



</style>
