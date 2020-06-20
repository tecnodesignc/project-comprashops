<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qcommerce.products',
          permission: 'marketplace.products',
          // create: {
          //   title: this.$tr('qcommerce.layout.newProduct'),
          //   to : {
          //     name : 'qmarketplace.admin.stores.my.store.products.create',
          //     params : {
          //       store: this.$store.state.qmarketplaceStores.storeSelected
          //     },
          //     query : {}
          //   }
          // },
           create: {
              icon : 'icon-name',
              title: this.$tr('qcommerce.layout.newProduct'),
              to : {
                 name : 'qmarketplace.admin.stores.business.products.create',
                 params : {storeId: this.$store.state.qmarketplaceStores.storeSelected},
                 query : {}
              } // optional, if you wan create custom form in other page
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
                name: 'visible', label: "Visible", field: 'visible', align: 'left',
                format: val => val==="1" ? "Visible" : "No visible"
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
                store: this.$store.state.qmarketplaceStores.storeSelected,
                visible:null
              }
            },
            filters: {
              categoryId: {
                props:{
                  rules: [
                    val => !!val || this.$tr('ui.message.fieldRequired')
                  ],
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
                  }
                },
                value: '0',
                type: 'select',
                isTranslatable: false,
              },
              visible: {
                props:{
                  rules: [
                    val => !!val || this.$tr('ui.message.fieldRequired')
                  ],
                  label: `Visible:`,
                  options: [
                    {label: "Ambos", id: null},
                    {label: "Sí", id: 1},
                    {label: "No", id: 0}
                  ],
                },
                value: null,
                type: 'select',
                isTranslatable: false,
              },
              stockStatus: {
                props:{
                  label: `${this.$tr('ui.form.stock')}:`,
                  options: [
                    {label: this.$tr('ui.label.available'), id: 1},
                    {label: this.$tr('ui.label.soldOut'), id: 0}
                  ],
                  rules: [
                    val => !!val || this.$tr('ui.message.fieldRequired')
                  ],
                },
                value: 1,
                type: 'select',
                isTranslatable: false,
              },
            },
          },
          update: {
             title: this.$tr('qcommerce.layout.updateProduct'),
             to : 'qmarketplace.admin.stores.business.products.edit'
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
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
                label: this.$tr('ui.form.sort'),
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
