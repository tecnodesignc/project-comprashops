<template>
  <div id="pageId">
    <div class="row gutter-x-sm">
      
      <div class="col-12 col-md-12 q-mb-md">
        <q-btn 
        color="primary"  
        icon="fas fa-question-circle" 
        size="md" 
        :label="$tr('qquiz.layout.goQuestions')"
        @click="$router.push({name: 'qquiz.admin.questions.index'})" />
      </div>

      <!---Form Left-->
      <div class="col-12 col-md-12">
        <!---Component CRUD-->
        <crud :crud-data="import('@imagina/qquiz/_crud/answers')"/>
      </div>

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
        console.log('questionId:'+this.$route.params.id)
        //if (this.$route.params.id) this.itemId = this.$route.params.id
       
      },
    }
  }
</script>
<style lang="stylus">
  //@import "~variables";
</style>
