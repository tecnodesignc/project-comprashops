<template>
  <div class="theme-layout-03">
    <!-- destacado encuenta nuevos y publicidad -->
    <div class="q-pa-md">
      <div class="q-container">
        <div class="row q-col-gutter-xl">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">
            <div class="line-grey q-my-lg"></div>

            <q-list padding>
              <q-item>
                <q-item-section top avatar class="q-mr-md q-hide q-md-show">
                  <q-icon size="xl" color="store-primary" name="far fa-user" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h5 text-weight-bold q-mb-sm">Mi perfil</q-item-label>
                  <q-item-label class="text-subtitle1">
                    <div class="q-mb-md" v-html="storeData.description">
                    </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <div class="line-grey q-my-lg"></div>

         <services/>

          <div class="line-grey q-my-lg"></div>

        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">

          <q-card class="no-border-radius" v-if="$q.platform.is.desktop">
            <q-card-section class="q-pa-lg text-center">
              <chat color="store-secondary" type="5"/>
              <div class="line-grey q-my-md"></div>
              <q-btn @click="contactStore=true" no-caps flat class=" q-py-sm">
                <q-icon size="3em" color="store-primary" name="fas fa-briefcase" />
                <h5 class="text-store-secondary q-mt-sm q-mb-none full-width">Solicita tu servicio</h5>
              </q-btn>

              <div class="line-grey q-my-md"></div>
              <q-btn @click="ratingStore=true" no-caps flat class=" q-py-sm">
                <q-icon size="3em" color="store-primary" name="star" />
                <h5 class="text-store-secondary q-mt-sm q-mb-none full-width">Calificar servicio</h5>
              </q-btn>

              <div class="line-grey q-my-md"></div>
              <share></share>

            </q-card-section>
          </q-card>
          <quiz :system-name="`home-${storeData.id}`"/>

        </div>
      </div>
    </div>
  </div>


  <div>
    <div class="q-container">


      <q-list padding class="q-mb-md">
        <q-item>
          <q-item-section top avatar class="q-mr-md">
            <q-icon size="xl" color="store-primary" name="far fa-images" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h5 text-weight-bold q-mb-sm">Conoce mi trabajo</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>


    </div>
    <div class="row">
      <div class="col-xs-6 col-sm-6 col-md-3" v-for="img in storeData.gallery">
        <div class="ratio-4-3" style="border: 2px solid #fff;">
          <img :src="img.path" alt="">
        </div>
      </div>
    </div>

    <!-- RATING STORE QDIALOG -->
    <q-dialog v-model="ratingStore" @hide="ratingStore=false;">
       <q-card>
          <q-card-section>
             <div class="text-h6">Calificar tienda</div>
          </q-card-section>

          <q-card-section>
             <q-rating size="20px"
                       @input="val => { rating() }"
                       v-model="storeData.averageRating"
                       :max="5"
             />
          </q-card-section>

          <q-card-actions align="right">
             <q-btn flat label="OK" color="primary" v-close-popup/>
          </q-card-actions>
       </q-card>
    </q-dialog>

    <!-- CONTACT REQUEST QDIALOG -->
    <q-dialog v-model="contactStore" @hide="contactStore=false;">
       <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
             <div class="text-h6">Solicitud de servicio</div>
          </q-card-section>

          <q-card-section>

            <div class="row q-col-gutter-xl justify-center">
              <!-- FORM  -->
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                <div class="q-mb-xl">
                   <p class="caption q-mb-sm">Nombre completo</p>
                   <q-input dense v-model="formContact.fullName" placeholder=""/>
                </div>

                <div class="q-mb-xl">
                   <p class="caption q-mb-sm">Asunto</p>
                   <q-input dense v-model="formContact.subject" placeholder=""/>
                </div>

                <div class="q-mb-xl">
                   <p class="caption q-mb-sm">Teléfono</p>
                   <q-input dense v-model="formContact.phone" placeholder=""/>
                </div>

                <div class="q-mb-xl">
                   <p class="caption q-mb-sm">Correo electrónico</p>
                   <q-input dense v-model="formContact.email" placeholder="info@lorem.com">
                      <template v-slot:prepend>
                         <q-icon name="fas fa-envelope" color="primary"/>
                      </template>
                   </q-input>
                </div>

                <!--message-->
                <div class="q-mb-xl">
                   <p class="caption q-mb-sm">Mensaje</p>
                   <q-editor v-model="formContact.message" class="full-width"
                             :toolbar="editorText.toolbar" content-class="text-grey-9"
                             toolbar-text-color="grey-9"/>
                </div>
              </div>

            </div>

          </q-card-section>

          <q-card-actions align="right">
            <q-btn :loading="contactLoading" class="bg-primary text-white" @click="sendContact()" >Enviar solicitud</q-btn>
             <q-btn flat label="Cerrar" color="primary" v-close-popup/>
          </q-card-actions>
       </q-card>
    </q-dialog>


  </div>
</div>

</template>
<script>
import quiz from '@imagina/qmarketplace/_components/themes/quiz'
import share from '@imagina/qmarketplace/_components/themes/03/shareNetworks'
import chat from '@imagina/qmarketplace/_components/qchat/chat'
import services from  '@imagina/qmarketplace/_components/themes/03/services'
export default {
  name: 'PageLayout3',
  components: {
    quiz,
    share,
    chat,
    services
  },
  data() {
     return {
        ratingStore: false,
        //Contact section
        contactLoading:false,
        contactStore: false,
        formContact:{
          fullName:'',
          subject:'Solicitud de servicio',
          email:'',
          phone:'',
          message:'',
          storeId:this.$store.state.qmarketplaceStores.storeSelected
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
        //Contact section
     }
  },
  computed:{
    storeData(){
      let storeSlug = this.$route.params.slug
      return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
    },

  },
  methods:{
    // Contact form
    validateRequiredContactData() {
       if (this.formContact.fullName == "") {
          this.$alert.error({message: "Debe ingresar su nombre completo", pos: 'bottom'});
          return false;
       } else if (this.formContact.subject == "") {
          this.$alert.error({message: "Debe ingresar el asunto de su solicitud", pos: 'bottom'});
          return false;
       } else if (this.formContact.phone == "") {
          this.$alert.error({message: "Debe ingresar su teléfono de contacto", pos: 'bottom'});
          return false;
          return false;
       } else if (this.formContact.email == "") {
          this.$alert.error({message: "Debe ingresar el correo electrónico donde quiere recibir la respuesta", pos: 'bottom'});
          return false;
       } else if (this.formContact.message == "") {
          this.$alert.error({message: "Debe ingresar el mensaje de solicitud", pos: 'bottom'});
          return false;
       } else
          return true;
    },
    clearFormContact(){
      this.formContact.fullName="";
      this.formContact.phone="";
      this.formContact.message="";
      this.formContact.email="";
      this.formContact.subject="Solicitud de servicio";
    },
    sendContact(){
      if (this.validateRequiredContactData()) {
        this.contactLoading=true;
        this.$crud.create("apiRoutes.qmarketplace.storeContact", this.formContact).then(response => {
           this.$alert.success({message: "Solicitud enviada correctamente", pos: 'bottom'})
           this.clearFormContact();
           this.contactStore=false;
           this.contactLoading=false;
        }).catch(error => {
          this.contactLoading=false;
           this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
        });
      }
    },
    // Contact form
    rating() {
       this.$axios.post(config('apiRoutes.marketplace.store') + '/rating/' + this.storeData.id, {
          attributes: {
             rating: this.storeData.averageRating
          }
       }).then(response => {
          this.$alert.success({message: "Calificación registrada exitosamente", pos: 'bottom'});
          this.ratingStore = false;
       }).catch(error => {
          this.$alert.error({message: error.response.data.errors, pos: 'bottom'})
       });
    },//ratingStore
  }
}
</script>
<style lang="stylus">
.theme-layout-03
  .list-item
    display flex
    text-align justify
    margin-bottom 10px
  .card-quiz-1
    border-radius 0!important
    border-top 6px solid $storeSecondary
    box-shadow 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)
    .q-card-title
      padding-top 20px
      padding-bottom 20px
      border-radius 0!important
      background-color #fff !important
      color $storePrimary !important
      font-family $font-secondary
      font-size 20px
      &:before
        content none
</style>
