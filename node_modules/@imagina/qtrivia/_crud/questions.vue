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
          apiRoute: 'apiRoutes.qtrivia.questions',
          permission: 'itrivia.questions',
          create: {
            title: this.$tr('qtrivia.layout.newQuestion'),
          },
          read: {
            columns: [
              {
                name: 'title', 
                label: this.$tr('ui.form.title'), 
                field: 'title', 
                align: 'rigth'
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
            title: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props: {
                label: `${this.$tr('ui.form.title')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }    
            },
            triviaId: {
              value: this.$route.params.id,
              type: 'select',
              clearable: false,
              isRequired: true,
              loadOptions: {
                apiRoute: 'apiRoutes.qtrivia.trivias',
                select: {label: 'title', id: 'id'},
                requestParams: {filter: {triviaId : this.$route.params.id}}
              },
              props: {
                label: this.$tr('qtrivia.layout.singleTrivia'),
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              },
            } 
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
