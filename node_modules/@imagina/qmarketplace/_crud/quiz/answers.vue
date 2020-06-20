<template></template>
<script>
   export default {
      computed: {
         crudData() {
            return {
               crudId: this.crudId,
               apiRoute: 'apiRoutes.qquiz.answers',
               permission: 'marketplace.answers',
               create: {
                  title: this.$tr('qquiz.layout.newAnswer'),
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
                  requestParams: {
                     filter: {questionId: this.$route.params.id}
                  },
                  filters: {},
               },
               update: {
                  requestParams: { filter: {questionId: this.$route.params.id}}
               },
               delete: true,
               formLeft: {
                  id: {value: ''},
                  questionId: {value: this.$route.params.id},
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
               },
            }
         },
         crudInfo() {
            return this.$store.state.qcrudComponent.component[this.crudId] || {}
         }
      }

   }
</script>
