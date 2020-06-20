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
               apiRoute: 'apiRoutes.qmarketplace.storeContact',
               // permission: 'marketplace.storecontacts',
               create: {
                  title: this.$tr('qmarketplace.layout.newStoreContact'),
               },
               read: {
                  columns: [
                     {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
                     {
                        name: 'fullName',
                        label: this.$tr('qmarketplace.layout.form.storeContact.fullName'),
                        field: 'fullName',
                        style: 'width: 50px',
                        align: 'rigth'
                     },
                     {
                        name: 'createdAt', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
                        format: val => val ? this.$trd(val) : '-',
                     },
                     {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
                  ],
                  requestParams: {
                     include: '',
                     filter: {
                       store: this.$store.state.qmarketplaceStores.storeSelected,
                        allTranslations: true,
                     }
                  },
                  filters: {}
               },
               update: {
                  title: this.$tr('qmarketplace.layout.editStoreContact'),
               },
               delete: true,
               formLeft: {
                 storeId: {value: this.$store.state.qmarketplaceStores.storeSelected},
                  fullName: {
                     value: null,
                     type: 'input',
                     isTranslatable: false,
                     props: {
                        label: `${this.$tr('qmarketplace.layout.form.storeContact.fullName')} *`,
                        rules: [
                           val => !!val || this.$tr('ui.message.fieldRequired')
                        ]
                     }
                  },
                  message: {
                     value: '',
                     type: 'html',
                     isTranslatable: false,
                     props: {
                        label: `${this.$tr('qmarketplace.layout.form.storeContact.message')}*`,
                        rules: [
                           val => !!val || this.$tr('ui.message.fieldRequired')
                        ],
                     }
                  },
               },
               formRight: {
                 email: {
                   value: null,
                   type: 'input',
                   props: {
                     label: `${this.$trp('ui.form.email')} *`,
                     rules: [
                       val => !!val || this.$tr('ui.message.fieldRequired'),
                       val => this.$helper.validateEmail(val) || this.$tr('ui.message.fieldEmail')
                     ],
                   }
                 },
                 phone: {
                   value: null,
                   type: 'input',
                   props: {
                     label: `${this.$trp('ui.form.phone')} *`,
                     rules: [
                       val => !!val || this.$tr('ui.message.fieldRequired'),
                     ],
                   }
                 },

               },
            }
         },
         //Crud info
         crudInfo() {
            return this.$store.state.qcrudComponent.component[this.crudId] || {}
         }
      }
  }
</script>
