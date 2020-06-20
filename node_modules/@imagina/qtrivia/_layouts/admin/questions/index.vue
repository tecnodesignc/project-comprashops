<template>
  <div id="pageId">
    <div class="row gutter-x-sm">
      
      <div class="col-12 col-md-12 q-my-xl">
        <q-btn 
        color="primary"  
        icon="fas fa-brain" 
        size="md" 
        :label="$tr('qtrivia.layout.goTrivias')"
        @click="$router.push({name: 'qtrivia.admin.trivias.index'})" />
      </div>

      <div class="col-12">
       
        <crudQuestions :crud-data="import('@imagina/qtrivia/_crud/questions')"/>
      
      </div>

      <!---Form Left-->
      <!--
      <div class="col-12 col-md-7">
        <crudQuestions :crud-data="import('@imagina/qtrivia/_crud/questions')" 
        @questionIdHi="questionId = $event" />
      </div>
      -->
      <!--
      <div class="col-12 col-md-5">
        <crudAnswers :crud-data="import('@imagina/qtrivia/_crud/answers')"
        :questionId="questionId"/>
      </div>
      -->

    </div>
  </div>
</template>
<script>
  import crudQuestions  from '@imagina/qtrivia/_components/admin/questions/crud'
  //import crudAnswers  from '@imagina/qtrivia/_components/admin/answers/crud'
  
  export default {
    props: {},
    components: {crudQuestions},
    //components: {crudQuestions,crudAnswers},
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
      return {
        //questionId: true
      }
    },
    methods: {
       //Init
      init() {
        //Search id in params URL
        //console.log('triviaId:'+this.$route.params.id)
        //if (this.$route.params.id) this.itemId = this.$route.params.id
       
      }
    }
  }
</script>
<style lang="stylus">
 
</style>
