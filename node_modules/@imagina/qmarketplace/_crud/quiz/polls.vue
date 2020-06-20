<template></template>
<script>
   export default {
      computed: {
         crudData() {
            return {
               crudId: this.crudId,
               apiRoute: 'apiRoutes.qquiz.polls',
               permission: 'marketplace.polls',
               create: {
                  title: this.$tr('qquiz.layout.newPoll'),
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
                        name: 'systemName',
                        label: this.$tr('qquiz.layout.form.systemName'),
                        field: 'systemName',
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
                        icon: 'fas fa-question-circle',
                        color: 'warning',
                        tooltip : 'Preguntas',
                        route: 'qmarketplace.admin.questions.index', //redirect to route, and set all data row as route params
                        action: (rowData) => {
                        } //Get row data as param
                     }
                  ],
                  requestParams: {
                     filter: {storeId: this.$store.state.qmarketplaceStores.storeSelected}
                  },
                  filters: {},
               },
               update: {
                  requestParams: {filter: {storeId: this.$store.state.qmarketplaceStores.storeSelected}}
               },
               delete: true,
               formLeft: {
                  id: {value: ''},
                  storeId: {value: this.$store.state.qmarketplaceStores.storeSelected},
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
                  systemName: {
                     value: null,
                     type: 'input',
                     props: {
                        label: `${this.$tr('qquiz.layout.form.systemName')} *`,
                        rules: [
                           val => !!val || this.$tr('ui.message.fieldRequired')
                        ]
                     }
                  },
                  description: {
                     value: '',
                     type: 'html',
                     isTranslatable: true,
                     props: {
                        label: `${this.$tr('ui.form.description')}*`,
                        rules: [
                           val => !!val || this.$tr('ui.message.fieldRequired')
                        ],
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
                  logged: {
                     value: 1,
                     type: 'select',
                     props: {
                        label: `${this.$tr('qquiz.layout.form.logged')}:`,
                        rules: [
                           val => !!val || this.$tr('ui.message.fieldRequired')
                        ],
                        options: [
                           {label: this.$tr('ui.label.yes'), value: '1'},
                           {label: this.$tr('ui.label.no'), value: '0'},
                        ],
                     },
                  }
               },
            }
         },
         crudInfo() {
            return this.$store.state.qcrudComponent.component[this.crudId] || {}
         }
      }

   }
</script>
