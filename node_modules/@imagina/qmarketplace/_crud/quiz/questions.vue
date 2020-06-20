<template></template>
<script>
   export default {
      computed: {
         crudData() {
            return {
               crudId: this.crudId,
               apiRoute: 'apiRoutes.qquiz.questions',
               permission: 'marketplace.questions',
               create: {
                  title: this.$tr('qquiz.layout.newQuestion'),
               },
               read: {
                  columns: [
                     {
                        name: 'id',
                        label: this.$tr('ui.form.id'),
                        field: 'id',
                        align: 'left'
                     },
                     {
                        name: 'title',
                        label: this.$tr('ui.form.title'),
                        field: 'title',
                        align: 'left'
                     },
                     {
                        name: 'created_at',
                        label: this.$tr('ui.form.createdAt'),
                        field: 'createdAt',
                        align: 'left',
                        format: val => val ? this.$trd(val) : '-',
                     },
                     {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
                  ],
                  actions: [//Add action buttons by record
                     {
                        icon: 'fas fa-list-alt',
                        color: 'pink-7',
                        route: 'qmarketplace.admin.answers.index', //redirect to route, and set all data row as route params
                        action: (rowData) => {
                        } //Get row data as param
                     },
                     {
                        icon: 'fas fa-edit',
                        color: 'warning',
                        tooltip:'Reporte',
                        route: 'qmarketplace.admin.questions.report.index', //redirect to route, and set all data row as route params
                        action: (rowData) => {
                        } //Get row data as param
                     }
                  ],
                  requestParams: {
                     filter: {pollId: this.$route.params.id}
                  },
                  filters: {},
               },
               update: {
                  requestParams: {filter: {pollId: this.$route.params.id}}
               },
               delete: true,
               formLeft: {
                  pollId: {value: this.$route.params.id},
                  title: {
                     value: null,
                     type: 'input',
                     isTranslatable: true,
                     props: {
                        label: `${this.$tr('ui.form.title')} *`,
                        rules: [
                           val => !!val || this.$tr('ui.message.fieldRequired')
                        ]
                     }
                  },
               },
               formRight: {
                  status: {
                     value: 0,
                     type: 'select',
                     props: {
                        label: `${this.$tr('ui.form.status')}:`,
                        rules: [
                           val => !!val || this.$tr('ui.message.fieldRequired')
                        ],
                        options: [
                           {label: this.$tr('ui.label.enabled'), value: '1'},
                           {label: this.$tr('ui.label.disabled'), value: '0'},
                        ],
                     },

                  },
                  startDate: {
                     value: '',
                     type: 'date',
                     props: {
                        label: this.$tr('qquiz.layout.form.startDate'),
                     }
                  },
                  endDate: {
                     label: this.$tr('qquiz.layout.form.endDate'),
                     value: '',
                     type: 'date',
                     props: {
                        label: this.$tr('qquiz.layout.form.endDate'),
                     }
                  },
               },
            }
         },
         crudInfo() {
            return this.$store.state.qcrudComponent.component[this.crudId] || {}
         }
      }

   }
</script>
