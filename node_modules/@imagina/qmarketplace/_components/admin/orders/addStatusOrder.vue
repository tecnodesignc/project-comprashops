<template>
  <div id="orderStatusComponent" class="q-pa-md" style="min-width: 240px">
    <q-form autocorrect="off" autocomplete="off" ref="formContent" class="box"
            @submit="createItem()"
            @validation-error="$alert.error($tr('ui.message.formInvalid'))">
    <p>
      <b>Nuevo estado</b>
    </p>
      <q-select
              outlined
              dense
              v-model="form.status"
              :options="statOptions"
              map-options
              emit-value
              use-input
              clearable
              option-label="label"
              @filter="(val, update)=>update(()=>{statOptions = $helper.filterOptions(val,statusOptions,form.status)})"

      />

    <p>
      <b style="font-size: 12px ">Comentario</b>
    </p>
      <q-input  outlined
                dense
                class="text-comment" rows="2"
                type="textarea"
                placeholder="Escribe aqui tu comentario"
                v-model="form.comment"
      />
      <q-toggle
              v-model="form.notify"
              checked-icon="check"
              color="primary"
              :false-value=false
              :true-value=true
              label="Notificar al usuario"
              unchecked-icon="clear"
      />
    <div class="q-mt-md text-right">
      <q-btn label="Guardar" color="primary" icon="save" type="submit"/>
    </div>
    </q-form>
  </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        loading: false,
        statusOptions:[],
        statOptions:[],
        form :{
          orderId: this.$route.params.id,
          status:null,
          notify: false,
          comment:''
        }
      }
    },

    created(){
      this.getStatus()
    },
    methods: {
      getStatus(){
        return new Promise((resolve, reject) => {
          let params = {
            params: {}
          }
          this.$crud.index('apiRoutes.qcommerce.orderStatus', params)
                  .then(response => {
                    this.statusOptions=this.$array.select(response.data, {label: 'title', id: 'id'});
                    this.statOptions =this.$clone(this.statusOptions)
                    this.loading = false
                    resolve(true)
                  })
                  .catch(error => {
                    console.error('ERROR GET Status:' + error)
                    this.loading = false
                    reject(error)
                  })
        });
      },
      createItem(){
        this.$crud.create('apiRoutes.qcommerce.orderStatusHistory', this.form)
          .then( response => {
            this.$emit('orderHistoryCreated')
            this.$alert.success({message: this.$tr('ui.message.recordUpdated')})
            this.clearForm()
            this.loading = false
          })
          .catch( error => {
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
            this.loading = false
        })
      },
      clearForm(){
        this.form.comment = ''
        this.form.status = null
      }
    }
  }
</script>
<style lang="stylus">
#orderStatusComponent
  .text-comment
    width 100%
    .q-field__native
      padding-top 0
</style>

