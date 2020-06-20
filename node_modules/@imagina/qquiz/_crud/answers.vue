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
          apiRoute: 'apiRoutes.qquiz.answers',
          permission: 'iquiz.answers',
          create: {
            title: this.$tr('qquiz.layout.newAnswer')
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
            requestParams: {}
          },
          update: {
            //to: 'qquiz.admin.questions.edit',
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
      //Crud info
      crudInfo() {
        return this.$store.state.qcrudComponent.component[this.crudId] || {}
      }
    },
  }
</script>
