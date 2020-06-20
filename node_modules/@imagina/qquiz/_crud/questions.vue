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
          apiRoute: 'apiRoutes.qquiz.questions',
          permission: 'iquiz.questions',
          create: {
            title: this.$tr('qquiz.layout.newQuestion')
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
              filter: {pollId:this.$route.params.id}
            }
          },
          update: {
            //to: 'qquiz.admin.questions.edit',
          },
          delete: true,
          formLeft: {
            pollId: {value: this.$route.params.id},
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
            /*
            pollId: {
              value: this.$route.params.id,
              type: 'select',
              clearable: false,
              loadOptions: {
                apiRoute: 'apiRoutes.qquiz.polls',
                select: {label: 'title', id: 'id'},
                requestParams: {filter: {pollId : this.$route.params.id}}
              },
              props: {
                label: this.$tr('qquiz.layout.singlePoll'),
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              },
            } 
            */
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
      //Crud info
      crudInfo() {
        return this.$store.state.qcrudComponent.component[this.crudId] || {}
      }
    },
  }
</script>
