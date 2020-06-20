<template>
  <q-page class="bg-fondo-q store-page layout-padding">

      <div class="q-container">
        <div class="row">
          <div class="col-12">

            <q-card class="rounded-md q-mb-xl full-width">

              <q-card-actions align="right" no-caps class="q-px-lg q-pt-lg q-pb-none">
                <q-btn class="rounded-sm  font-family-secondary" no-caps color="primary" icon="fas fa-eye" label="Vista previa"/>
              </q-card-actions>

              <q-card-section class="q-px-xl form-general">

                <div class="text-h5 text-primary q-mb-xs font-family-secondary">Eligue tu tema</div>
                <div class="text-subtitle1 text-secondary">
                    Elige el tema que más se adapte a tu empresa y personalizalo
                </div>
                <div class="q-my-lg line-grey full-width"></div>

                <div class="row q-col-gutter-md justify-center">
                  <div @click="themeId=t.id;" class="col-xs-12 col-sm-12 col-md-6 col-lg-5 q-mb-md cursor-pointer" v-for="(t,index) in themes_option" :key="index">
                    <div class="line-grey">
                      <q-img :ratio="1" :src="t.mainImage.path" />
                    </div>
                    <div class="q-pa-md" :class="[themeId == t.id ? 'bg-secondary text-light' : 'bg-light text-secondary']">
                       Diseño #{{index+1}} - {{t.name}}
                    </div>
                  </div>
                </div>

                <div class="q-my-lg line-grey full-width"></div>

                <div class="text-h5 text-primary q-mb-xs font-family-secondary">Personaliza tu sitio web</div>
                <div class="text-subtitle1 text-secondary q-mb-lg">
                  Elige los colores de acuerdo a la imagen corporativa de tu empresa
                </div>

                <div class="row q-col-gutter-sm items-center  q-mb-md">
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <p class="caption q-mb-none">Primario</p>
                  </div>
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <q-input filled
                      v-model="options.theme_config.color_primary"
                      :style="{ 'background-color': options.theme_config.color_primary }"
                    >
                      <template v-slot:append>
                        <q-icon name="colorize" class="cursor-pointer">
                          <q-popup-proxy transition-show="scale" transition-hide="scale">
                            <q-color v-model="options.theme_config.color_primary" />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>

                  </div>
                </div>
                <div class="row q-col-gutter-sm items-center  q-mb-md">
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <p class="caption q-mb-none">Secondario</p>
                  </div>
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <q-input filled
                      v-model="options.theme_config.color_secondary"
                      :style="{ 'background-color': options.theme_config.color_secondary }"
                    >
                      <template v-slot:append>
                        <q-icon name="colorize" class="cursor-pointer">
                          <q-popup-proxy transition-show="scale" transition-hide="scale">
                            <q-color v-model="options.theme_config.color_secondary" />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="row q-col-gutter-sm items-center q-mb-lg">
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <p class="caption q-mb-none">Fondo</p>
                  </div>
                  <div class="col-xs-6 col-sm-5 col-md-3">
                    <q-input filled
                      v-model="options.theme_config.background"
                      :style="{ 'background-color': options.theme_config.background }"
                    >
                      <template v-slot:append>
                        <q-icon name="colorize" class="cursor-pointer">
                          <q-popup-proxy transition-show="scale" transition-hide="scale">
                            <q-color v-model="options.theme_config.background" />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>

              </q-card-section>
            </q-card>

          </div>
          <!-- DISENO -->

          <div class="col-12 text-right">
            <div class="q-mt-lg">
              <q-btn class="bg-primary text-white btn-arrow-send-pink" @click="updateStore()" v-if="storeId!=null">Actualizar</q-btn>
            </div>
          </div>

        </div>
      </div>
      <!--Loading-->
      <inner-loading :visible="loading"/>
  </q-page>
</template>
<script>

export default {
  name: 'PageTienda',
  components: {},
  data() {
    return {
      loading:true,
      storeId:false,
      store:null,
      configName: 'apiRoutes.qmarketplace.store',
      lang: this.$i18n.locale,
      userId: this.$store.state.quserAuth.userId,
      themeId:null,
      options:
      {
        theme_config:{
          color_primary: '#4CAF50',
          color_secondary: '#E91E63',
          background: '#FFFFFF'
        }
      }
      ,
      themes_option: [
        {
          id: 1,
          name: 'Tienda personal',
          mainImage:{
            path:'/statics/img/product.jpg',
            mimeType:'jpg'
          }
        },
        {
          id: 2,
          name: 'Tienda corporativa',
          mainImage:{
            path:'/statics/img/pregunta.jpg',
            mimeType:'jpg'
          }
        }
      ],
    }
  },
  methods: {
    async init(){
      await this.getThemes();//
      if (this.$route.params.id) this.storeId = this.$route.params.id
      if (this.storeId) await this.getData()//Get data if is edit
      this.loading=false;
    },
    //Get data item
    getData() {
      return new Promise((resolve, reject) => {
        const itemId = this.$clone(this.storeId)

        if (itemId) {
          //Params
          let params = {
            refresh: true,
            params: {
              include: 'categories',
              filter: {allTranslations: true}
            }
          }
          //Request
          this.$crud.show(this.configName, itemId, params).then(response => {
            this.options=response.data.options;
            if(response.data.themeId !== undefined)
            this.themeId=response.data.themeId;
            this.options.theme_config.color_primary=response.data.options.theme_config.color_primary;
            this.options.theme_config.color_secondary=response.data.options.theme_config.color_secondary;
            this.options.theme_config.background=response.data.options.theme_config.background;
            resolve(true)//Resolve
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
            reject(false)//Resolve
          })
        } else {
          resolve(true)//Resolve
        }

      })
    },
    getThemes(){
      //Get stores of user
      let params = {
        remember: false,
        params: {
          include: '',
          filter:{
            allTranslations: true,
          }
        }
      };//params
      this.$crud.index("apiRoutes.qmarketplace.theme",params).then(response => {
        this.themes_option=response.data;
      });

    },
    updateStore(){
      var data={
        theme_id:this.themeId,
        options:this.options
      };
      this.$crud.update("apiRoutes.qmarketplace.store", this.storeId,data).then(response => {
        this.$alert.success({message: this.$tr('ui.message.recordUpdated'), pos: 'bottom'})
      }).catch(error => {
        this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
      })
    },
  },
  mounted(){
    this.init();
  }
}
</script>
<style lang="stylus">
</style>
