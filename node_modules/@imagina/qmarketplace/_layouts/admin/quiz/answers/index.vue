<template>
   <div id="pageId">
      <div class="content-box">
         <div class="text-h5 text-primary q-pb-md q-pl-lg font-family-secondary">Respuestas</div>
         <div class="row gutter-x-sm">

            <div class="col-12 col-md-12 q-mb-md">
               <q-btn
                       color="primary"
                       icon="fas fa-question-circle"
                       size="md"
                       :label="$tr('qquiz.layout.goQuestions')"
                       @click="question()"/>
            </div>

            <!---Form Left-->
            <div class="col-12 col-md-12">
               <!---Component CRUD-->
               <crud :crud-data="import('@imagina/qmarketplace/_crud/quiz/answers')"/>
            </div>

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
            //if (this.$route.params.id) this.itemId = this.$route.params.id

         },
         question() {
            this.$router.push({name: 'qmarketplace.admin.questions.index', params: {id: this.$route.params.poll_id}})
         }
      }
   }
</script>
<style lang="stylus">
   //@import "~variables";
</style>
