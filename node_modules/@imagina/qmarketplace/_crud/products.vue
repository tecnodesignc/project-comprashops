<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qcommerce.products',
          permission: 'icommerce.products',
          create: {
            title: this.$tr('qcommerce.layout.newProduct'),
            to : {
              name : 'qmarketplace.admin.products.store.create',
              params : {
                store: this.$route.params.id
              },
              query : {}
            }
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('ui.form.title'), field: 'name', style: 'width: 50px', align: 'rigth'},
              {name: 'sku', label: this.$tr('ui.form.sku'), field: 'sku', align: 'left'},
              {
                name: 'category', label: this.$tr('ui.form.category'), field: 'category', align: 'left',
                format: val => (val && val.title) ? val.title : ''
              },
              {
                name: 'status', label: this.$tr('ui.form.status'), field: 'status', align: 'left',
                format: val => val ? this.$tr('ui.label.enabled') : this.$tr('ui.label.disabled')
              },
              {
                name: 'Stock', label: this.$tr('ui.form.stock'), field: 'stockStatus', align: 'left',
                format: val => val ? this.$tr('ui.label.available') : this.$tr('ui.label.soldOut')
              },
              {name: 'slug', label: this.$tr('ui.form.slug'), field: 'slug', align: 'left'},
              {
                name: 'price', label: this.$tr('ui.form.price'), field: 'price', align: 'left',
                format: val => this.$trc(val)
              },
              {
                name: 'createdAt', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
            ],
            requestParams: {
              include: 'category',
              filter:{
                store: this.$store.state.qmarketplaceStores.storeSelected
              }
            },
            filters: {
              categoryId: {
                props:{
                  label: `${this.$tr('ui.form.category')}:`,
                  options: [
                    {label: this.$tr('ui.label.all'), id: '0'}
                  ],
                  loadOptions: {
                    apiRoute: 'apiRoutes.qcommerce.categories',
                    requestParams: {
                      filter:{
                        store: this.$store.state.qmarketplaceStores.storeSelected
                      }
                    }
                  },
                  rules: [
                    val => !!val || this.$tr('ui.message.fieldRequired')
                  ],
                },
                value: '0',
                type: 'select',
                isTranslatable: false,
              },
              status: {
                props:{
                  rules: [
                    val => !!val || this.$tr('ui.message.fieldRequired')
                  ],
                  label: `${this.$tr('ui.form.status')}:`,
                  options: [
                    {label: this.$tr('ui.label.enabled'), id: 1},
                    {label: this.$tr('ui.label.disabled'), id: 0}
                  ],
                },
                value: 1,
                type: 'select',
                isTranslatable: false,
              },
              stockStatus: {
                props:{
                  rules: [
                    val => !!val || this.$tr('ui.message.fieldRequired')
                  ],
                  label: `${this.$tr('ui.form.stock')}:`,
                  options: [
                    {label: this.$tr('ui.label.available'), id: 1},
                    {label: this.$tr('ui.label.soldOut'), id: 0}
                  ],

                },
                value: 1,
                type: 'select',
                isTranslatable: false,
              },
            },
          },
          update: {
            to : 'qcommerce.admin.products.edit'
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            userId: {value: this.$store.state.quserAuth.userId},
            description: {
              props:{
                label: this.$tr('ui.form.description'),
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              },
              value: '',
              type: 'input',
              isTranslatable: true,
            },
            optionId: {
              props:{
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
                label: this.$tr('ui.form.option'),
                loadOptions: {
                  apiRoute: 'apiRoutes.qcommerce.options',
                  select: {label: 'description', id: 'id'}
                }
              },
              value: null,
              type: 'select',
              isTranslatable: false,
            },
            sortOrder: {
              props:{
                label: this.$tr('ui.form.sort'),
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              },
              value: 0,
              type: 'number',
              isTranslatable: false,
            },
            mediasSingle: {
               name: 'mediasSingle',
               value: {},
               type: 'media',
               props : {
                  label: this.$tr('ui.form.firstImage'),
                  zone: 'mainimage',
                  entity: "Modules\\Marketplace\\Entities\\CategoryStore",
                  enitityId: null
               }
            },
          },
        }
      }
    }
  }
</script>
