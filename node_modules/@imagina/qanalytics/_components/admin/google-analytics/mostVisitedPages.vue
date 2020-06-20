<template>
   <q-card class="rounded-md q-ma-sm">
      <div class="q-container">
         <div class="row box">
            <div class="col-12 q-pa-md">
               <div class="text-h6 q-mb-lg"><i aria-hidden="true"
                                               class="material-icons q-icon q-mr-sm icon-sm">event</i>
                  Paginas Mas vistas
               </div>
            </div>
            <div class="col-12 q-pa-lg">
               <q-table
                       v-if="loading"
                       :data="tableOptions.data"
                       :columns="tableOptions.columns"
                       row-key="pageTitle"
                       :pagination.sync="tableOptions.pagination"
               />
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
            tableOptions:{
               pagination: {
                  page: 1,
                  rowsPerPage: 6,
               },
               columns: [
                  {
                     name: 'pageTitle',
                     required: true,
                     label: 'Paginas',
                     align: 'left',
                     field: row => row.pageTitle,
                     format: val => `${val}`,
                     sortable: true,
                     classes: 'bg-grey-2 ellipsis',
                     style: 'max-width: 300px',
                     headerClasses: 'bg-primary text-white'
                  },
                  { name: 'url', style: 'max-width: 300px',align: 'left', label: 'Titulo de Página', field: 'url', sortable: true },
                  { name: 'pageViews',classes: 'bg-grey-2 ellipsis', align: 'center', label: 'Número de páginas vistas', field: 'pageViews', sortable: true },
               ],
               data: []
            },

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
                        mostVisitedPages: true,
                        startDate: this.startDate,
                        endDate: this.endDate,
                     }
                  }
               }
               this.$crud.index('apiRoutes.qanalytics.google', params).then(response => {
                 this.tableOptions.data=response.data.mostVisitedPages
                  this.loading=true
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
