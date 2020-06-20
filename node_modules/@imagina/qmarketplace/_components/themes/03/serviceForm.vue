<template>
   <div>
      <q-card class="card-serviceForm"  style="min-width: 272px; max-width: 350px">
         <q-card-section>
            <div class="row no-wrap items-center">
               <div class="col text-h6 ellipsis">
                  Sólisita su servicio de {{service.title}}
               </div>
            </div>
         </q-card-section>

         <q-card-section class="q-pt-none">
            <div class="text-caption text-grey">
               <q-form
                       @submit="sendEmail()"
                       @reset="onReset()"
                       class="q-gutter-md"
               >
                  <q-input
                          filled
                          v-model="form.name"
                          label="Nombre Completo*"
                          lazy-rules
                          :rules="[ val => !!val || this.$tr('ui.message.fieldRequired'),]"/>

                  <q-input
                          filled
                          type="email"
                          v-model="form.email"
                          label="Correo Electronico *"
                          lazy-rules
                          :rules="[
                              val => !!val || this.$tr('ui.message.fieldRequired'),
                               val => this.$helper.validateEmail(val) || this.$tr('ui.message.fieldEmail')
                          ]"/>
                  <q-input
                          filled
                          v-model="form.service"
                          label="Servcio Solisitar *"
                          lazy-rules
                          :rules="[ val => !!val || this.$tr('ui.message.fieldRequired'),]"></q-input>
                  <q-input
                          filled
                          type="textarea"
                          v-model="form.message"
                          label="Mensaje *"
                          lazy-rules
                          :rules="[ val => !!val || this.$tr('ui.message.fieldRequired'),]"></q-input>

                  <div>
                     <q-btn label="Submit" type="submit" color="primary"></q-btn>
                     <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
                  </div>
               </q-form>
            </div>
         </q-card-section>
      </q-card>
   </div>
</template>
<script>
   export default {
      props: {service: {default: 0}},
      watch: {},
      data() {
         return {
            form:{
               name: null,
               email: null,
               phone: null,
               service: null,
               message: null,
               storeEmail:null
            }
         }
      },
      mounted() {
         this.$nextTick(function () {
            this.init()
         })
      },
      methods: {
         init(){
            let user=this.$store.state.quserAuth.userData
            this.form.name= user.fullName;
            this.form.email=user.email;
            this.form.service=this.service.service.title
            this.form.storeEmail=this.service.store.options.email||'info@dondeestaesavaina.com'
         },
         sendEmail() {
            this.loading = true
            return new Promise((resolve, reject) => {
               let data = this.form

               this.$crud.create("apiRoutes.qmarketplace.email", data)
                   .then(response => {
                      this.$q.dialog({
                         title: 'Solisitud Enviada ',
                         color: 'positive',
                      }).onOk(() => {
                         this.onReset()
                         this.loading = false
                      })
                   }).

               this.$crud.create('apiRoutes.qmarketplace.email', params).then(response => {
                  this.services=response.data
                  this.loading = false
                  resolve(true)
               }).catch(error => {
                  console.error(`SERVICES ERROR GET - ${error}`)
                  reject(`SERVICES ERROR GET - ${error}`)
                  this.loading = false
               })
            })
         },
         onReset() {

         }
      }
   }
</script>
<style lang="stylus">
   .theme-layout-03
      .share-networks
         padding 2% 0

         .networks
            a
            & i
               margin 10px
               font-size 2rem
               color $storeSecondary

               &:hover
                  color $storePrimary
</style>
