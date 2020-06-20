<template>
  <div class="q-container">
    <div class="row q-col-gutter-lg items-center q-pt-xl">
      <div class="col-md-4 q-pb-xl">

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
      <div class="col-md-4 q-pb-xl">

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
      <div class="col-md-4 q-pb-xl">

        <q-list  class="q-mr-md">
          <chat color="store-primary" type="2"></chat>
        </q-list>

      </div>
    </div>
  </div>
</template>
<script>
  import chat from '@imagina/qmarketplace/_components/qchat/chat'
export default {

    props: {
      'address': { type:String, default: ""},
      'schedules': { type:Array, default: []},
    },
  components: {
    chat
  },
  mounted() {

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
