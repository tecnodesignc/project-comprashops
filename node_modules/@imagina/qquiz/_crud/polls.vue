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
          apiRoute: 'apiRoutes.qquiz.polls',
          permission: 'iquiz.polls',
          create: {
            title: this.$tr('qquiz.layout.newPoll')
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
                name: 'title', 
                label: this.$tr('ui.form.title'), 
                field: 'title', 
                align: 'rigth'
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
                sortable: true,
              },
              {
                name: 'actions', 
                label: this.$tr('ui.form.actions'), 
                align: 'left'
              },
            ],
            requestParams: {},
            actions : [
              {
                icon : 'fas fa-question-circle',
                color : 'warning',
                route : 'qquiz.admin.questions.index',
                tooltip : 'Preguntas',
              }
            ]
          },
          update: {
          
          },
          delete: true,
          formLeft: {
            id: {value: ''},
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
                label: `${this.$tr('ui.form.description')}`
              }
            }
          },
          formRight: {
            status: {
              value: '0',
              type: 'select',
              props: {
                label: this.$tr('ui.form.status'),
                options: [
                  {label: this.$tr('ui.label.enabled'), value: '1'},
                  {label: this.$tr('ui.label.disabled'), value: '0'},
                ]
              },
            },
            startDate:{
              value: '',
              type: 'date',
              isTranslatable: false,
              props: {
                label: `${this.$tr('qquiz.layout.form.startDate')}`
              }    
            },
            endDate:{
              value: '',
              type: 'date',
              isTranslatable: false,
              props: {
                label: `${this.$tr('qquiz.layout.form.endDate')}`
              }    
            },
            logged : {
              value: '1',
              type: 'select',
              props: {
                label: this.$tr('qquiz.layout.form.logged'),
                options: [
                  {label: this.$tr('ui.label.yes'), value: '1'},
                  {label: this.$tr('ui.label.no'), value: '0'},
                ]
              }
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
