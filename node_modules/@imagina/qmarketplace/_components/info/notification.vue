<template>
   <div style="display: inline-block">
      <q-btn @click="CreateNotification = !CreateNotification" color="primary"
             class="q-mx-sm">Enviar Notificacion
      </q-btn>
      <q-dialog v-model="CreateNotification">
         <q-card class="q-pa-lg bg-fondo" style="height: 80vh; max-width: 450px; width: 100% ">
            <q-toolbar>
               <q-btn flat v-close-popup color="primary" round dense icon="fas fa-arrow-left"/>
               <q-toolbar-title class="text-primary font-family-secondary">Enviar Notificacion</q-toolbar-title>
            </q-toolbar>
            <div class="relative-position q-mb-lg backend-page">
               <q-form autocorrect="off" autocomplete="off" ref="formContent" class="box q-mx-md"
                       @submit="createItem()"
                       @validation-error="$alert.error($tr('ui.message.formInvalid'))">
                  <div class="row q-col-gutter-x-md" v-if="success">
                     <!--Language-->
                     <q-card-section>
                        <q-input v-model="form.title" outlined dense
                                 :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                 label="titulo"/>
                        <q-field v-model="form.message" borderless
                                 :rules="[val => !!val || $tr('ui.message.fieldRequired')]">
                           <q-editor v-model="form.message" class="full-width"
                                     :toolbar="editorText.toolbar" content-class="text-grey-9"
                                     toolbar-text-color="grey-9"/>
                        </q-field>
                        <q-select
                                outlined
                                v-model="form.icon"
                                :options="optionsEntity"
                                label="Tipo de Notificacion"
                                option-label="label"
                                dense
                                emit-value
                                map-options
                        />

                        <q-toggle
                                label="Agregar Enlace"
                                color="primary"
                                v-model="link"
                        />
                        <div v-if="link">
                           <q-input v-model="form.link" outlined dense
                                    label="Enlace interno o Externo"/>
                        </div>
                        <div class="text-right">
                           <!--Update button-->
                           <q-btn
                                   color="positive" :loading="loading"
                                   icon="fas fa-plus" :label="$tr('ui.label.create')" type="submit"
                           />
                        </div>

                        <!--Loading-->
                        <inner-loading :visible="loading"/>
                     </q-card-section>
                  </div>
               </q-form>
            </div>
         </q-card>
      </q-dialog>

   </div>
</template>
<script>

   export default {
      name: 'ChatComponent',
      props: ['userSelect'],
      data() {
         return {
            loading: false,
            CreateNotification: false,
            success: true,
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
            followers: true,
            link: false,
            form: {
               title: null,
               message: '',
               icon: null,
               link: '#',
               userId: this.userSelect,
            },
            person: [],
            optionsEntity: [
               {label: 'Notificaciòn', value: 'far fa-bell'},
               {label: 'Noticia', value: 'far fa-newspaper'},
               {label: 'Promociòn', value: 'fas fa-percent'},
               {label: 'Cupon de descuento', value: 'fas fa-tag'}
            ],
            optionsFollowers: []
         }
      },
      mounted() {
         this.$nextTick(function () {
            this.init()
         })
      },
      methods: {
         async init() {
         },
         createItem() {
            this.loading = true
            this.$crud.create("apiRoutes.qnotification.notifications", this.form)
                .then(response => {
                   this.$q.dialog({
                      title: 'Notificaciòn enviada ',
                      color: 'positive',
                   }).onOk(() => {
                      this.form = {
                         title: null,
                         message: '',
                         icon: null,
                         link: '#',
                         userId: null,
                      }
                      this.CreateNotification = false
                      this.loading = false
                   })
                }).catch(error => {
               this.loading = false
               this.$q.dialog({
                  title: 'Notificaciòn no enviada, verifique su conexion',
                  color: 'negative',
               }).onOk(() => {
                  this.loading = false
               })
            })

         },
      }
   }
</script>
