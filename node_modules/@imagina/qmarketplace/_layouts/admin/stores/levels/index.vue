<template>
   <div id="storeReport">

      <div class="text-h5 text-primary q-pb-md q-pl-lg font-family-secondary">Nivel de Mi Tienda</div>
      <q-card class="rounded-md bg-white full-width q-my-sm">
         <div class="q-pa-lg">
            <div class="row q-col-gutter-md q-pt-lg">
               <div class="col-xs-12 col-sm-12">
                  <div class="q-pa-md">
                     <div class="text-h5 text-primary q-mb-lg">
                        Nivel - {{store.level.name}}
                     </div>
                     <div class=" q-mb-lg" v-html="store.level.description">
                     </div>
                    <hr/>
                     <div class="text-h6 q-mb-lg">
                        Siguiente nivel
                     </div>
                     <div class="text-h6 text-primary q-mb-lg">
                        Nivel - {{level.name}}
                     </div>¡
                     <div v-for="(item,i) in level.options.criterias" :key="i">
                       <div class=" q-mb-lg" v-html="item.description"></div>
                       <q-card-section class="q-py-xs">
                         <div class="q-mt-xs">
                           <q-chip color="tertiary" text-color="white">{{item.label}}: {{item.value}} </q-chip>
                         </div>
                       </q-card-section>

                     </div>

                  </div>
               </div>
            </div>
         </div>

      </q-card>
   </div>
</template>
<script>
   import {Chart} from 'highcharts-vue'
   import cardUser from '@imagina/qmarketplace/_components/info/cardUser'

   export default {
      props: {},
      components: {
         Chart,
         cardUser

      },
      watch: {},
      data() {
         return {
            loading: true,
            level: [],
            success: false,
            store: null
         }
      },
      mounted() {
         this.$nextTick(function () {
            this.init()
         });
      },
      methods: {
         async init() {
            await this.storeData()
            await this.levelStore()
         },
         levelStore() {
            return new Promise((resolve, reject) => {
               //Params
               let criteria = this.store.level.order;
               let params = {
                  refresh: true,
                  params: {
                     include: '',
                     filter: {
                        field: 'order',
                        levelType: this.store.level.level_type_id,
                     }
                  }
               }
               //Request
               this.$crud.show('apiRoutes.qmarketplace.level', parseInt(criteria) + 1, params).then(response => {
                  this.level = response.data
                  resolve(true)//Resolve
               }).catch(error => {
                  this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                  this.loading = false
                  reject(false)//Resolve
               })
            })
         },
         storeData() {
            return new Promise((resolve, reject) => {
               //Params
               let criteria = this.$store.state.qmarketplaceStores.storeSelected ? this.$store.state.qmarketplaceStores.storeSelected : null
               let params = {
                  refresh: true,
                  params: {
                     include: '',
                     filter: {}
                  }
               }
               //Request
               this.$crud.show('apiRoutes.qmarketplace.store', criteria, params).then(response => {
                  this.store = response.data
                  resolve(true)//Resolve
               }).catch(error => {
                  this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                  this.loading = false
                  reject(false)//Resolve
               })
            })
         }
      }
   }
</script>
<style lang="stylus">
   #storeReport
      .btn-more
         border-top 1px solid #eee

      .highcharts-legend
         display none !important

      .avatar-user
         .q-avatar__content
            border-radius 50%
            border 2px solid #eee

      .q-list
         .items-product
            border-bottom 1px solid #eee
            padding 10px

         .items-product:last-child
            border-bottom 0
      @media screen and (max-width: $breakpoint-xs)
         .icon-sm
            display none !important

         .text-h6
            text-align center
</style>
