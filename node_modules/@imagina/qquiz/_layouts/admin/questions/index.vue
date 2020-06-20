<template>
  <div id="pageId">
    <div class="row gutter-x-sm">
      
      <div class="col-12 col-md-12 q-my-xl">
        <q-btn 
        color="primary"  
        icon="fas fa-poll" 
        size="md" 
        :label="$tr('qquiz.layout.goPolls')"
        @click="$router.push({name: 'qquiz.admin.polls.index'})" />
      </div>

      <div class="col-12">
      
        <crudQuestions :crud-data="import('@imagina/qquiz/_crud/questions')"/>
     
      </div>

      <!---Form Left-->
      <!--
      <div class="col-12 col-md-7">
        <crudQuestions :crud-data="import('@imagina/qquiz/_crud/questions')" 
        @questionIdHi="questionId = $event" />
      </div>
      -->
      <!--
      <div class="col-12 col-md-5">
        <crudAnswers :crud-data="import('@imagina/qquiz/_crud/answers')"
        :questionId="questionId"/>
      </div>
      -->

    </div>
  </div>
</template>
<script>

  import crudQuestions  from '@imagina/qquiz/_components/admin/questions/crud'
  //import crudAnswers  from '@imagina/qquiz/_components/admin/answers/crud'
  
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
        //console.log('pollId:'+this.$route.params.id)
        //if (this.$route.params.id) this.itemId = this.$route.params.id
       
      }
    }
  }
</script>
<style lang="stylus">
  
</style>
