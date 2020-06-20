<template>
  <div id="pageId">

       <div class="col-12 col-md-12 q-my-xl">
        <q-btn 
        color="primary"  
        icon="fas fa-brain" 
        size="md" 
        :label="$tr('qtrivia.layout.goTrivias')"
        @click="$router.push({name: 'qtrivia.admin.trivias.index'})" />
      </div>

      <div class="col-12">
        <!---Component CRUD-->
        <crud :crud-data="import('@imagina/qtrivia/_crud/rangepoints')"/>
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
        this.init()
      })
    },
    data() {
      return {}
    },
    methods: {
       //Init
      init() {
        //Search id in params URL
        //console.log('questionId:'+this.$route.params.id)
        //if (this.$route.params.id) this.itemId = this.$route.params.id
       
      },
    }
  }
</script>
<style lang="stylus">
  
</style>
