<template>
  <div id="storeReport">

    <div class="text-h5 text-primary q-pb-md q-pl-lg font-family-secondary">Informes</div>
    <q-card class="rounded-md bg-white full-width q-my-sm">

      <div class="bg-light">
        <div class="row justify-end items-center q-col-gutter-md q-pb-md q-px-md">
          <div class="col-xs-12 col-sm-12 col-md-auto text-center">
            <q-icon name="event" class="q-mr-sm" />
            <q-btn  flat color="secondary" :label="$trd(month2,{type:'month'})" @click="getDates(month2,month2End)"/> / <q-btn  flat color="secondary" :label="$trd(month1,{type:'month'})" @click="getDates(month1,month1End)"/> /<q-btn flat color="secondary" label="hoy"@click="getDates(today)"/>

          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <q-input filled dense v-model="startDate" mask="date" :rules="['date']" label="fecha inicial">
               <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                     <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="startDate" @input="{ marketplaceReport() }" />
                        <!-- <q-date v-model="startDate" @input="(marketplaceReport()) => $refs.qDateProxy.hide()" /> -->
                     </q-popup-proxy>
                  </q-icon>
               </template>
            </q-input>
            <!-- <q-select filled v-model="model" color="primary" bg-color="white" :options="options" dense>
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-select> -->
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <q-input filled dense v-model="endDate" mask="date" :rules="['date']" label="Fecha final">
               <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                     <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="endDate" @input="{ marketplaceReport() }"/>
                        <!-- <q-date v-model="endDate" @input="() => $refs.qDateProxy.hide()" /> -->
                     </q-popup-proxy>
                  </q-icon>
               </template>
            </q-input>
            <!-- <q-select filled v-model="model" color="primary" bg-color="white" :options="options" dense>
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-select> -->
          </div>
        </div>
      </div>

      <div class="q-pa-lg">
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-xs-12 col-sm-6 col-md-3">

            <div class="row items-center bg-teal full-height">
              <div class="col-5 bg-teal-8 full-height">
                <div class="row full-height justify-center items-center text-white text-h5">
                  {{soldProducts.length}}
                </div>
              </div>
              <div class="col-7">
                <div class="q-pl-md text-white q-py-md">Productos <br>Vendidos</div>
              </div>
            </div>

          </div>
          <div class="col-xs-12 col-sm-6 col-md-3">
            <div class="row items-center bg-red full-height">
              <div class="col-5 bg-red-8 full-height">
                <div class="row full-height justify-center items-center text-white text-h5">
                  {{totalFollowers}}
                </div>
              </div>
              <div class="col-7">
                <div class="q-pl-md text-white q-py-md">Total de <br>seguidores</div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-3">
            <div class="row items-center bg-blue full-height">
              <div class="col-5 bg-blue-8 full-height">
                <div class="row full-height justify-center items-center text-white text-h5">
                  {{totalPolls}}
                </div>
              </div>
              <div class="col-7">
                <div class="q-pl-md text-white q-py-md">Encuentas</div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-3">
            <div class="row items-center bg-amber full-height">
              <div class="col-5 bg-amber-8 full-height">
                <div class="row full-height justify-center items-center text-white text-h5">
                  {{totalSolds}}
                </div>
              </div>
              <div class="col-7">
                <div class="q-pl-md text-white q-py-md">Total de <br>ventas</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row q-col-gutter-md q-pt-lg">
          <div class="col-xs-12 col-sm-12 col-md-7">
            <div class="q-pa-md">
              <div class="text-h6 q-mb-lg">
                <q-icon class="q-mr-sm icon-sm" name="event"/>
                Ventas totales
              </div>

              <chart :options="chartOptions" style=" height:430px;"/>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-5">
            <div class="line-grey q-pa-md">
              <div class="text-h6 q-mb-lg">
                <q-icon class="q-mr-sm icon-sm" name="fas fa-shopping-basket"/>
                Productos más vendidos
              </div>
              <q-list>
                <q-item v-if="soldProducts.length>0" class="items-product" v-for="product in soldProducts" :key="product.id">
                  <q-item-section avatar top>
                    <q-avatar rounded class="q-mr-sm" size="70px">
                      <img :src="product.product.mainImage.path">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{product.title}}</q-item-label>
                    <q-item-label caption> Código: {{product.product.sku}}</q-item-label>
                  </q-item-section>

                </q-item>
                <q-item v-if="soldProducts.length==0" class="items-product" >
                  <!-- <q-item-section avatar top>
                    <q-avatar rounded class="q-mr-sm" size="70px">
                      <img :src="product.product.mainImage.path">
                    </q-avatar>
                  </q-item-section> -->
                  <q-item-section>
                    <q-item-label>Sin productos vendidos en estas fechas</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
          <div class="col-12">
            <div class="line-grey q-pa-md">
              <div class="text-h6 q-mb-lg">
                <q-icon class="q-mr-sm icon-sm" name="fas fa-users"/>
                Mis seguidores destacados
              </div>

              <div class="row justify-center q-col-gutter-md" v-if="followers.length>0">
                <div class="col-lg-3" v-for="user in followers">

                  <q-card class="no-shadow text-center">
                    <q-avatar class="bg-white avatar-user" size="100px">
                      <img :src="user.user.mainImage">
                    </q-avatar>
                    <q-card-section class="text-subtitle2 ">
                      <div>{{user.user.fullName}}</div>
                      <!-- <q-rating :value="5" readonly color="yellow" :max="5" /> -->
                      <div class="q-mt-xs" >
                        <q-btn color="primary" class="btn-more" no-caps flat label="Ver más" @click="openProfile(user.user)"/>
                      </div>
                    </q-card-section>

                  </q-card>

                  <q-dialog v-model="card.open">
                      <card-user :card="card"></card-user>
                  </q-dialog>

                </div>

              </div>

              <div class="row justify-center q-col-gutter-md" v-else>
                <div class="col-lg-12 col-md-12 col-sm-12 text-center">
                  <div class="text-h6 q-mb-lg">
                    No hay seguidores en este rango de fecha
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </q-card>
  </div>
</template>
<script>

import cardUser from '@imagina/qmarketplace/_components/info/cardUser'
export default {
  props: {},
  components: {
    cardUser
  },
  watch: {},
  data() {
    return {
      model: '',
      totalPolls:0,
      totalSolds:0,
      totalFollowers:0,
      followers:0,
      card: {
        open: false,
        info: [],
      },
      soldProducts:[],
      options: [],
      chartOptions: {
        chart: {
          type: 'column',
          backgroundColor: null,
        },
        title: {
          text: '',
        },
        xAxis: {
          categories: [], //Answers
          title: {
            text: null,
            style: {
              color: '#f96353'
            }
          },
          labels: {
            style: {
              fontSize: '12px',
              color: '#333333',
            }
          },
          gridLineWidth: 0,
          crosshair: true
        },
        yAxis: {
          gridLineWidth: 1,
          min: 0,
          title: {
            text: ''
          },
          labels: {
            overflow: 'justify'
          }
        },
        credits: {
          enabled: false
        },
        colors: ['#f96353'],
        series: []

      },
      month1: null,
      month1End:null,
      month2: null,
      month2End: null,
      startDate: this.$moment().format('YYYY-MM-DD'),
      endDate: this.$moment().format('YYYY-MM-DD'),
      today:this.$moment().format('YYYY-MM-DD'),
    }
  },
  mounted(){
    this.$nextTick(function () {
       this.init()
    });
  },
  methods: {
    async init() {
       this.month1=this.$moment().subtract(1, 'month').startOf('month').format('YYYY-MM-')+"01"
       this.month1End= this.$clone(this.$moment(this.month1).add(1,'month').format('YYYY-MM-DD'))
       this.month2=this.$moment().subtract(2, 'month').startOf('month').format('YYYY-MM-')+"01"
       this.month2End=this.$clone(this.$moment(this.month2).add(1,'month').format('YYYY-MM-DD'))
       this.marketplaceReport()
    },
    marketplaceReport(){
      let params = {
        params: {
          filter:{
            storeId:this.$store.state.qmarketplaceStores.storeSelected,
            startDate: this.startDate,
            endDate: this.endDate,
            totalFollowers: true,
            followers: true,
            soldProducts: true,
            totalPolls: true,
            totalSold:true
          }
        }
      };//params
      this.$crud.index("apiRoutes.qanalytics.marketplace",params).then(response => {
        this.totalFollowers=response.data.totalFollowers;
        this.followers=response.data.followers;
        this.soldProducts=response.data.soldProducts;
        this.totalPolls=response.data.totalPolls;
        this.totalSolds=0;
        let totalSold=this.$clone(response.data.totalSold)
        this.chartOptions.xAxis.categories = totalSold.dates
        this.chartOptions.series = [
          {
            name: 'Ventas',
            data: totalSold.sold
          },
        ];
        for(var i=0;i<totalSold.sold.length;i++){
          this.totalSolds+=totalSold.sold[i];
        }

      });
    },
    getDates(initDate,endDate=this.$moment().format('YYYY-MM-DD')){
       this.startDate=initDate;
       this.endDate=endDate;
       this.marketplaceReport();
    },
    openProfile(result) {
      this.card.open = true;
      this.card.info = result;
      this.card.info.fields=this.$helper.convertToFrontField(this.card.info.fields);
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
