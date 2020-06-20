<template>
  <q-page class="bg-fondo-q store-page layout-padding">

      <div class="q-container">
        <div class="row">
          <div class="col-12">

            <q-card class="rounded-md q-mb-xl">

              <!--<q-card-actions align="right" no-caps class="q-px-lg q-pt-lg q-pb-none">
                <q-btn class="rounded-sm  font-family-secondary" no-caps color="primary" icon="fas fa-eye" label="Vista previa"/>
              </q-card-actions> -->

              <q-card-section class="q-pa-xl form-general">

                <div class="text-h5 text-primary q-mb-xs font-family-secondary capitalize">Tienda {{company.name}}</div>
                <div class="text-subtitle1 text-secondary">
                  Completa la configuración de tu tienda, ¡es muy fácil!
                </div>
                <div class="q-my-lg line-grey full-width"></div>


                <div class="row q-col-gutter-xl justify-center">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">

                    <div class="q-mb-lg">
                      <p class="caption q-mb-md">Agregar Logo
                        <q-btn round class="no-shadow" size="6px" icon="fas fa-question" >
                          <q-tooltip>
                            Agrega una imagen como logo de la tienda
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <upload-media
                      v-model="company.mediasSingle"
                      entity="Modules\Marketplace\Entities\Store"
                      :entity-id="storeId ? storeId : null"
                      zone='mainimage'
                      />
                    </div>

                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                     <div class="q-mb-lg">
                        <p class="caption q-mb-md">Agregar imágenes para slider
                          <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                            <q-tooltip>
                              Agrega imágenes promociones de tu tienda
                            </q-tooltip>
                          </q-btn>
                        </p>

                        <upload-media
                          multiple
                          v-model="company.mediasMulti"
                          entity="Modules\Marketplace\Entities\Store"
                          :entity-id="storeId ? storeId : null"
                          zone='slider'
                        />

                      </div>
                  </div>
                </div>

                <div class="q-mt-lg q-mb-xl line-grey full-width"></div>

                <div class="row q-col-gutter-xl">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <div class="q-mb-xl">
                      <p class="caption q-mb-sm">Nombre de tu empresa
                        <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                          <q-tooltip>
                            Ingresa el nombre de tu tienda
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input dense v-model="company.name" placeholder="WAFFEE" />
                    </div>
                    <div class="q-mb-xl">
                      <p class="caption q-mb-sm">Slogan
                        <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                          <q-tooltip>
                            Agrega un slogan para tu tienda
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input dense v-model="company.slogan" placeholder="Lorem Ipsum" />
                    </div>

                    <!--Description-->
                    <div class="q-mb-xl">
                      <p class="caption q-mb-sm">Descripción de la empresa
                        <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                          <q-tooltip>
                            Ingresa una breve descripción de tu empresa
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-editor v-model="company.description" class="full-width"
                      :toolbar="editorText.toolbar" content-class="text-grey-9" toolbar-text-color="grey-9"/>
                    </div>
                    <div class="q-mb-xl">
                      <p class="caption q-mb-sm">Dirección de la empresa
                        <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                          <q-tooltip>
                            Ingresa la dirección de tu empresa
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input dense  v-model="company.address" placeholder="Lorem Ipsum">
                        <template v-slot:prepend>
                          <q-icon name="fas fa-map-marker-alt" color="primary"/>
                        </template>
                      </q-input>
                    </div>
                    <div  class="q-mb-xl">
                      <p class="caption q-mb-sm">Url mapa
                        <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                          <q-tooltip>
                            Ingresa la dirección de tu empresa vía google maps
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input dense  v-model="company.options.map" placeholder="google maps"  />
                    </div>
                    <div  class="q-mb-xl">
                      <p class="caption q-mb-sm">Horario de atención
                        <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                          <q-tooltip>
                            Aquí puedes ingresar tu horario de atención al público
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input dense  v-model="company.schedules[0]" placeholder="Lunes - Sabado 7am - 6pm">
                        <template v-slot:prepend>
                          <q-icon name="far fa-clock" color="primary"/>
                        </template>
                      </q-input>
                    </div>
                    <div  class="q-mb-xl">
                      <p class="caption q-mb-sm">Enlace de youtube
                        <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                          <q-tooltip>
                            Aquí puedes ingresar el link de un video promocional
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input dense v-model="company.options.youtube" placeholder="youtube.com"  />
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <div class="q-mb-xl">
                      <p class="caption q-mb-xs">Categoría
                        <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                          <q-tooltip>
                            Selecciona las categorías a las que pertenece tu empresa
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <tree-select
                        :clearable="false"
                        :append-to-body="true"
                        class="q-mb-md"
                        filter="searchText"
                        multiple
                        :options="categoryOptions"
                        value-consists-of="BRANCH_PRIORITY"
                        v-model="company.categories"
                        placeholder=""
                      />
                      <!-- <q-select dense
                      v-model="company.categories"
                      multiple
                      :options="categoryOptions"
                      /> -->

                    </div>

                    <!-- <div class="q-mb-xl">
                      <p class="caption q-mb-sm">Barrio
                        <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                          <q-tooltip>
                            Selecciona el barrio al que pertenece tu empresa
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input dense v-model="company.neighborhood" placeholder="Lorem Ipsum" />
                    </div> -->


                    <div  class="q-mb-xl">
                      <p class="caption q-mb-sm">Provincia
                        <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                          <q-tooltip>
                            Selecciona la provincia a la que pertenece tu empresa
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <tree-select
                        :clearable="false"
                        :append-to-body="true"
                        class="q-mb-md"
                        :options="provincesOptions"
                        value-consists-of="BRANCH_PRIORITY"
                        v-model="company.provinceId"
                        @input="val => { getCities() }"
                        placeholder=""
                      />
                      <!-- <q-select @input="val => { getCities() }" v-model="company.provinceId" :options="provincesOptions" /> -->
                    </div>

                    <div  class="q-mb-xl" v-if="cityOptions.length>0">
                      <p class="caption q-mb-sm">Cuidad
                        <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                          <q-tooltip>
                            Selecciona la ciudad a la que pertenece tu empresa
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <tree-select
                        :clearable="false"
                        :append-to-body="true"
                        class="q-mb-md"
                        :options="cityOptions"
                        value-consists-of="BRANCH_PRIORITY"
                        @input="val => { getNeighborhoods() }"
                        v-model="company.cityId"
                        placeholder=""
                      />
                      <!-- <q-select v-model="company.cityId" :options="cityOptions" /> -->
                    </div>

                    <div v-if="neighborhoodOptions.length>0" class="q-mb-xl">
                      <p class="caption q-mb-sm">Barrio
                        <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                          <q-tooltip>
                            Some text as content of Tooltip
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <tree-select
                        :clearable="false"
                        :append-to-body="true"
                        class="q-mb-md"
                        :options="neighborhoodOptions"
                        value-consists-of="BRANCH_PRIORITY"
                        v-model="company.neighborhoodId"
                        placeholder=""
                      />
                    </div>

                    <div class="q-mb-xl">
                      <p class="caption q-mb-sm">Correo electrónico
                        <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                          <q-tooltip>
                            Ingresa un correo electrónico para el contacto cliente - tienda
                          </q-tooltip>
                        </q-btn>
                      </p>
                      <q-input dense v-model="company.options.email" placeholder="info@lorem.com">
                        <template v-slot:prepend>
                          <q-icon name="fas fa-envelope" color="primary"/>
                        </template>
                      </q-input>
                    </div>
                    <div class="q-mb-lg" label="Galería de la empresa" stack-label>
                        <p class="caption q-mb-md">Galeria de la empresa
                          <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                          <q-tooltip>
                            Ingresa múltiples imágenes promocionales de tu empresa
                          </q-tooltip>
                        </q-btn>
                        </p>

                        <upload-media
                          multiple
                          v-model="company.mediasMulti"
                          entity="Modules\Marketplace\Entities\Store"
                          :entity-id="storeId ? storeId : null"
                          zone='gallery'
                        />

                      </div>

                  </div>
                </div>


              </q-card-section>
            </q-card>

            <q-card class="rounded-md bg-white full-width q-mb-xl">

              <q-card-section class="q-px-xl form-general">

                <div class="q-my-lg">
                  <p class="caption q-mb-lg">Redes sociales de tu tienda
                    <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                      <q-tooltip>
                        Puedes seleccionar las redes sociales disponibles de tu empresa
                      </q-tooltip>
                    </q-btn>
                  </p>

                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-7">
                      <div v-for="(item,index) in company.social" :key="index">
                        <div class="row items-center q-mb-md">
                          <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                            <q-checkbox  v-model="item.active" :label="item.name+':'">
                              <q-icon class="q-mx-md" :color="item.color" :name="item.icon" />
                            </q-checkbox>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                            <q-input dense v-model="item.url" placeholder="@lorem_ipsom" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </q-card-section>
            </q-card>

            <q-card class="rounded-md bg-white full-width q-mb-xl">
              <q-card-section class="q-px-xl q-pb-lg form-general">

                <div class="q-my-lg">
                  <p class="caption q-mb-lg">¿Que metodos de pago aceptas?
                    <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                      <q-tooltip>
                        Puedes seleccionar los métodos de pago disponibles en tu empresa
                      </q-tooltip>
                    </q-btn>
                  </p>
                  <div v-for="(item,index) in payment_methods" :key="index">
                    <div class="row items-center q-py-sm border-bottom-gray">
                      <div class="col">
                        <q-checkbox v-model="company.paymentMethods" :val="item.id">
                          <span class="q-px-sm">{{item.title}}</span>
                        </q-checkbox>
                      </div>
                      <div class="col-auto">
                        <q-icon color="grey-6" name="fas fa-edit" size="sm" />
                      </div>
                    </div>
                  </div>

                </div>
              </q-card-section>
            </q-card>

            <q-card class="rounded-md bg-white full-width q-mb-lg">
              <q-card-section class="q-px-xl q-pb-lg form-general">

                <div class="q-my-lg">

                  <p class="caption q-mb-lg">¿Cuales son los medotos de envío?
                    <q-btn round class="no-shadow" size="6px" icon="fas fa-question">
                      <q-tooltip>
                        Puedes seleccionar los métodos de envío disponibles en tu empresa
                      </q-tooltip>
                    </q-btn>
                  </p>

                  <div v-for="(item,index) in shipping_methods" :key="index">
                    <div class="row items-center q-py-sm border-bottom-gray">
                      <div class="col">
                        <q-checkbox v-model="company.shippingMethods" :val="item.id">
                          <span class="q-px-sm">{{item.title}}</span>
                        </q-checkbox>
                      </div>
                      <div class="col-auto">
                        <q-icon color="grey-6" name="fas fa-edit" size="sm"/>
                      </div>
                    </div>
                  </div>

                </div>
              </q-card-section>
            </q-card>

          </div>

          <div class="col-12 text-right">
              <div class="q-mt-lg">
                <q-btn class="bg-primary text-white btn-arrow-send-pink" @click="updateStore()" v-if="storeId!=null && storeId!=false">Actualizar</q-btn>
                <q-btn class="bg-primary text-white btn-arrow-send-pink" @click="createStore()" v-else>Crear</q-btn>
              </div>
          </div>

        </div>
      </div>
      <!--Loading-->
      <inner-loading :visible="loading"/>
  </q-page>
</template>
<script>
import uploadMedia from 'src/components/qmedia/form'


export default {
  name: 'PageTienda',
  components: {
    uploadMedia,
  },
  data() {
    return {
      loading:true,
      stores:[],
      storesOptions:[],
      storeId:false,
      configName: 'apiRoutes.qmarketplace.store',
      lang: this.$i18n.locale,
      userId: this.$store.state.quserAuth.userId,
      company: {
        name:'',
        slogan: '',
        description: '',
        user_id: this.$store.state.quserAuth.userId,
        address: '',
        schedules: [
          ""
        ],
        city: '',
        themeId: null,
        cityId: 0,
        provinceId: 0,
        neighborhoodId: 0,
        categories:[],
        paymentMethods:[],
        shippingMethods:[],
        logo: {
          path:'/statics/img/fondo.jpg',
          mimeType:''
        },
        category: '',
        mediasSingle: {},
        mediasMulti: {},
        slider: [
          {
            path:'/statics/img/fondo.jpg',
            mimeType:''
          },{
            path:'/statics/img/fondo.jpg',
            mimeType:''
          }
        ],
        gallery: [
          {
            path:'/statics/img/fondo.jpg',
            mimeType:''
          },{
            path:'/statics/img/fondo.jpg',
            mimeType:''
          }
        ],
        options:{
          youtube: '',
          email: '',
          map: '',
          theme_config:{
            color_primary:"#4CAF50",
            color_secondary:"#E91E63",
            background:"#FFFFFF",
          },
        },
        social: [
          {
            icon: 'fab fa-twitter',
            name: 'Twitter',
            color: 'blue-4',
            url: '',
            active: false
          },
          {
            icon: 'fab fa-facebook',
            name: 'Facebook',
            color: 'indigo',
            url: '',
            active: false
          },
          {
            icon: 'fab fa-instagram',
            name: 'Instagram',
            color: 'primary',
            url: '',
            active: false
          }
        ]
      },
      showingPrimary: false,
      showingSecondary: false,
      showingBackground: false,
      searchModel: '',
      sectorOptions: [],
      neighborhoodOptions: [],
      cityOptions: [],
      provincesOptions: [],
      categoryOptions: [],
      statusOptions: [
        {
          label: 'Habilitado',
          value: '1', id: '1'
        },
        {
          label: 'Inhabilitado',
          value: '2', id: '2'
        }
      ],
      theme: {
        id: null,
        image: '/statics/img/product.jpg',
        primary: '#4CAF50',
        secondary: '#E91E63',
        background: '#FFFFFF'
      },
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
      payment_methods:[],
      shipping_methods:[],
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
      }
    }
  },
  methods: {
    async init(){
      await this.getStoreCategories();//
      await this.getProvinces();//
      await this.getThemes();//
      await this.getPaymentMethods();//
      await this.getShippingMethods();//
      await this.getSuscription();
      if (this.$route.params.id) this.storeId = this.$route.params.id
      if (this.storeId) await this.getData()//Get data if is edit
      this.loading=false;
    },
    validateRequiredData(){
      if(this.company.name==""){
        this.$alert.error({message: "Debe ingresar el nombre de la tienda", pos: 'bottom'});
        return false;
      }else if(this.company.slogan==""){
        this.$alert.error({message: "Debe ingresar el slogan de su tienda", pos: 'bottom'});
        return false;
      }else if(this.company.categories.length==0){
        this.$alert.error({message: "Debe seleccionar al menos una categoría", pos: 'bottom'});
        return false;
      }else if(this.company.provinceId==0){
        this.$alert.error({message: "Debe seleccionar una provincia", pos: 'bottom'});
        return false;
      }else if(this.company.cityId==0){
        this.$alert.error({message: "Debe seleccionar una ciudad", pos: 'bottom'});
        return false;
      }else if(this.company.neighborhoodId==0){
        this.$alert.error({message: "Debe seleccionar un barrio", pos: 'bottom'});
        return false;
      }else if(this.company.description==""){
        this.$alert.error({message: "Debe ingresar una descripción de su tienda", pos: 'bottom'});
        return false;
      }else if(this.company.address==""){
        this.$alert.error({message: "Debe ingresar la dirección de su tienda", pos: 'bottom'});
        return false;
      }else if(this.company.schedules[0]==""){
        this.$alert.error({message: "Debe ingresar su horario de atención", pos: 'bottom'});
        return false;
      // }else if(this.company.mediasSingle.isEmpty()){
      //   this.$alert.error({message: "Debe cargar el logo de su tienda", pos: 'bottom'});
      //   return false;
      // }else if(this.company.mediasMulti.isEmpty()){
      //   this.$alert.error({message: "Debe cargar al menos una imagén en su galería o slider", pos: 'bottom'});
      //   return false;
      }else if(this.company.paymentMethods.length==0){
        this.$alert.error({message: "Debe seleccionar al menos un método de pago", pos: 'bottom'});
        return false;
      }else if(this.company.shippingMethods.length==0){
        this.$alert.error({message: "Debe seleccionar al menos un método de envío", pos: 'bottom'});
        return false;
      }else
      return true;
    },
    getSuscription(){
      let params={
        params:{
          include:'plan.product',
          filter:{
            userId:this.$store.state.quserAuth.userId,
            status:1
          }
        }
      };
      this.$crud.index("apiRoutes.qsubscription.subscriptions",params).then(response => {
        if(response.data.length>0){
          if(response.data[0].plan.id==6){
            //Null theme to get default about theme in front.
            this.company.type=3;//Free
          }else if(response.data[0].plan.id==3){
            this.company.type=2;//Directory pay
            this.company.themeId=3;
          }else if(response.data[0].plan.product.id==6){
            this.company.type=1;//Independent
            this.company.themeId=3;
          }else{
            this.company.themeId=1;
          }
        }else{
          //If not have suscription - redirect to
          this.$alert.error({message: "Debes suscribirte a un plan", pos: 'bottom'})
          this.$router.push({name:'products.show',params:{slug:'tiendas-en-linea'}});
          // this.company.themeId=1;
        }
      });
    },
    getPaymentMethods(){
      //Get
      this.$crud.index("apiRoutes.qcommerce.paymentMethods").then(response => {
        for(var i=0;i<response.data.length;i++){
          this.payment_methods.push({id:response.data[i].id,name:response.data[i].name,title:response.data[i].title});
        }
      })
    },
    getShippingMethods(){
      //Get
      this.$crud.index("apiRoutes.qcommerce.shippingMethods").then(response => {
        for(var i=0;i<response.data.length;i++){
          this.shipping_methods.push({id:response.data[i].id,name:response.data[i].name,title:response.data[i].title});
        }
      })
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
              include: 'categories,paymentMethods,shippingMethods',
              filter: {allTranslations: true}
            }
          }
          //Request
          this.$crud.show(this.configName, itemId, params).then(response => {
            var paymentMethods=[];
            for(var i=0;i<response.data.paymentMethods.length;i++){
              paymentMethods.push(response.data.paymentMethods[i].id);
            }//for
            var shippingMethods=[];
            for(var i=0;i<response.data.shippingMethods.length;i++){
              shippingMethods.push(response.data.shippingMethods[i].id);
            }//for
            var categories=[];
            for(var i=0;i<response.data.categories.length;i++){
              categories.push(response.data.categories[i].id);
            }//for
            this.company = this.$clone(response.data);
            this.company.name=this.company[this.lang].name;
            this.company.slug=this.company[this.lang].slug;
            this.company.description=this.company[this.lang].description;
            this.company.slogan=this.company[this.lang].slogan;
            this.company.paymentMethods=paymentMethods;
            this.company.shippingMethods=shippingMethods;
            this.company.categories=categories;
            this.getCities()
            this.getNeighborhoods()
            resolve(true)//Resolve
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
            reject(false)//Resolve
          })
        } else {
          resolve(true)//Resolve
        }

      });
    },
    slugable: function(title) {
      var slug = "";
      // Change to lower case
      var titleLower = title.toLowerCase();
      // Letter "e"
      slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
      // Letter "a"
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
      // Letter "o"
      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
      // Letter "u"
      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
      // Letter "d"
      slug = slug.replace(/đ/gi, 'd');
      // Trim the last whitespace
      slug = slug.replace(/\s*$/g, '');
      // Change whitespace to "-"
      slug = slug.replace(/\s+/g, '-');

      return slug;
    },
    getStoreCategories(){
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
      this.$crud.index("apiRoutes.qmarketplace.category",params).then(response => {
        // this.categoryOptions=response.data;//
        this.categoryOptions=this.$array.tree(response.data);//
      });

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
        this.themes_option=this.$array.tree(response.data);//
      });

    },

    clearForm(){
      //Clear data of form create store
      this.company.name="";
      this.company.slogan="";
      this.company.description="";
      this.company.address="";
      this.company.schedules[0]="";
      this.company.options.map="";
      this.company.options.youtube="";
      this.company.categories=[];
      this.company.city="";
      this.company.cityId=0;
      this.company.provinceId=0;
      this.company.neighborhoodId=0;
      this.company.options.email="";
      this.company.mediasSingle={};
      this.company.mediasMulti={};
      this.theme.id=null;
      this.theme.primary='#4CAF50';
      this.theme.secondary='#E91E63';
      this.theme.background='#FFFFFF';

      for(var i=0;i<this.company.social.length;i++){
        this.company.social[i].active=false;
        this.company.social[i].url=null;
      }

    },
    createStore(){
      if(this.validateRequiredData()){
        this.company[this.lang]={
          name:this.company.name,
          slogan:this.company.slogan,
          description:this.company.description,
          slug:this.slugable(this.company.name)
        };
        this.company.user_id=this.userId;

        this.$crud.create("apiRoutes.qmarketplace.store", this.company).then(response => {
          this.$alert.success({message: this.$tr('ui.message.recordCreated'), pos: 'bottom'})
          this.$router.push({
            name: 'qmarketplace.admin.theme.store.index',
            params:{
              id:response.data.id
            }
          })
        }).catch(error => {
          this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
        });
      }
    },
    updateStore(){
      if(this.validateRequiredData()){
        this.company[this.lang]={
          name:this.company.name,
          slogan:this.company.slogan,
          description:this.company.description,
          slug:this.slugable(this.company.name)
        };
        var data=this.company;
        this.$crud.update("apiRoutes.qmarketplace.store", this.storeId,data).then(response => {
          this.$alert.success({message: this.$tr('ui.message.recordUpdated'), pos: 'bottom'})
          this.$router.push({
            name: 'qmarketplace.admin.stores.my.store'
          });
        }).catch(error => {
          this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
        });
      }
    },
    getProvinces(){
      // cityOptions
      // sectorOptions
      let params = {
        remember: false,
        params: {
          include: '',
          filter:{
            allTranslations: true,
            country:48
          }
        }
      };//params
      this.$crud.index("apiRoutes.ilocations.provinces",params).then(response => {
        this.provincesOptions=[];
        this.provincesOptions.push({label:"Selecciona una provincia",value:0,id:0});
        for(var i=0;i<response.data.length;i++){
          this.provincesOptions.push({label:response.data[i].name,value:response.data[i].id,id:response.data[i].id});
        }
      });
    },
    getCities(){
      if(this.company.provinceId){
        let params = {
          remember: false,
          params: {
            include: '',
            filter:{
              allTranslations: true,
              province_id:this.company.provinceId
            }
          }
        };//params
        this.$crud.index("apiRoutes.ilocations.cities",params).then(response => {
          this.cityOptions=[];
          this.cityOptions.push({label:"Selecciona una ciudad",value:0,id:0});
          this.company.cityId=0;
          this.company.neighborhoodId=0;
          for(var i=0;i<response.data.length;i++){
            this.cityOptions.push({label:response.data[i].name,value:response.data[i].id,id:response.data[i].id});
          }
        });
      }
    },
    getNeighborhoods(){
      if(this.company.cityId){
        let params = {
          remember: false,
          params: {
            include: '',
            filter:{
              allTranslations: true,
              city:this.company.cityId
            }
          }
        };//params
        this.$crud.index("apiRoutes.ilocations.neighborhoods",params).then(response => {
          this.neighborhoodOptions=[];
          this.neighborhoodOptions.push({label:"Selecciona un barrio",value:0,id:0});
          this.company.neighborhoodId=0;
          for(var i=0;i<response.data.length;i++){
            this.neighborhoodOptions.push({label:response.data[i].name,value:response.data[i].id,id:response.data[i].id});
          }
        });
      }
    }


  },
  mounted(){
    this.init();
  }
}
</script>
<style lang="stylus">
.store-page
  .border-bottom-gray
    border-bottom 1px solid #E1E1E1
  .btn-arrow-send-pink:after
    right 92px
</style>
