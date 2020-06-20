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
          apiRoute: 'apiRoutes.qtrivia.trivias',
          permission: 'itrivia.trivias',
          create: {
            title: this.$tr('qtrivia.layout.newTrivia'),
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
              filter: {storeId : this.$store.state.qmarketplaceStores.storeSelected}
            },
            actions : [
              {
                icon : 'fas fa-question-circle',
                color : 'warning',
                route : 'qtrivia.admin.questions.index',
                tooltip : 'Preguntas',
              },
              {
                icon : 'fas fa-award',
                color : 'secondary',
                route : 'qtrivia.admin.rangepoints.index',
                tooltip : 'Rangos de Puntos',
              },
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
            storeId:{
              value: parseInt(this.$store.state.qmarketplaceStores.storeSelected),
              type: 'select',
              loadOptions: {
                apiRoute: 'apiRoutes.qmarketplace.store',
                select: {label: 'name', id: 'id'},
                requestParams: {filter: {storeId : this.$store.state.qmarketplaceStores.storeSelected}}
              },
              props: {
                label: 'Tienda',
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              },
              permission: 'marketplace.stores.manage'
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
                label: `${this.$tr('qtrivia.layout.form.startDate')}`
              }    
            },
            endDate:{
              value: '',
              type: 'date',
              isTranslatable: false,
              props: {
                label: `${this.$tr('qtrivia.layout.form.endDate')}`
              }    
            },
            mediasSingle: {
              value: {},
              type: 'media',
              props: {
                label: this.$tr('ui.form.image'),
                zone: 'mainimage',
                entity: "Modules\\Itrivia\\Entities\\Trivia",
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
