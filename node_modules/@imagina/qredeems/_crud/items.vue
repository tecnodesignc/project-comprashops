<template></template>
<script>
  export default {
    data() {
      return {
        crudId: this.$uid()
      }
    },
    computed: {
      crudData() {
        return {
          crudId: this.crudId,
          apiRoute: 'apiRoutes.qredeems.items',
          permission: 'iredeems.items',
          create: {
            title: this.$tr('qredeems.layout.newItem')
          },
          read: {
            columns: [
              {
                name: 'id', 
                label: this.$tr('ui.form.id'), 
                field: 'id',
                style: 'width: 50px',
                sortable: true,
              },
              {
                name: 'name', 
                label: this.$tr('ui.form.name'), 
                field: 'name', 
                align: 'rigth'
              },
              {
                name: 'created_at', 
                label: this.$tr('ui.form.createdAt'), 
                field: 'createdAt', 
                align: 'left',
                format: val => val ? this.$trd(val) : '-',
                sortable: true,
              },
              {
                name: 'actions', 
                label: this.$tr('ui.form.actions'), 
                align: 'left'
              },
            ],
            requestParams: {include: ''}
          },
          update: {},
          delete: true,
          formLeft: {
            id: {value: ''},
            name: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props: {
                label: `${this.$tr('ui.form.name')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            value: {
              value: 0,
              type: 'input',
              isTranslatable: false,
              props: {
                type: 'number',
                label: `${this.$tr('qredeems.layout.form.value')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            mediasSingle: {
              value: {},
              type: 'media',
              props: {
                label: this.$tr('ui.form.image'),
                zone: 'mainimage',
                entity: "Modules\\Iredeems\\Entities\\Item",
                enitityId: null
              }
            },

          }
        }
      },
      //Crud info
      crudInfo() {
        return this.$store.state.qcrudComponent.component[this.crudId] || {}
      }
    },
  }
</script>
