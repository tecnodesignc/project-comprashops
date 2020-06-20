<template>
  <div id="pageId">
    <div class="text-h5 text-primary q-pb-md q-pl-lg font-family-secondary">Categories de Producto</div>
    <!---Component CRUD-->
    <crud :crud-data="import('@imagina/qmarketplace/_crud/productCategories')" />
  </div>
</template>
<script>
  export default {
    props: {},
    components: {},
    watch: {},
    validations() {
      return {}
    },
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>
<style lang="stylus">
</style>
