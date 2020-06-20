<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qmarketplace.benefit',
          permission: 'marketplace.leveltypes',
          create: {
            title: this.$tr('qmarketplace.layout.newBenefit'),
            // to : {
            //   name : 'qmarketplace.admin.levels.create',
            //   params : {},
            //   query : {}
            // }
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', align: 'left'},
              {name: 'name', label: this.$tr('ui.form.name'), field: 'name', align: 'left'},
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
            ],
            requestParams: {},
            filters: {},
          },
          update: {
          },
          delete: true,
          formLeft: {
            name: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props:{
                label: this.$tr('ui.form.name'),
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            systemName: {
              value: '',
              type: 'input',
              isTranslatable: false,
              props:{
                label: "Nombre de sistema",
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
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
        }
      }
    }
  }
</script>
