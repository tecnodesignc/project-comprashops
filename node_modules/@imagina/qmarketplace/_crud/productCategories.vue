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
          apiRoute: 'apiRoutes.qcommerce.categories',
          permission: 'marketplace.productcategories',
          create: {
            title: this.$tr('qcommerce.layout.newCategory'),
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('ui.form.title'), field: 'title', align: 'left'},
              {name: 'slug', label: 'url amigable', field: 'slug', align: 'left'},
              {
                name: 'parent', label: 'Categoría padre', field: 'parent', align: 'left',
                format: val => val ? (val.title ? val.title : '-') : '-'
              },
              {
                name: 'created_at', label: 'Fecha Creación', field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
            ],
            requestParams: {
              include: 'parent',
              filter:{
                store: this.$store.state.qmarketplaceStores.storeSelected
              }
            }
          },
          update: {
            title: this.$tr('qcommerce.layout.updateCategory'),
            requestParams: {include: 'parent'}
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            storeId: {value: this.$store.state.qmarketplaceStores.storeSelected},
            userId: {value: this.$store.state.quserAuth.userId},
            title: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props : {
                label: `${this.$tr('ui.form.title')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              },
            },
            slug: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props : {
                label: `${this.$tr('ui.form.slug')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            description: {
              value: '',
              type: 'html',
              isTranslatable: true,
              props : {
                label: `${this.$tr('ui.form.description')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            metaTitle: {
              value: '',
              isTranslatable: true,
              type: 'input',
              props : {
                label: this.$tr('ui.form.metaTitle'),
              }
            },
            metaDescription: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props : {
                label: this.$tr('ui.form.metaDescription'),
                type: 'textarea',
                rows : 3
              }
            },
          },
          formRight: {
            masterRecord : {
              value: 0,
              isFakeField : true,
              type: 'select',
              props : {
                label: this.$tr('ui.form.masterRecord'),
                options: [
                  {label: this.$tr('ui.label.yes'), value: 1},
                  {label: this.$tr('ui.label.no'), value: 0},
                ]
              }
            },
            parentId: {
              value: 0,
              type: 'select',
              props : {
                label: this.$tr('ui.form.parent'),
                options : [
                  {label: this.$tr('ui.label.disabled'), value: 0},
                ],
                loadOptions: {
                  apiRoute: 'apiRoutes.qcommerce.categories',
                  select: {label: 'title', id: 'id'},
                  requestParams: {include: 'parent', filter:{store:this.$store.state.qmarketplaceStores.storeSelected}}
                }
              },
            },
            mediasSingle: {
              name: 'mediasSingle',
              value: {},
              type: 'media',
              props : {
                label: this.$tr('ui.form.firstImage'),
                zone: 'mainimage',
                entity: "Modules\\Icommerce\\Entities\\Category",
                enitityId: null
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
