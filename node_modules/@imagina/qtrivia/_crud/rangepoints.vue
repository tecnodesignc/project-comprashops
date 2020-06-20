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
          apiRoute: 'apiRoutes.qtrivia.rangepoints',
          permission: 'itrivia.rangepoints',
          create: {
            title: this.$tr('qtrivia.layout.newRangePoint'),
          },
          read: {
            columns: [
              {
                name: 'value', 
                label: this.$tr('qtrivia.layout.form.value'), 
                field: 'value', 
                align: 'rigth'
              },
              {
                name: 'points', 
                label: this.$tr('qtrivia.layout.form.points'), 
                field: 'points', 
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
            requestParams: {
              filter: {triviaId:this.$route.params.id}
            }
          },
          update: {
           
          },
          delete: true,
          formLeft: {
            value: {
              value: 0,
              type: 'input',
              isTranslatable: false,
              props: {
                type: 'number',
                label: `${this.$tr('qtrivia.layout.form.value')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            points: {
              value: 0,
              type: 'input',
              isTranslatable: false,
              props: {
                type: 'number',
                label: `${this.$tr('qtrivia.layout.form.points')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            triviaId: {
              value: this.$route.params.id,
              type: 'select',
              clearable: false,
              loadOptions: {
                apiRoute: 'apiRoutes.qtrivia.trivias',
                select: {label: 'title', id: 'id'},
                requestParams: {filter: {triviaId : this.$route.params.id}}
              },
              props: {
                label: `${this.$tr('qtrivia.layout.singleTrivia')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            } 
          }
        }
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  }
</script>
