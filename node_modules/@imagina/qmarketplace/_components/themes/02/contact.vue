<template>
  <div class="theme-layout-02">
    <div class="q-container">
      <div class="row q-col-gutter-md items-center">
        <div class="col-xs-12 col-sm-12 col-md-4 q-pb-md text-center">
          <div class="logo q-px-xl">
            <router-link :to="{ name: 'app.home'}">
              <q-img :src="storeData.logo.path" :alt="storeData.name"  :ratio="16/9" contain />
            </router-link>
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-4 q-pb-md">

          <q-list >
            <q-item>
              <q-item-section avatar class="q-mr-md">
                <q-icon color="store-primary"  size="lg" name="fas fa-map-marker-alt" />
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle1 text-bold">Dirección:</div>
                <div class="text-subtitle1">
                  {{address}}
                </div>
              </q-item-section>
            </q-item>
          </q-list>

        </div>
        <div class="col-xs-12 col-sm-12 col-md-4 q-pb-md">

          <q-list>
            <q-item>
              <q-item-section avatar class="q-mr-md">
                <q-icon color="store-primary"  size="lg" name="far fa-clock" />
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle1 text-bold">Horario de atención:</div>
                <div class="text-subtitle1" v-for="schedule in schedules">
                  {{schedule}}
                </div>
              </q-item-section>
            </q-item>
          </q-list>

        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContactComponent',
  props: {
    'address': { type:String, default: ""},
    'schedules': { type:Array, default: []},
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
