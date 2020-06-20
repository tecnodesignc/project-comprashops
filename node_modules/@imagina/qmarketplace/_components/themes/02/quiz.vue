<template>
  <q-card class="card-quiz-2  q-mb-xl">

    <div class="q-card-title font-family-secondary text-center text-store-primary q-py-sm">
      <h6 class="q-mt-md q-mb-none">Participa en </h6>
      <h3 class="q-my-none">Encuesta</h3>
    </div>


    <q-stepper v-if="success && answers.length>0 && !alertContent.active && !showVotes" ref="stepper" v-model="currentStep" class="no-shadow">


      <q-step :name="question.id" :order="index" :title="question.title" v-for="(question, index) in poll.questions" :key="index">

        <q-card-section>

         <div class="text-subtitle1 text-bold q-mb-sm">{{question.title}}</div>

          <q-option-group keep-color
            v-model="selectedOptions"
            :options="answers[index]"
            color="store-primary"
            type="checkbox"
          />

        </q-card-section>

        <q-stepper-navigation  align="right" class="q-pa-md" v-if="index < poll.questions.length - 1" >
          <div class="text-store-primary text-center cursor-pointer" @click="next()">
            <div class="font-family-secondary">Siguiente</div>
          </div>
        </q-stepper-navigation>
        <q-stepper-navigation align="right" v-else class="q-pa-md" >
           <q-btn class="bg-store-primary text-light font-family-secondary" @click="saveData">Enviar</q-btn>
        </q-stepper-navigation>

      </q-step>

      <q-inner-loading :visible="loading" />
    </q-stepper>


    <!-- msj final -->
    <q-card-section v-if="alertContent.active && !showVotes" class="q-py-xl">
      <div class="font-family-secondary text-center">
        {{alertContent.msj}}
      </div>
    </q-card-section>


    <!-- Votes Poll -->
    <div v-if="showVotes" class="votesPoll text-store-primary q-px-md q-py-md">

        <div class="text-h6 font-family-secondary q-my-sm">Resultados</div>
        <div class="contentPoll" v-for="(question, index) in votesPoll" :key="index">

          <div class="question q-mb-md">
            <div class="text-center text-subtitle1">{{question.title}} </div>
            <table class="q-mx-auto">
              <thead>
                <tr>
                  <th style="width:50%;"></th>
                  <th class="text-center" style="width:20%;">Votos</th>
                </tr>
              </thead>
              <tbody>
                <tr class="answers" v-for="(answer, index2) in question.answers" :key="index2">
                  <td>{{answer.title}}</td> <td class="text-center">  {{answer.votes}} </td>
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

    </div>

  </q-card>

</template>
<script>
  //Plugins
  import {required} from 'vuelidate/lib/validators'

    export default {

        validations() {
          return {
            selectedOptions: {required}
          }
        },
        beforeMount() {
          this.$nextTick(function () {
             this.init()
          })
        },
        data () {
            return {
                loading: false,
                success: false,
                pollUserIds:[],
                polls:[],
                poll:null,
                answers: [],
                answersOptions: [],
                selectedOptions: [],
                finalDataSave:[],
                userId: this.$store.state.quserAuth.userId ? this.$store.state.quserAuth.userId : null,
                alertContent:{
                  active: false,
                  color:'bg-secondary',
                  icon:'check',
                  msj:'Gracias por participar!!'
                },
                currentStep: null,
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
            this.loading = true

            // Get polls where user has voted
            if(this.userId!=null)
                await this.getUserPolls().catch(error => {})

            await this.getPolls().catch(error => {})

            if(this.polls.length>0){

              this.poll = this.polls[0]
              // Get answers for each question
              for (let i=0;i<this.poll.questions.length;i++) {
                let qId = this.poll.questions[i].id
                await this.getAnswers(qId,i).catch(error => {})
                this.answers[i] = this.answersOptions
                this.answersOptions = []

                // Set questionID to step
                if(i==0) this.currentStep = qId
              }

            }else{
              if(this.userId!=null)
                this.alertContent.msj = "Ya respondiste todas las encuestas disponibles"
              else
                this.alertContent.msj = "No existen Encuestas disponibles"

              this.alertContent.active = true
            }

            this.success = true
            this.loading = false

          },

          // Get Polls with all questions
          // Not Loggin - Limit 1 Poll - random
          // Loggin - Limit 1 Poll - Exclude Polls
          getPolls(){
            return new Promise((resolve, reject) => {

              //filter:
              let fixFilter = {}

              if(this.userId!=null)
                fixFilter =  {storeId:this.storeData.id,allTranslations: true,status: 1,exclude:this.pollUserIds}
              else
                fixFilter = {storeId:this.storeData.id,allTranslations: true,status: 1,random:true,logged:0}

              //Params
              let params = {
                refresh: true,
                params: {
                  include: 'questions',
                  filter: fixFilter,
                  take: 1
                }
              }

              this.$crud.index("apiRoutes.qquiz.polls",params).then(response => {

                this.polls = response.data
                resolve(true)//Resolve
              }).catch(error => {
                this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})

                reject(false)//Resolve
              })

            })
          },
          // Get Answers for question
          getAnswers(questionId,pos){
            return new Promise((resolve, reject) => {
              //Params
              let params = {
                refresh: true,
                params: {
                  include: 'answers',
                  filter: {allTranslations: true},
                }
              }

              this.$crud.show("apiRoutes.qquiz.questions",questionId,params).then(response => {

                response.data.answers.forEach((answer, index) => {
                  this.answersOptions.push({
                      label:answer.title,
                      value:answer.id
                  })
                });
                resolve(true)//Resolve

              }).catch(error => {
                this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})

                reject(false)//Resolve
              })


            })
          },
          // Save Data Answers
          saveData(){
            this.$v.$touch()
            if (!this.$v.$error) {

              this.loading = true;
              this.setDataFinal()


              this.finalDataSave.forEach((data, index) => {

                this.$crud.create('apiRoutes.qquiz.userQuestionAnswers', data).then(response => {
                  //console.warn("SAVE USER QUESTION ANSWER")
                }).catch(error => {
                  console.error('[CREATE USER QUESTION ANSWERS] ', error)
                  this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
                  this.loading = false
                })

              })// End Save Answers

              // Finished Poll
              if(this.userId!=null)
                this.saveUserPoll()


              //console.warn("Termino Encuesta")
              //console.warn("Poll ID "+this.poll.id)

              this.getResultsPoll()

              this.$v.$reset()//Reset validations
              //this.alertContent.active = true // OJOOOOOOO

              this.showVotes = true

              this.loading = false;

            }else{
              this.$alert.error({message: 'Encuesta: Debe seleccionar una respuesta', pos: 'bottom'})
            }

          },
          //Save Data User Poll Finished
          saveUserPoll(){

            let data = {
              'poll_id': this.poll.id,
              'user_id' : this.userId
            }
            this.$crud.create('apiRoutes.qquiz.userPolls', data).then(response => {
              this.loading = false
            }).catch(error => {
              console.error('[CREATE USER POLLS] ', error)
              this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
            })

          },
          //Get polls Ids from User
          getUserPolls(){
            return new Promise((resolve, reject) => {

              //Params
              let params = {
                refresh: true,
                params: {
                  filter: {userId:this.userId},
                  fields: 'poll_id'
                }
              }

              this.$crud.index("apiRoutes.qquiz.userPolls",params).then(response => {
                response.data.forEach((userPolls, index) => {
                    this.pollUserIds.push(userPolls.poll_id)
                });
                resolve(true)//Resolve
              }).catch(error => {
                this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})

                reject(false)//Resolve
              })

            })
          },
          // Next question
          next(){
            this.$v.$touch()
            if (!this.$v.$error) {

              this.setDataFinal()
              this.$refs.stepper.next()

            }else{
              this.$alert.error({message: 'Encuesta: Debe seleccionar una respuesta', pos: 'bottom'})
            }
          },
          // set data to Save
          setDataFinal(){

            this.selectedOptions.forEach((answerId, index) => {
              this.finalDataSave.push({
                question_id:this.currentStep,
                answer_id:answerId,
                user_id: this.userId
              })
            })
            this.selectedOptions = []

          },
          // get Results Poll
          getResultsPoll(){
            return new Promise((resolve, reject) => {

              //Params
              let params = {
                refresh: true,
                params: {
                  filter: {votes:true,pollId: this.poll.id},
                  include: 'answers'
                }
              }

              this.$crud.index("apiRoutes.qquiz.questions",params).then(response => {

                this.votesPoll = response.data
                resolve(true)//Resolve

              }).catch(error => {
                this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                reject(false)//Resolve
              })

            })
          }

        }
    }
</script>
<style lang="stylus">
.card-quiz-2
  min-height  400px
  background-color var(--q-color-light)
  border-radius 30px 0 30px 0
  & .q-card-title
    font-weight bold
    & .q-option-group
      font-size 17px

  .q-stepper
    background-color var(--q-color-light)
    .q-stepper__header
      display none
    .q-stepper__step-inner
      padding 15px
</style>
