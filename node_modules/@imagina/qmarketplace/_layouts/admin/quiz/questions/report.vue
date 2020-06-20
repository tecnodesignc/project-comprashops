<template>
  <div id="storeReport">

    <div class="text-h5 text-primary q-pb-md q-pl-lg font-family-secondary">Reporte de pregunta</div>
    <q-card class="rounded-md bg-white full-width q-my-sm">

      <div class="col-12 col-md-12 q-mb-md">
         <q-btn
                 color="primary"
                 icon="fas fa-question-circle"
                 size="md"
                 label="Volver a la pregunta"
                 @click="redirectQuestion()"/>
      </div>

      <div class="q-pa-lg" v-if="question">

        <div class="row q-col-gutter-md q-mb-md">

          <div class="col-xs-12 col-sm-12 col-md-12">

            <div class="row items-center bg-teal full-height">
              <div class="col-5 bg-teal-8 full-height">
                <div class="row full-height justify-center items-center text-white text-h5">
                  {{question.users.length}}
                </div>
              </div>
              <div class="col-7">
                <div class="q-pl-md text-white q-py-md">Total de usuarios que han respondido esta pregunta</div>
              </div>
            </div>

          </div>


        </div>

        <div class="row q-col-gutter-md q-mb-md">

          <div class="col-xs-12 col-sm-12 col-md-12">

            <div class="row items-center bg-teal full-height">
              <div class="col-12 bg-teal-8 full-height">
                <q-table
                separator="cell"
                :title="question.title"
                :data="question.answers"
                :columns="[
                {
                  name: 'title',
                  required: true,
                  label: 'Respuesta',
                  align: 'left',
                  field: row => row.title,
                  format: val => `${val}`,
                  sortable: true
                },
                {
                  name: 'votes',
                  align: 'center',
                  label: 'Cantidad de usuarios que han utilizado esta respuesta',
                  field: 'votes',
                  sortable: true
                },
                {
                  name: 'userNames',
                  align: 'center', 
                  label: 'Usuarios que han marcado esta respuesta',
                  field: 'userNames',
                  sortable: true
                },
                ]"
                  row-key="name"
                  />
                <div class="row full-height justify-center items-center text-white text-h5">
                </div>
              </div>

            </div>

          </div>


        </div>

      </div>

    </q-card>
  </div>
</template>
<script>

export default {
  props: {},
  components: {

  },
  watch: {},
  data() {
    return {
      question: null,
    }
  },
  mounted(){
    this.$nextTick(function () {
       this.init()
    });
  },
  methods: {
    async init() {
       this.report()
    },
    report(){
      let params = {
        params: {
          filter:{
            //storeId:this.$store.state.qmarketplaceStores.storeSelected,
            //question: this.$route.params.id,
          },include:"answers.userQuestionAnswers,userQuestionAnswers.user"
        }
      };//params
      this.$crud.show("apiRoutes.qquiz.questions",this.$route.params.id,params).then(response => {
        this.question=response.data;
      });
    },
    redirectQuestion(){
      this.$router.push({name: 'qmarketplace.admin.questions.index', params: {id: this.question.poll_id}})
    }


  }
}
</script>
<style lang="stylus">
#storeReport
   .btn-more
      border-top 1px solid #eee
   .highcharts-legend
      display none !important
   .avatar-user
      .q-avatar__content
         border-radius 50%
         border 2px solid #eee
   .q-list
      .items-product
         border-bottom 1px solid #eee
         padding 10px
      .items-product:last-child
         border-bottom 0
   @media screen and (max-width: $breakpoint-xs)
      .icon-sm
         display none !important
      .text-h6
         text-align center
</style>
