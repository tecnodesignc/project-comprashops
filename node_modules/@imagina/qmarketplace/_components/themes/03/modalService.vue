<template>
  <div>
     <q-card class="card-service" style="min-width: 272px; max-width: 350px">
        <q-img :src="service.service.mainImage.path" />
        <q-card-section>
           <q-btn
                   fab
                   color="primary"
                   icon="place"
                   class="absolute"
                   style="top: 0; right: 12px; transform: translateY(-50%);"
           />

           <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                 {{service.service.title}}
              </div>
           </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
           <div class="text-caption text-grey" v-html="service.service.description">
           </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
           <q-btn flat round icon="event" />
           <q-btn flat color="primary" @click="form=!form">
              Solicitar
           </q-btn>
        </q-card-actions>
        <q-card-section class="q-pt-none" v-if="form">

        </q-card-section>
     </q-card>
     <q-dialog v-model="form">
        <service-form :service="service"/>
     </q-dialog>
  </div>
</template>
<script>
   import serviceForm from "@imagina/qmarketplace/_components/themes/03/serviceForm"
   export default {
      props: {service: {default: 0}},
      components: {
         serviceForm
      },
      watch: {},
      data() {
         return {
            form:false
         }
      },
     mounted() {
       this.$nextTick(function () {
       })
     },
      methods: { }
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
