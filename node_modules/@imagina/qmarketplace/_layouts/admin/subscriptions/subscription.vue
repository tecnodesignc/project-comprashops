<template>
   <q-page class="bg-fondo page-subscription">
      <div v-if="success" class="qredeems-content">
         <div class="q-inline-block q-mb-lg">
            <h4 class="title text-secondary font-family-secondary q-mt-none">
               <div class="line-secondary q-mb-sm"></div>
               MEMBRESÍA Y FACTURACIÓN
               <div class="line-secondary q-mt-sm"></div>
            </h4>
         </div>

         <div class="row items-center">

            <!-- Meta Mensual -->
            <q-card class="rounded-md q-mb-xl full-width">
               <div class="q-pl-md">
                  <h3 class="title-label-puntos text-center bg-primary">
                     <div>Suscripción Activa</div>
                  </h3>
               </div>
               <q-card-section class="q-pt-xl">
                  <q-card class="my-plan q-pa-lg" v-if="subscription">
                     <q-card-section style="font-size: 16px">
                        <div class="row q-my-sm justify-around self-center">

                           <div class="col-xs-12 col-sm-auto">
                              <div class="row q-my-xs">
                                 <div class="col-xs-12 col-sm-auto">
                                    <span class="text-weight-bold q-pa-sm">Usuario: </span> <span
                                         class="text-weight-bold text-primary q-pa-sm">{{subscription.user.fullName}}</span>
                                 </div>
                              </div>
                           </div>
                           <div class="col-xs-12 col-sm-auto">
                              <div class="row q-my-xs">
                                 <div class="col-xs-12 col-sm-auto">
                                    <span class="text-weight-bold q-pa-sm">Correo Electronico:</span>
                                 </div>
                                 <div class="col-xs-12 col-sm-auto">
                               <span
                                       class="text-weight-bold text-green q-pa-sm">{{subscription.user.email}}</span>
                                 </div>

                              </div>
                           </div>
                        </div>

                     </q-card-section>
                  </q-card>
               </q-card-section>
               <q-card-section class="q-pt-xl">
                  <q-card class="my-plan q-pa-lg" v-if="subscription">
                     <q-item v-if="$q.platform.is.desktop">
                        <q-item-section avatar>
                           <q-avatar icon="fab fa-product-hunt" font-size="42px"
                                     v-bind:text-color="subscription.active?'green':'red'"/>
                        </q-item-section>
                        <q-item-section style="font-size: 16px">
                           <q-item-label><span class="text-weight-bold q-pa-sm">Plan: </span> <span
                                   class="text-weight-bold text-primary q-pa-sm">{{subscription.plan.name}}</span>
                           </q-item-label>
                           <q-item>
                              <q-item-section>
                                 <q-item-label><span class="text-weight-bold q-pa-sm">Fecha de de Inicio:</span> <span
                                         class="text-weight-bold text-green q-pa-sm">{{$trd(subscription.initDate)}}</span>
                                 </q-item-label>
                              </q-item-section>
                              <q-item-section>
                                 <q-item-label><span class="text-weight-bold q-pa-sm">Fecha de de Renovacion:</span>
                                    <span class="text-weight-bold text-red q-pa-sm">{{$trd(subscription.endDate)}}</span>
                                 </q-item-label>
                              </q-item-section>
                           </q-item>
                        </q-item-section>
                        <q-item-section side>
                           <q-btn color="green" @click="renovate()">
                              Renovar Plan
                           </q-btn>

                        </q-item-section><!-- <q-btn color="green" @click="modify()">
                              Moficar plan
                           </q-btn>-->
                        <q-item-section side v-if="!subscription.active">
                           <q-icon name="fas fa-exclamation-triangle" color="red" size="32px">
                              <q-tooltip content-class="bg-red" :offset="[10, 10]">
                                 Pendiente de Renovaciòn
                              </q-tooltip>
                           </q-icon>
                        </q-item-section>
                     </q-item>
                     <q-card-section v-else style="font-size: 16px">
                        <div class="row q-my-sm">
                           <div class="col-xs-6">
                              <q-icon
                                      name="fab fa-product-hunt" size="32px"
                                      v-bind:color="subscription.active?'green':'red'"
                              />
                           </div>
                           <div class="col-xs-6 text-right" v-if="!subscription.active">
                              <q-icon @click="alert= !alert" name="fas fa-exclamation-triangle" color="red"
                                      size="32px">
                                 <q-tooltip v-model="alert" content-class="bg-red" :offset="[10, 10]">
                                    Pendiente de Renovaciòn
                                 </q-tooltip>
                              </q-icon>
                           </div>
                        </div>
                        <div class="row q-my-sm">
                           <q-item-section>
                              <q-item-label><span class="text-weight-bold q-pa-sm">Plan: </span> <span
                                      class="text-weight-bold text-primary q-pa-sm">{{subscription.plan.name}}</span>
                              </q-item-label>
                           </q-item-section>

                        </div>
                        <div class="row q-my-xs">
                           <div class="col-xs-12 col-sm-auto">
                              <span class="text-weight-bold q-pa-sm">Fecha de de Inicio:</span>
                           </div>
                           <div class="col-xs-12 col-sm-auto">
                               <span
                                       class="text-weight-bold text-green q-pa-sm">{{$trd(subscription.initDate)}}</span>
                           </div>

                        </div>
                        <div class="row row q-my-xs">
                           <div class="col-xs-12 col-sm-auto">
                              <span class="text-weight-bold q-pa-sm">Fecha de de Renovacion:</span></div>
                           <div class="col-xs-12 col-sm-auto"><span
                                   class="text-weight-bold text-red q-pa-sm">{{$trd(subscription.endDate)}}</span></div>

                        </div>

                        <div class="row q-my-xs q-py-lg">
                           <div class="col text-right">
                              <q-btn color="green" @click="renovate()">
                                 Renovar Plan
                              </q-btn>
                           </div>

                        </div>
                     </q-card-section>
                  </q-card>
                  <q-card class="my-plan q-pa-lg" v-else>
                     <q-item>
                        <q-item-section>
                           <q-item-label><span class="text-weight-bold q-pa-sm"> No cuenta con un Plan activo</span>
                           </q-item-label>
                        </q-item-section>
                        <q-item-section side>
                           <q-btn color="green" :to="{name: 'products.show', params: {slug: 'tiendas-en-linea'}}">Registrar Plan</q-btn>
                        </q-item-section>
                     </q-item>
                  </q-card>
               </q-card-section>
               <q-card-section class="q-pt-xl" v-if="false">
                  <q-card class="my-plan q-pa-lg" v-if="subscription">
                     <q-card-section style="font-size: 16px">
                        <div class="row q-my-sm justify-around self-center">
                           <div class="col-xs-12 col-sm-auto">
                              <div class="row q-my-xs">
                                 <div class="col-xs-12 col-sm-auto">
                                    <span class="text-weight-bold q-pa-sm">Targeta:</span>
                                 </div>
                                 <div class="col-xs-12 col-sm-auto">
                               <span
                                       class="text-weight-bold text-green q-pa-sm">234324234242342</span>
                                 </div>

                              </div>
                           </div>
                           <div class="col-xs-12 col-sm-auto">
                              <div class="row q-my-xs">
                                 <div class="col text-right">
                                    <q-btn color="green" @click="renovate()">
                                       Actualizar información de pago
                                    </q-btn>
                                 </div>

                              </div>
                           </div>
                        </div>
                     </q-card-section>
                  </q-card>
               </q-card-section>
            </q-card>

            <div class="q-my-md full-width"></div>


            <div class="q-my-md full-width"></div>
         </div>

         <div class="text-right">
            <div class="q-inline-block">
               <h5 class="title text-secondary cursor-pointer font-family-secondary q-mt-none"
                   @click="drawerSubscription = !drawerSubscription">
                  Historial de suscipciones
                  <div class="line-secondary q-mt-sm"></div>
               </h5>
            </div>
         </div>

         <!-- Historial Ptos-->
         <div class="row q-col-gutter-md" v-if="drawerSubscription">

            <!-- Puntos Obtenidos -->
            <div class="col-12">
               <q-card class="rounded-md q-mb-xl full-width">
                  <div class="q-pl-md">
                     <h3 class="title-label-puntos text-center bg-tertiary">
                        <div>Historial</div>
                     </h3>
                  </div>
                  <q-card-section class="q-py-xl">
                     <q-table class="no-shadow my-sticky-header-table"
                              :data="tableSubscriptions"
                              :columns="tableColumnsSubscriptions"
                              row-key="id"
                     >
                        <template v-slot:body="props">
                           <q-tr :props="props">
                              <q-td key="id" :props="props">
                                 {{ props.row.id }}
                              </q-td>
                              <q-td key="user" :props="props">
                                 {{ props.row.user.fullName }}
                              </q-td>
                              <q-td key="plan" :props="props">
                                 {{ props.row.plan.name }}
                              </q-td>
                              <q-td key="initDate" :props="props">
                                 {{ $trd(props.row.initDate) }}
                              </q-td>
                              <q-td key="endDate" :props="props">
                                 {{ $trd(props.row.endDate) }}
                              </q-td>
                              <q-td key="status" :props="props">
                                 {{props.row.statusLabel}}
                              </q-td>
                           </q-tr>
                        </template>

                     </q-table>
                  </q-card-section>
               </q-card>
            </div>
         </div>


      </div>
      <!--Inner loading-->
      <inner-loading :visible="loading"/>
   </q-page>
</template>

<script>
   import {Picker} from 'emoji-mart-vue'
   import Echo from "laravel-echo";
   import Pusher from 'pusher-js';
   import chat from '@imagina/qmarketplace/_components/admin/qchat/chat'

   export default {
      name: "my-subscription",
      components: {},
      computed: {},
      data() {
         return {
            loading: false,
            success: true,
            alert: false,
            subscription: null,
            drawerSubscription: false,
            page: 1,
            pages: {lastPage: 0},
            tableSubscriptions: [],
            tableColumnsSubscriptions: [
               {
                  name: 'id',
                  field: 'id',
                  label: 'ID',
                  align: 'left',
                  sortable: true
               },
               {
                  name: 'user',
                  field: 'user',
                  label: 'Usuario',
                  align: 'left',
               },
               {
                  name: 'plan',
                  field: 'plan',
                  label: 'Plan',
                  align: 'left',
               },
               {
                  name: 'initDate',
                  field: 'initDate',
                  label: 'Fecha de Inicio',
                  align: 'left',
               },
               {
                  name: 'endDate',
                  field: 'endDate',
                  label: 'Fecha de Renovaciòn',
                  align: 'left',
               }
               ,
               {
                  name: 'status',
                  field: 'stausLabel',
                  label: 'Estado',
                  align: 'left',
               }
            ]

         }
      },
      created() {
         this.$nextTick(function () {
            this.init()
         })
      },
      methods: {
         async init() {
            await this.getSubscription().catch(error => {
            });
            await this.getSubscriptions().catch(error => {
               console.error(error)
            });
         },
         getSubscription() {
            return new Promise((resolve, reject) => {
               this.loading = true
               const criteria = this.$store.state.quserAuth.userId
               //Params
               let params = {
                  refresh: true,
                  params: {
                     include: 'user,plan',
                     filter: {
                        field: 'user_id',
                        status: 1
                     }
                  }
               }
               //Request
               this.$crud.show('apiRoutes.qsubscription.subscriptions', criteria, params).then(response => {
                  this.subscription = response.data
                  this.loading = false;
                  resolve(true)//Resolve
               }).catch(error => {
                  this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                  this.loading = false
                  reject(false)//Resolve
               })

            })
         },
         getSubscriptions() {
            return new Promise((resolve, reject) => {
               this.loading = true
               //Params
               let params = {
                  refresh: true,
                  params: {
                     include: 'user,plan',
                     filter: {
                        userId: this.$store.state.quserAuth.userId,
                     },
                     take: 20,
                     page: this.page
                  }
               }
               //Request
               this.$crud.index('apiRoutes.qsubscription.subscriptions', params).then(response => {
                  this.tableSubscriptions = response.data
                  this.loading = false;
                  resolve(true)//Resolve
               }).catch(error => {
                  this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                  this.loading = false
                  reject(false)//Resolve
               })

            })
         },
         renovate() {
            let storeId=this.$store.state.qmarketplaceStores.storeSelected;
            this.$router.push({name: 'products.show', params: {slug: 'tiendas-en-linea'},query:{'storeId':storeId}})
         }
      }
   }
</script>
<style lang="stylus">
   .page-subscription
      .q-slider
         color $primary

         &__track-container
            height 4px
            background $secondary

         .q-slider__pin-value-marker:before
            content ''
            position absolute
            bottom 30px
            background-image url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26.66 42.66'%3E%3Cdefs%3E%3Cstyle%3E.cls-1{fill:%23fd2d5e;}%3C/style%3E%3C/defs%3E%3Ctitle%3Epuntos%3C/title%3E%3Cg id='Capa_2' data-name='Capa 2'%3E%3Cg id='home'%3E%3Cpath class='cls-1' d='M17.33,8a4,4,0,1,0-4-4A4,4,0,0,0,17.33,8ZM25.2,20.42l-1.94-1L22.45,17a9.08,9.08,0,0,0-8.51-6.33c-3,0-4.66.85-7.78,2.1A8,8,0,0,0,2,16.61l-.56,1.14a2.67,2.67,0,0,0,1.19,3.57,2.63,2.63,0,0,0,3.54-1.19L6.75,19a2.61,2.61,0,0,1,1.37-1.29l2.23-.9L9.09,21.87a5.33,5.33,0,0,0,1.24,4.9l5,5.45a5.42,5.42,0,0,1,1.24,2.31l1.53,6.1a2.66,2.66,0,1,0,5.17-1.29l-1.85-7.41a5.36,5.36,0,0,0-1.24-2.31l-3.79-4.14,1.43-5.73.46,1.38a5.29,5.29,0,0,0,2.64,3.08l1.94,1A2.62,2.62,0,0,0,26.39,24a2.69,2.69,0,0,0-1.19-3.58ZM6.13,32.14A5.17,5.17,0,0,1,5,33.93L.78,38.11a2.67,2.67,0,1,0,3.77,3.77l5-5a5.58,5.58,0,0,0,1.18-1.79l1.12-2.81c-4.6-5-3.22-3.49-4-4.48Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
            height 40px
            width 100%
            background-repeat no-repeat
            background-size contain
            background-position center

      .avatar-main
         img
            border 4px solid $secondary

      .title-label-puntos
         -webkit-transform skew(10deg)
         transform skew(10deg)
         border-radius 10px
         padding 0px 30px
         display inline-block
         min-width 40%
         margin -58px 0 10px 0
         color #FFFFFF
         font-size 20px
         position relative
         font-family $font-secondary

         &:before
            content ''
            background-image url('/statics/img/arrow-down-blue.png')
            position absolute
            right -25px
            width 100%
            height 50px
            background-repeat no-repeat
            background-size contain
            top 27px
            background-position right
         @media screen and (max-width: $breakpoint-md)
            min-width 60%
            font-size 20px
            padding 0 15px
            &:before
               display none !important
         @media screen and (max-width: $breakpoint-sm)
            min-width 60%
            font-size 15px
            padding 0 10px

         & > div
            -webkit-transform skew(-10deg)
            transform skew(-10deg)

      .q-mx-puntos
         padding-left 80px
         padding-right 80px
         @media screen and (max-width: $breakpoint-md)
            padding-left 30px
            padding-right 30px
         @media screen and (max-width: $breakpoint-sm)
            padding-left 10px
            padding-right 10px

      .text-h6
         line-height 1.5rem
         color $secondary
         @media screen and (max-width: $breakpoint-sm)
            line-height 1rem
            font-sie 1rem
            margin-top 10px
            margin-bottom 20px

      .my-sticky-header-table
         .q-table__top
         thead tr:first-child th
            background-color var(--q-color-light)

         thead tr th
            position sticky
            z-index 1

         thead tr:first-child th
            top 0

         &.q-table--loading thead tr:last-child th
            top 48px

      @media screen and (max-width: $breakpoint-xs)
         .title
            font-size 20px

         .q-card__section
            padding-top 15px

            .q-avatar
               font-size 60px !important

            #copa
               max-height 60px

         .canjear
            padding-left 30px
            padding-top 0

            .btn
               font-size 15px !important

</style>