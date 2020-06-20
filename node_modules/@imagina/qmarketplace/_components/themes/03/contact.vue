<template>
  <div class="theme-layout-03">
    <div class="bg-store-primary q-py-xl">
      <div class="q-container ">
        <div class="row">
          <div class="col bg-white q-pa-lg">
            <div class="row items-center gutter-md">
              <div class="col-sm-12 col-md-5 text-center">

                <div class="text-h5 bg-store-primary q-inline-block q-pa-md text-white q-mb-sm">
                  {{storeData.name}}
                 </div>
                 <h5 class="text-subtitle1 text-uppercase text-store-secondary q-mt-none">
                  {{storeData.slogan}}
                 </h5>

              </div>
              <div class="col-sm-12 col-md-7">
                <q-list class="border-0">
                  <q-item>
                    <q-item-section avatar class="q-mr-md">
                      <q-icon color="store-primary" size="lg" name="mail" />
                    </q-item-section>
                    <q-item-section class="q-py-md">
                      <div class="text-subtitle1 text-weight-bold">Correo Electrónico:</div>
                        <div class="text-subtitle1 "><a class="text-dark" :href="'mailto:'+storeData.options.email">{{storeData.options.email}}</a></div>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar class="q-mr-md">
                      <q-icon color="store-primary" size="lg" name="fas fa-map-marker-alt" />
                    </q-item-section>
                    <q-item-section class="q-py-md">
                      <div class="text-subtitle1 text-weight-bold">Dirección:</div>
                      <div class="text-subtitle1">
                        {{storeData.address}}
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar class="q-mr-md">
                      <q-icon color="store-primary" size="lg" name="far fa-clock" />
                    </q-item-section>
                    <q-item-section class="q-py-md">
                        <div class="text-subtitle1 text-weight-bold">Horario de atención:</div>
                        <div class="text-subtitle1">
                          {{storeData.schedules[0]}}
                        </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <share></share>
  </div>
</template>
<script>
import share from '@imagina/qmarketplace/_components/themes/03/shareNetworks'
export default {
  components: {
    share,

  },
     computed:{
      storeData(){
         let storeSlug = this.$route.params.slug
         return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
      }
   },
}
</script>
<style lang="stylus"> 
</style>
