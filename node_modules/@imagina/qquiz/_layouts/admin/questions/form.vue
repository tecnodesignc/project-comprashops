<template>
  <div id="adminQuestionsFrom">
   <!--Content-->
    <div class="relative-position q-mb-lg backend-page">

      <!--Form-->
      <div class="box">
        <div class="row gutter-x-sm">

           <!--Languages-->
          <div class="col-12">
            <locales ref="localeComponent" v-model="locale" @validate="$v.$touch()"/>
          </div>

          <!---Form Left-->
          <div class="col-12 col-md-8" v-if="locale.success">

            <h5 class="bg-primary q-mb-sm text-white q-px-md">Pregunta</h5>

            <!--Title-->
            <q-field
              :error="$v.locale.formTemplate.title.$error"
              :error-label="$tr('ui.message.fieldRequired')"
            >
              <q-input :stack-label="`${$tr('ui.form.title')} (${locale.language}) *`"
                       type="text" v-model="locale.formTemplate.title"/>
            </q-field>

            <h5 class="bg-primary q-mb-sm text-white q-px-md">Respuestas</h5>

          </div>

        </div>
      </div>

      <!--Buttons Actions-->
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <!--Update button-->
        <q-btn
          v-if="itemId"
          color="positive" :loading="loading.page"
          icon="fas fa-edit" :label="$tr('ui.label.update')" @click="updateItem()"
        />
        <!--Save button-->
        <q-btn-dropdown :label="buttonActions.label" split v-else :loading="loading.app"
                        content-style="min-width: 250px !important"
                        color="positive" icon="fas fa-save" @click="createItem()" rounded align="right">
          <q-list link>
            <q-item @click.native="buttonActions = {label : optionsFields.btn.saveAndReturn, value : 1}"
                    v-close-overlay>
              {{optionsFields.btn.saveAndReturn}}
            </q-item>
            <q-item @click.native="buttonActions = {label : optionsFields.btn.saveAndCreate, value : 3}"
                    v-close-overlay>
              {{optionsFields.btn.saveAndCreate}}
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-page-sticky>

      <!--Loading-->
      <inner-loading :visible="loading.page"/>
    </div>

  </div>
</template>
<script>
  //Plugins
  import {required} from 'vuelidate/lib/validators'
  //Components
  import mediaForm from '@imagina/qmedia/_components/form'
  import recursiveList from 'src/components/master/recursiveListSelect'
  import schedulesForm from 'src/components/master/schedules'

  export default {
    props: [
      //'pollIDP'
    ],
    components: {mediaForm, recursiveList, schedulesForm},
    watch: {},
    validations() {
      return this.getObjectValidation()
    },
    mounted() {
      this.$nextTick(function () {
        this.init()
      })
    },
    data() {
       return {
        loading: {
          page: false
        },
        configName: 'apiRoutes.qquiz.questions',
        itemId: false,
        locale: {
          fields: {
            id: '',
            pollId: ''
          },
          fieldsTranslatable: {
            title: ''
          },
          validations: {
            title: {required}
          }
        },
        editorText: {
          toolbar: [
            ['bold', 'italic', 'strike', 'underline', 'removeFormat'],
            ['link'],
            [
              {
                label: 'Font Size',
                icon: 'format_size',
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
              }
            ],
            ['quote', 'unordered', 'ordered'],
            ['fullscreen']
          ]
        },
        buttonActions: {}
      }
    },
    computed: {
      //Options translatables
      optionsFields() {
        return {
          btn: {
            saveAndReturn: this.$tr('ui.message.saveAndReturn'),
            saveAndCreate: this.$tr('ui.message.saveAndCreate'),
          }
        }
      }
    },
    methods: {
       //Init
      async init() {
        //Search id in params URL
        if (this.$route.params.id) this.itemId = this.$route.params.id
        if (this.itemId) await this.getData()//Get data if is edit
        
        //Set default button action
        this.buttonActions = {label: this.optionsFields.btn.saveAndReturn, value: 1}
      },
      //Get data item
      getData() {
        return new Promise((resolve, reject) => {
          this.loading.page = true
          const itemId = this.$clone(this.itemId)

          console.log(pollIDP);
          
          if (itemId) {
            //Params
            let params = {
              refresh: true,
              params: {
                include: 'answers',
                filter: {allTranslations: true}
              }
            }
            //Request
            this.$crud.show(this.configName, itemId, params).then(response => {
              //Get categories ID
              /*
              let categories = []
              response.data.categories.forEach(category => {
                categories.push(category.id)
              })
              */
              //Replace categories to response
              //response.data.categories = this.$clone(categories)
              //Set response to form
              this.locale.form = this.$clone(response.data)
              this.loading.page = false
              resolve(true)//Resolve
            }).catch(error => {
              this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
              this.loading.page = false
              reject(false)//Resolve
            })
          } else {
            resolve(true)//Resolve
          }

        })
      },
      //Return object to validations
      getObjectValidation() {
        let response = {}
        if (this.locale && this.locale.formValidations)
          response = {locale: this.locale.formValidations}
        return response
      },
      //Create Product
      createItem() {
        this.$refs.localeComponent.vTouch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading.page = true
          this.$crud.create(this.configName, this.locale.form).then(response => {
            this.$alert.success({message: `${this.$tr('ui.message.recordCreated')}`})
            this.actionAfterCreated()
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
            this.loading.page = false
          })
        } else {
          this.$alert.error({message: this.$tr('ui.message.formInvalid'), pos: 'bottom'})
        }
      },
      //Action after created
      actionAfterCreated(id) {
        setTimeout(() => {
          let action = this.buttonActions.value
          switch (action) {
            case 1://redirect to index products
              this.$router.push({name: 'qquiz.admin.polls.index'})
              break;
            case 3://Reset and init form
              this.$refs.localeComponent.vReset()
              this.loading.page = false
              break;
          }
        }, 500)
      },
      //Update Product
      updateItem() {
        this.$refs.localeComponent.vTouch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading.page = true
          this.$crud.update(this.configName, this.itemId, this.locale.form).then(response => {
            this.$alert.success({message: `${this.$tr('ui.message.recordUpdated')}`})
            this.$router.push({name: 'qquiz.admin.polls.index'})//Redirect to index
            this.loading.page = false
          }).catch(error => {
            this.loading.page = false
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
          })
        } else {
          this.$alert.error({message: this.$tr('ui.message.formInvalid'), pos: 'bottom'})
        }
      },
    }
  }
</script>
<style lang="stylus">
  @import "~variables";
</style>
