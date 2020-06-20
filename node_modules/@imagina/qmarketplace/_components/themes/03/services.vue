<template>
   <div>
      <q-list padding>
         <q-item>
            <q-item-section top avatar class="q-mr-md q-hide q-md-show ">
               <q-icon size="xl" color="store-primary" name="fas fa-briefcase"/>
            </q-item-section>
            <q-item-section>
               <q-item-label class="text-h5 text-weight-bold q-mb-sm">
                  Habilidades o servicios
               </q-item-label>
               <q-item-label>
                  <div class="text-subtitle1 list-item" v-for="(item,i) in services" :key="i" @click="openModalService(item)">
                     <q-item clickable>
                        <q-item-section avatar>
                           <i class="fas fa-check text-store-secondary q-pr-sm q-pt-xs"></i>
                        </q-item-section>
                        <q-item-section class="q-py-xs">{{item.title}}</q-item-section>
                     </q-item>
                  </div>
               </q-item-label>
            </q-item-section>
         </q-item>
      </q-list>
      <q-dialog v-model="card.open">
         <card-service :service="card.service"></card-service>
      </q-dialog>
   </div>
</template>
<script>
   import cardService from '@imagina/qmarketplace/_components/themes/03/modalService';
   export default {
      components: {
         cardService
      },
      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         }
      },
      data() {
         return {
           services:[],
            card: {
              open:false,
               service:0
            }
         }
      },
     mounted() {
       this.$nextTick(function () {
         this.init()
       })
     },
      methods: {
        init(){
          this.getServices()
        },
        getServices(refresh = false){
          this.loading = true
          return new Promise((resolve, reject) => {
            let params = {
              refresh: refresh,
              params:{
                filter:{
                  store:this.storeData.id
                },
                take:null
              }
            }
            this.$crud.index('apiRoutes.qblog.posts', params).then(response => {
              this.services=response.data
              this.loading = false
              resolve(true)
            }).catch(error => {
              console.error(`SERVICES ERROR GET - ${error}`)
              reject(`SERVICES ERROR GET - ${error}`)
              this.loading = false
            })
          })
        },
         openModalService(result) {
            this.card.open = true;
            this.card.service = {service:result, store:this.storeData};
         }
      }
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
