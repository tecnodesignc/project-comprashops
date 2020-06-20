<template>
   <q-card class="rounded-md q-ma-sm">
      <div class="q-container">
         <div class="row box">
            <div class="col-12 q-pa-md">
               <div class="text-h6 q-mb-lg"><i aria-hidden="true"
                                               class="material-icons q-icon q-mr-sm icon-sm">event</i>
                  Visitantes y paginas vistas
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
      name: 'visitors-pages',
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
                  type: 'column',
                  backgroundColor: null,
               },
               title: {
                  text: '',
               },
               xAxis: {//Answers
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
               colors: ['#fd2d5e', '#f2c037', '#f96353'],
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
                        visitorsAndPage: true,
                        startDate: this.startDate,
                        endDate: this.endDate,
                     }
                  }
               }
               this.$crud.index('apiRoutes.qanalytics.google', params).then(response => {
                  let data = response.data.visitors
                  this.chartOptions.xAxis.categories = data.dates
                  this.chartOptions.series = [
                     {
                        name: 'Visitantes',
                        data: data.visitors
                     },
                     {
                        name: 'Paginas Vistas',
                        data: data.pageViews
                     }
                  ]
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
