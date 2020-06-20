<template>
   <div id="pageId" class="q-layout-page layout-padding">
      <div class="content-box">
         <div class="text-h5 text-primary q-pb-md q-pl-lg font-family-secondary">Encuestas</div>
         <!---Component CRUD-->
         <crud :crud-data="import('@imagina/qmarketplace/_crud/quiz/polls')"/>
      </div>
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

