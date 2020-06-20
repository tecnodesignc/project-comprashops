<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qcommerce.orders',
          permission: 'marketplace.orders',
          create: false,
          read: {
            columns: [
              {name: 'actions', label: 'Ver Orden', align: 'right'},
              {name: 'id', label: 'Orden N°', field: 'id'},
              {name: 'total', label: this.$tr('qcommerce.layout.form.total'), field: 'total'},
              {name: 'statusName', label: this.$tr('ui.form.status'), field: 'statusName'},
              // {name: 'paymentCity', label: this.$tr('qcommerce.layout.form.city'), field: 'paymentCity'},
              // {name: 'paymentCountry', label: this.$tr('qcommerce.layout.form.country'), field: 'paymentCountry'},
              {name: 'paymentFirstName', label: this.$tr('ui.form.name'), field: 'paymentFirstName'},
              {name: 'paymentLastName', label: this.$tr('ui.form.lastName'), field: 'paymentLastName'},
              {name: 'email', label: this.$tr('ui.form.email'), field: 'email', style: 'width: 50px'},
              {name: 'shippingMethod', label: this.$tr('qcommerce.layout.form.shippingMethod'), field: 'shippingMethod'},

            ],
            requestParams: {
              filter:{
                store: this.$store.state.qmarketplaceStores.storeSelected,
                order:{
                  field:"created_at",
                  way:"DESC",
                }
              }
            },
            filters: {

            },
            actions : [
              {
                icon : 'fas fa-info-circle',
                color : 'info',
                route : 'qmarketplace.admin.shipping.orders.show',
                action : () => {

                }
              }
            ]
          },
          update: false,
          delete: false,
          formLeft: {},
        }
      }
    }
  }
</script>
