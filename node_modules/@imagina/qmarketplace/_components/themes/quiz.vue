<template>
  <q-card class="card-quiz-1 rounded-sm full-width q-mb-xl" v-if="success">

    <div class="q-card-title bg-store-primary rounded-sm text-center text-white q-py-sm">
      ENCUESTA
    </div>
    <q-stepper ref="stepper"
    v-model="currentStep" class="no-shadow" v-if="poll && questions.length">

    <q-step :name="`question-${index}`" :order="index" :title="question.title" v-for="(question, index) in questions"
    :key="index">
    <q-card-section>

      <div class="text-subtitle1 text-bold text-center q-mb-sm">{{question.title}}</div>

      <div v-if="!question.users.find(element => element == userId)">
        <q-option-group keep-color
        v-model="selectedOption"
        :options="getAnswers(question.answers)"
        color="store-primary"

        />
        <q-stepper-navigation align="center" class="q-pa-md">
          <q-btn class="bg-store-primary text-light font-family-secondary" @click="saveData(question)">Enviar
          </q-btn>
        </q-stepper-navigation>

      </div>
      <div v-else>
        <div class="question q-mb-md">
          <table class="q-mx-auto">
            <thead>
              <tr>
                <th style="width:50%;"></th>
                <th class="text-center" style="width:20%;">Votos</th>
              </tr>
            </thead>
            <tbody>
              <tr class="answers" v-for="(answer) in question.answers" :key="answer.id">
                <td>{{answer.title}}</td>
                <td class="text-center"> {{answer.votes}}</td>
              </tr>
              <tr>
                <td>
                  TOTAL
                </td>
                <td class="text-center">
                  {{question.totalVotes}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </q-card-section>

    <q-stepper-navigation align="center" class="q-pa-md" v-if="index < questions.length - 1">
      <div class="text-store-primary text-center cursor-pointer" @click="$refs.stepper.next()">
        <div class="font-family-secondary">Siguiente</div>
      </div>
    </q-stepper-navigation>


  </q-step>
</q-stepper>
<q-card-section v-else-if="!alertContent.active" class="q-py-xl">
  <div class="font-family-secondary text-center">
    No hay encuestas activas
  </div>
</q-card-section>
<!-- msj final -->
<q-card-section v-if="alertContent.active && !showVotes" class="q-py-xl">
  <div class="font-family-secondary text-center">
    {{alertContent.msj}}
  </div>
</q-card-section>
</q-card>


</template>
<script>
//Plugins
import {required} from 'vuelidate/lib/validators'

export default {
  props: ['systemName'],
  validations() {
    return {
      selectedOption: {required}
    }
  },
  beforeMount() {
    this.$nextTick(function () {
      this.init()
    })
  },
  data() {
    return {
      loading: true,
      success: false,
      pollUserIds: [],
      questions: [],
      polls: [],
      poll: false,
      selectedOption: null,
      finalDataSave: [],
      userId: this.$store.state.quserAuth.userId ? this.$store.state.quserAuth.userId : null,
      alertContent: {
        active: false,
        color: 'bg-secondary',
        icon: 'check',
        msj: 'Gracias por participar!!'
      },
      currentStep: "question-0",
      votesPoll: null,
      showVotes: false
    }
  },
  computed: {
    storeData() {
      let storeSlug = this.$route.params.slug

      return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
    },
  },
  methods: {
    // Init Method
    async init() {
      await this.getPoll()
    },
    validateDateWithNow(dateFrom,dateTo){
      var d = new Date();
      var day=d.getDate();
      var month=d.getMonth();
      var year=d.getFullYear();
      var now=day+"/"+month+"/"+year;//DD-MM-YYYY
      var d1 = dateFrom.split("-");//YYYY-MM-DD
      var d2 = dateTo.split("-");//YYYY-MM-DD
      var from = new Date(d1[0], parseInt(d1[1])-1, d1[2]);  // -1 because months are from 0 to 11
      var to   = new Date(d2[0], parseInt(d2[1])-1, d2[2]);
      var check = new Date(year, month, day);
      if(check >= from && check < to){
        return true;
      }else {
        return false;
      }
    },
    getPoll() {
      return new Promise((resolve, reject) => {
        //Params
        let params = {
          params: {
            filter: {
              storeId: this.storeData.id,
              status: 1,
              field: 'system_name',
              questionActive:true
            },
          }
        }
        this.$crud.show("apiRoutes.qquiz.polls", this.systemName, params)
        .then(response => {
          this.poll = response.data
          this.success=true
          this.getQstions()
          resolve(true)//Resolve
        }).catch(error => {
          this.success=true
          reject(false)//Resolve
        })

      })
    },
    getQstions() {
      return new Promise((resolve, reject) => {
        //Params
        let params = {
          params: {
            include:'answers',
            filter: {
              pollId: this.poll.id,
              status: 1,
              questionActive:true
            },
          }
        }
        this.$crud.index("apiRoutes.qquiz.questions", params)
                .then(response => {
                  this.questions = response.data
                  this.success=true
                  resolve(true)//Resolve
                }).catch(error => {
          this.success=true
          reject(false)//Resolve
        })

      })
    },
    saveData(question) {
      this.$v.$touch()
      if (!this.$v.$error) {

        this.loading = true;
        let data={
          'user_id':this.userId,
          'question_id':question.id,
          'answer_id':this.selectedOption
        }

        this.$crud.create('apiRoutes.qquiz.userQuestionAnswers', data).then(response => {
          this.$alert.info({message: 'Encuesta enviada'})
          this.getPoll()
          this.$v.$reset()
          this.showVotes = true
          this.loading = false;
          this.$q.dialog({
            title: 'Encuesta realizada has ganado 5 puntos!',
            color: 'positive',
            ok: 'Ir a Mis Puntos',
            cancel: 'Continuar'
          }).onOk(() => {
            this.$router.push({name: 'qredeems.account.points'})
          }).onCancel(() => {
            this.init()
            this.loading = false
          })

        }).catch(error => {
          console.error('[CREATE USER QUESTION ANSWERS] ', error)
          this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
          this.loading = false
        })

      } else {
        this.$alert.error({message: 'Encuesta: Debe seleccionar una respuesta', pos: 'bottom'})
      }

    },
    getAnswers(arrary) {
      let options = [];
      arrary.forEach((answer, index) => {
        options.push({
          label: answer.title,
          value: answer.id
        })
      });
      return options;

    },


  }

}
</script>
<style lang="stylus">
   .card-quiz-1
      & .q-card-title
         position relative
         font-weight bold

         &:before
            content ''
            background-image url('/statics/img/icon-quiz.png')
            position absolute
            bottom 0
            left 5px
            height 60px
            width 60px
            background-size contain
            background-repeat no-repeat
            background-position bottom

      & .q-option-group
         font-size 17px


      .q-stepper
         .q-stepper__header
            display none

         .q-stepper__step-inner
            padding 15px
</style>
