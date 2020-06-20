<template>
   <div>
      <q-card class="card-user" style="min-width: 350px">
         <q-img src="statics/img/fondo.jpg"/>
         <q-card-section class="text-center">
            <q-avatar size="100px">
               <img :src="card.info.mediumImage">
            </q-avatar>
            <div class="text-h6 ellipsis">{{card.info.fullName}}</div>
            <div class="q-mt-md">
               <q-chip color="tertiary" text-color="white">puntos: {{pointsAvailables}}</q-chip>
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="card.info.fields.neighborhood">
               <q-icon name="place" color="primary"/>
               {{card.info.fields.address.value}} - {{card.info.fields.neighborhood.value}}
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="card.info.fields.birthday">
            <q-icon name="fas fa-calendar-alt" color="primary"/>
            {{$trd(card.info.fields.birthday.value)}}
         </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="card.info.fields.academicLevel">
               <q-icon name="fas fa-user-graduate" color="primary"/>
               {{card.info.fields.academicLevel.value}}
            </div>
            <div class="text-subtitle2 text-grey ellipsis" v-if="card.info.fields.civilState">
               <span class="text-primary text-weight-bold q-px-xs">Estado Civil:</span>
               {{card.info.fields.civilState.value}}
            </div>

            <div class="q-mt-md" v-if="card.info.fields.leisures">
               <div class="text-subtitle2 text-grey ellipsis">
                  <span class="text-primary text-weight-bold q-px-xs">Pasatiempos</span>
               </div>
               <q-chip color="tertiary" text-color="white" v-for="(item, i) in card.info.fields.leisures.value"
                       :key="i">{{item}}
               </q-chip>

            </div>

         </q-card-section>
         <q-separator/>

         <!--	    <q-card-actions align="around">
                  <q-btn icon="phone" label="Puntos" stack flat />
                  <q-btn icon="phone" label="Stacked" stack flat />
                  <q-btn icon="phone" label="Stacked" stack flat />
                </q-card-actions-->
          <!--Inner loading-->
          <inner-loading :visible="loading"/>
      </q-card>


   </div>
</template>
<script>
   import chat from '@imagina/qmarketplace/_components/info/chat'
   import notification from '@imagina/qmarketplace/_components/info/notification'
   import http from "axios"

   export default {
      name: 'CardUserComponent',
      props: {card: {default: 0}},
      watch: {
         card: async function (n) {
            await this.getPointsUser()
         }
      },
      components: {
         chat,
         notification
      },
      mounted() {
        this.$nextTick(function () {
            this.init()
        })
      },
      data() {
         return {
            pointsAvailables: 0,
            userSelect: [],
            openModalChat: false,
            openModalNotific: false,
            loading: false,
         }
      },
      methods: {
        async init() {

          await this.getPointsUser()

        },
         getPointsUser() {
            return new Promise((resolve, reject) => {
               
               this.pointsAvailables = 0
               this.loading = true

               //Params
               let params = {
                  params: {
                     filter: {
                        userId: this.card.info.id,
                        type: 'availablePointsUser'
                     }
                  }
               }

               http.get(config('apiRoutes.qredeems.calculates'), params)
                   .then(response => {

                      if (response.data.data.points > 0)
                         this.pointsAvailables = response.data.data.points

                      this.loading = false
                      resolve(true);

                   })
                   .catch(error => {

                      this.loading = false
                      reject(error);
                   });
            })
         },
         openUrl(url, target) {
            return window.open(url, target)
         }
      }
   }
</script>

<style lang="stylus">
   .card-user
      .q-img
         height 150px

      .q-card__section
         margin-top -50px
</style>
