<template>
   <q-card class="rounded-md q-ma-sm">
      <div class="q-container">
         <div class="row box">
            <div class="col-12 q-pa-md">
               <div class="text-h6 q-mb-lg"><i aria-hidden="true" class="fas fa-laptop"/>
                  Sesiones por dispositivo
               </div>
            </div>
            <div class="col-12 q-pa-lg">
               <chart :options="chartOptions" style=" height:430px;"/>
            </div>
         </div>
      </div>
   </q-card>
</template>

<script>

   export default {
      name: 'device-sessions',
      props: {
         startDate: {default: Date.now()},
         endDate: {default: null}
      },
      watch: {
         startDate() {
            this.init()
         },
         endDate() {
            this.init()
         }
      },
      data() {
         return {
            loading: false,
            chartOptions: {
               chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie'
               },
               title: {
                  text: ''
               },
               tooltip: {
                  pointFormat: '<b>({point.y}) {point.percentage:.1f}%</b>'
               },
               plotOptions: {
                  pie: {
                     allowPointSelect: true,
                     cursor: 'pointer',
                     dataLabels: {
                        enabled: false
                     },
                     showInLegend: true
                  }
               },
               series: []

            }
         }
      },
      mounted() {
         this.$nextTick(function () {
            this.init()
         })
      },
      methods: {
         async init() {
            this.getVisitorsAndPages()
         },
         getVisitorsAndPages() {
            return new Promise((resolve, reject) => {
               this.loading = true

               //Params
               let params = {
                  params: {
                     filter: {
                        deviceSession: true,
                        startDate: this.startDate,
                        endDate: this.endDate,
                     }
                  }
               }
               this.$crud.index('apiRoutes.qanalytics.google', params).then(response => {
                  let data = response.data.deviceSession
                  let series = [
                     {
                        innerSize: '70%',
                        name: 'sesiones',
                        colorByPoint: true,
                        data: data
                     }
                  ]
                  this.chartOptions.series = series
                  resolve(true)//Resolve
               }).catch(error => {
                  this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                  this.loading = false
                  reject(error)//Resolve
               })
            })
         },
      }
   }
</script>
