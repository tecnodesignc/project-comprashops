<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qmarketplace.favoriteStore',
          // permission: 'icommerce.products',
          create: false,
          read: {
            columns: [
              {
                name: 'id', 
                label: this.$tr('ui.form.id'), 
                field: 'id'
              },
              {
                name: 'user', 
                label: this.$tr('ui.label.user'), 
                field: 'user',
                format: val => (val && val.fullName) ? val.fullName : '-'
              },
              {
                name: 'store', 
                label: 'Tienda', 
                field: 'store',
                align: 'rigth',
                format: val => (val && val.name) ? val.name : '-'
              },
              {
                name: 'createdAt', 
                label: this.$tr('ui.form.createdAt'), 
                field: 'createdAt', 
                align: 'left',
                format: val => val ? this.$trd(val) : '-',
              }
            ],
            requestParams: {include: 'user,store'},
            filters: {},
            actions : []
          },
          update: false,
          delete: false,
          formLeft: {

          },
        }
      }
    }
  }
</script>
