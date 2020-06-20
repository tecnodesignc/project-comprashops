<template>
   <q-page class="page">
      <header-store></header-store>
      <div class="bg-fondo q-px-sm q-py-xl" v-if="!products.length">
         <div class="q-container">
            <div class="q-inline-block q-mb-lg">
               <h4 class="title text-secondary font-family-secondary q-mt-none">
                  <div class="line-secondary q-mb-sm"></div>
                  Carro de Compras
                  <div class="line-secondary q-mt-sm"></div>
               </h4>
            </div>
            <q-banner inline-actions rounded class="bg-orange text-white">
               No hay productos en el carro
               <template v-slot:action>
                  <q-btn @click="$router.push({name: 'stores.show', params : {slug:storeData.slug}})" flat
                         label="Seguir Comprando"/>
               </template>
            </q-banner>
         </div>

      </div>
      <div v-else class="bg-fondo q-px-sm q-py-xl">
         <div class="q-container">
            <div class="row q-col-gutter-lg">
               <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">
                  <div class="row">
                     <div class="col">
                        <h5 class="q-ma-md text-secondary font-family-secondary">
                           <i class="fas fa-shopping-basket text-primary"></i>
                           {{$tr('qsubscription.layout.form.checkout.products')}}
                        </h5>
                        <q-card class="rounded-sm bg-white q-pa-md" v-if="products.length">

                           <q-card-section>
                              <!-- PRODUCT ROW -->
                              <div class="row q-col-gutter-sm q-pb-sm" v-for="product in products">
                                 <div class="col-xs-5 col-sm-2 col-md-2">
                                    <div style="border: 2px solid #ccc;">
                                       <q-img :ratio="1" contain :src="product.mainImage.path"/>
                                    </div>
                                 </div>
                                 <div class="col-xs-7 col-sm-6 col-md-6">
                                    <h6 class="text-primary font-family-secondary q-mt-sm q-mb-none">
                                       {{product.name}}</h6>
                                    <div class="q-body-1 text-secondary q-mb-lg">{{product.summary}}</div>
                                    <div class="q-subheading text-secondary text-weight-bold q-mb-lg">$
                                       {{product.priceUnit}}
                                    </div>
                                 </div>
                                 <div class="col-xs-11 col-sm-3 col-lg-3 self-center">
                                    <div class="row items-center">
                                       <div class="col-6 text-right q-pr-sm">
                                          <div class="q-body-1 text-secondary">
                                             {{$tr('qsubscription.layout.form.types.quantity')}}
                                          </div>
                                       </div>
                                       <div class="col-6">
                                          <q-select outlined dense emit-value
                                                    @input="val => { updateCart(product) }"
                                                    v-model="product.quantity"
                                                    align="right"
                                                    :options="selectOptions"
                                          />
                                       </div>
                                    </div>
                                 </div>
                                 <div class="col-xs-1 col-sm-1 col-md-1 self-center">
                                    <q-btn @click="deleteProductCart(product)" round color="primary"
                                           icon="fas fa-times"/>
                                 </div>

                              </div>

                           </q-card-section>
                           <!--Loading-->
                        </q-card>
                     </div>

                  </div>
                  <!--Coupons validate-->
                  <div class="row">
                     <div class="col-12">
                        <h5 class="q-ma-md text-secondary font-family-secondary"><i
                                class="fas fa-truck text-primary"></i>
                           {{$tr('qmarketplace.layout.form.checkout.coupons')}}
                        </h5>
                        <q-card class="rounded-sm bg-white q-mb-xl">

                           <q-card-section class="q-pa-xl form-general">

                              <div class="row q-col-gutter-lg justify-center">

                                 <div class="col-xs-12">
                                    <div class="q-mb-md">
                                       <p class="caption q-mb-sm">Valiar Cupón de descuento</p>
                                       <div class="row">
                                          <div class="col-xs-6 col-sm-9 q-pa-md">
                                             <q-input dense
                                                      class="full-width"
                                                      v-model="form.coupon_code"
                                             />
                                          </div>
                                          <div class="col-xs-6 col-sm-3 q-pa-md">
                                             <q-btn
                                                     @click="validateCoupon"
                                                     size="md"
                                                     class=" text-weight-bold rounded-sm q-mb-md" color="primary"
                                                     label="Validar cupon"/>
                                          </div>
                                          <div class="col-xs-12" v-if="couponMessage"><span v-bind:class="couponMessage.status?'text-positive':'text-negative'">{{couponMessage.message}}</span></div>
                                       </div>

                                    </div>
                                 </div>

                              </div>
                           </q-card-section>

                        </q-card>
                     </div>
                  </div>
                  <!--metodos de envio-->
                  <div class="row">
                     <div class="col-12">
                        <h5 class="q-ma-md text-secondary font-family-secondary"><i
                                class="fas fa-truck text-primary"></i>
                           {{$tr('qsubscription.layout.form.checkout.shippingInformation')}}
                        </h5>
                        <q-card class="rounded-sm bg-white q-mb-xl">

                           <q-card-section class="q-pa-xl form-general">

                              <div class="row q-col-gutter-lg justify-center">

                                 <div class="col-xs-12">
                                    <div class="q-mb-md">
                                       <p class="caption q-mb-sm">Dirección</p>
                                       <div class="row" v-if="addresses.length">
                                          <div class="col-xs-6 col-sm-9 q-pa-md">
                                             <q-select dense
                                                       class="full-width"
                                                       v-model="form.addressShippingId"
                                                       :options="addresses"
                                             />
                                          </div>
                                          <div class="col-xs-6 col-sm-3 q-pa-md">
                                             <q-btn
                                                     @click="modalAddress= !modalAddress"
                                                     size="md"
                                                     class=" text-weight-bold rounded-sm q-mb-md" color="primary"
                                                     label="Nueva Direccion"/>
                                          </div>

                                       </div>

                                       <div class="row" v-else>
                                          <q-btn
                                                  @click="modalAddress= !modalAddress"
                                                  size="md"
                                                  class=" text-weight-bold rounded-sm q-mb-md" color="primary"
                                                  label="Nueva Direccion"/>
                                       </div>
                                       <q-dialog v-model="modalAddress" persistent>
                                          <q-card style="min-width: 350px">
                                             <q-card-section>
                                                <div class="text-h6 text-primary text-weight-bold">Nueva Direccion</div>
                                             </q-card-section>
                                             <q-form autocorrect="off" autocomplete="off" ref="formContent" class="box"
                                                     @submit="addAddress()"
                                                     @validation-error="$alert.error($tr('ui.message.formInvalid'))">
                                                <q-card-section class="row">

                                                   <div class="col-xs-12 col-sm-6 q-px-sm">

                                                      <div class="q-mb-sm">
                                                         <p class="caption q-mb-sm">{{$tr('ui.form.name')}}</p>
                                                         <q-input dense v-model="form.firstName"
                                                                  :placeholder="$tr('ui.form.name')"
                                                                  :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                         />
                                                      </div>
                                                      <div class="q-mb-sm">
                                                         <p class="caption q-mb-sm">{{$tr('ui.form.phone')}}</p>
                                                         <q-input dense type="text" v-model="form.telephone"
                                                                  mask="(###) ### - ####"
                                                                  placeholder="000 000 0000"
                                                                  :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                         />
                                                      </div>
                                                      <div class="q-mb-sm">
                                                         <p class="caption q-mb-sm">Provincia</p>
                                                         <q-select dense
                                                                   @input="val => { getCities() }"
                                                                   v-model="province_id"
                                                                   :options="optionsProvinces"
                                                                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                         />
                                                      </div>

                                                      <div class="q-mb-sm">
                                                         <p class="caption q-mb-none">{{$tr('ui.form.address')}}</p>
                                                         <q-input dense type="text" v-model="form.paymentAddress1"
                                                                  placeholder="(Para la entrega de productos adquiridos)"
                                                                  :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                         />
                                                      </div>

                                                   </div>
                                                   <div class="col-xs-12 col-sm-6 q-px-sm">
                                                      <div class="q-mb-sm">
                                                         <p class="caption q-mb-sm">{{$tr('ui.form.lastName')}}</p>
                                                         <q-input dense type="text" v-model="form.lastName"
                                                                  placeholder="Gonzalez"
                                                                  :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                         />
                                                      </div>

                                                      <div class="q-mb-sm">
                                                         <p class="caption q-mb-sm">{{$tr('ui.form.email')}}</p>
                                                         <q-input dense type="email" v-model="form.email"
                                                                  placeholder="info@lorem.com"
                                                                  :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                         />
                                                      </div>

                                                      <div class="q-mb-sm">
                                                         <p class="caption q-mb-sm">
                                                            {{$tr('qsubscription.layout.form.checkout.cityResidence')}}</p>
                                                         <q-select dense
                                                                   v-model="city_id"
                                                                   :options="optionsCities"
                                                                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                                                         />
                                                      </div>

                                                   </div>


                                                </q-card-section>

                                                <q-card-actions align="right" class="text-primary">
                                                   <q-btn flat type="reset" label="Cancel" v-close-popup></q-btn>
                                                   <q-btn flat type="submit" label="Agregar Direccion"
                                                          :loading="loading"></q-btn>
                                                </q-card-actions>
                                             </q-form>
                                          </q-card>
                                       </q-dialog>

                                    </div>
                                 </div>

                                 <q-radio v-model="form.shippingMethodId"
                                          v-for="(shipMethod,index) in storeData.shippingMethods"
                                          :key="'shipMethod'+shipMethod.id" :val="shipMethod.id"
                                          @input="val => { updateShippingCost(shipMethod) }"
                                          :label="shipMethod.title"/>

                              </div>
                           </q-card-section>

                        </q-card>
                     </div>
                  </div>
                  <!--metodos de pago-->
                  <div class="row">
                     <div class="col">
                        <h5 class="q-ma-md text-secondary font-family-secondary">
                           <i class="fas fa-credit-card text-primary"></i>
                           {{$tr('qsubscription.layout.form.checkout.paymentMethods')}}
                        </h5>
                        <q-card class="rounded-sm bg-white q-mb-xl">

                           <q-card-section class="q-pa-xl form-general">

                              <div class="row gutter-md justify-center">
                                 <div class="col-12">

                                    <q-radio v-model="form.paymentMethodId"
                                             v-for="(payMethod,index) in storeData.paymentMethods"
                                             :key="'payMethod'+payMethod.id" :val="payMethod.id"
                                             :label="payMethod.title"/>

                                 </div>
                              </div>

                           </q-card-section>

                        </q-card>
                     </div>
                  </div>


                  <div class="row">
                     <div class="col-12 text-right">
                        <h6 class="text-weight-bold q-my-lg">
                           TOTAL
                           <span v-if="cart" class="text-primary q-pl-md">$ {{total}}</span>
                           <span v-else class="text-primary q-pl-md">$ 0</span>
                        </h6>
                        <q-btn
                                @click="submitOrder"
                                size="lg"
                                class="capitalize text-weight-bold rounded-sm q-mb-md" color="primary"
                                :label="$tr('qsubscription.layout.form.checkout.finalizePurchase')"/>
                     </div>
                  </div>


               </div>
               <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                  <q-card class="rounded-sm bg-white plan">
                     <q-card-section style="color: #333333;">
                        <q-btn size="lg"
                        @click="submitOrder"
                               class="capitalize text-weight-bold full-width rounded-sm q-mb-md" color="primary"
                               :label="$tr('qsubscription.layout.form.checkout.finalizePurchase')"/>
                        <hr class="line-grey">
                        <div class="row">
                           <div class="col-6">
                              <p class="q-subheading q-my-md">Subtotal</p>
                           </div>
                           <div class="col-6 text-right">
                              <p v-if="cart" class="q-subheading q-my-md">$ {{subTotal}}</p>
                              <p v-else class="q-subheading q-my-md">$ 0</p>
                           </div>
                        </div>
                        <hr class="line-grey">
                        <div class="row">
                           <div class="col-6">
                              <p class="q-subheading q-my-md">{{$tr('qsubscription.layout.form.checkout.shipping')}}</p>
                           </div>
                           <div class="col-6 text-right">
                              <p class="q-subheading q-my-md">$ {{shipping}}</p>
                           </div>
                        </div>
                        <hr class="line-grey">
                        <div class="row">
                           <div class="col-6">
                              <p class="q-subheading q-my-md">{{$tr('qsubscription.layout.form.checkout.discount')}}</p>
                           </div>
                           <div class="col-6 text-right">
                              <p class="q-subheading q-my-md">$ {{discont}}</p>
                           </div>
                        </div>
<!--                         <hr class="line-grey">
                        <div class="row">
                           <div class="col-12">
                              <div class="q-subheading q-my-md cursor-pointer"><u>{{$tr('qsubscription.layout.form.checkout.calculateShipping')}}</u>
                              </div>
                           </div>
                        </div> -->
                        <hr class="line-grey">
                        <div class="row">
                           <div class="col-6">
                              <p class="q-subheading text-weight-bold q-my-md">TOTAL</p>
                           </div>
                           <div class="col-6 text-right">
                              <p v-if="cart" class="q-subheading text-weight-bold text-primary q-my-md">$
                                 {{total}}</p>
                              <p v-else class="q-subheading text-weight-bold text-primary q-my-md">$ 0</p>
                           </div>
                        </div>
                     </q-card-section>

                  </q-card>

               </div>
            </div>
         </div>
      </div>
      <footer-store></footer-store>
      <inner-loading :visible="loading"/>
   </q-page>
</template>
<script>
   //Plugins
   import {required} from 'vuelidate/lib/validators'
   //Components
   import mediaForm from '@imagina/qmedia/_components/form'
   import headerStore from '@imagina/qmarketplace/_components/themes/header'
   import footerStore from '@imagina/qmarketplace/_components/themes/footer'
   import mainStore from '@imagina/qmarketplace/_components/themes/main'
   import {colors, AddressbarColor} from 'quasar'

   export default {
      name: 'checkout-store',
      preFetch({store, currentRoute, previousRoute, redirect, ssrContext}) {
         return new Promise(async resolve => {
            //Get data post
            let storeSlug = currentRoute.params.slug || false
            await store.dispatch('qcrudMaster/SHOW', {
               indexName: `qmarketplace-store-${storeSlug}`,
               criteria: storeSlug,
               apiRoute: 'apiRoutes.qmarketplace.store',
               requestParams: {
                  refresh: true,
                  params: {include: 'categories,user,products,paymentMethods,shippingMethods'}
               }
            })
            resolve(true)
         })
      },
      meta() {
         let storeSlug = this.$route.params.slug
         let routetitle = storeSlug || 'productos'
         let siteName = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name')
         let siteDescription = this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-description')
         //Set category data
         let store = this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         if (store) {
            routetitle = store.name
            siteDescription = store.description
         }
         return {
            title: `${routetitle.charAt(0).toUpperCase() + routetitle.slice(1)} | ${siteName}`,
            meta: {
               description: {name: 'description', content: (siteDescription || siteName)},
            },
         }
      },
      props: {},
      components: {
         mediaForm,
         footerStore,
         mainStore,
         headerStore,
      },
      watch: {},
      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$clone(this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data)
         },
         cart() {
            return this.$clone(this.$store.state.qmarketplaceCart.cart)
         },
         products() {
            return this.$clone(this.cart && this.cart.products ? this.cart.products : [])
         },
         subTotal(){
          var subTot=0;
          var prods=this.products;
          for(var i=0;i<prods.length;i++){
            subTot=subTot+prods[i].total;
          }
          return subTot;
         },
         total(){
          var sub=this.subTotal;
          var tot=sub-this.discont;
          tot=tot+parseFloat(this.shipping);
          return tot;
         }

      },
      data() {
         return {
            modalAddress: false,
            loading: false,
            configName: 'apiRoutes.qmarketplace.checkout',
            paymentMethods: [],
            shippingMethods: [],
            cartId: null,
            shipping: 0,
            discont: 0,
            selectOptions: [
               {label: "1", value: 1},
               {label: "2", value: 2},
               {label: "3", value: 3},
               {label: "4", value: 4},
               {label: "5", value: 5},
               {label: "6", value: 6},
               {label: "7", value: 7},
               {label: "8", value: 8},
               {label: "9", value: 9},
               {label: "10", value: 10},
               {label: "11", value: 11},
               {label: "12", value: 12},
            ],
            optionsCities: [],
            shippingOptions: "lorem",
            addresses: [],
            form: {
               firstName: '',
               lastName: '',
               email: '',
               telephone: '',
               paymentAddress1: '',
               paymentZipCode: '1234',
               addressPaymentId: 0,
               addressShippingId: {label: "Selecciona una dirección", value: 0, id: 0},
               paymentCity: {label: "Selecciona una ciudad", value: 0, id: 0},
               paymentCountry: {label: "Selecciona una provincia", value: 0, id: 0},
               paymentMethodId: 0,
               shippingAddress1: '',
               shippingZipCode: '1234',
               shippingCity: {label: "Selecciona una ciudad", value: 0, id: 0},
               shippingCountry: {label: "Selecciona una provincia", value: 0, id: 0},
               shippingMethodId: 0,
               storeId: null,
               customerId: this.$store.state.quserAuth.userId,
               coupon_code: ''
            },
            couponMessage:null,
            name: '',
            lastName: '',
            phone: '',
            email: '',
            city_id: {label: "Selecciona una ciudad", value: 0, id: 0},
            province_id: {label: "Selecciona una provincia", value: 0, id: 0},
            optionsProvinces: [],
            address: '',
            paymentMethod: "",
            paymentMethodIndex: 0,
            quantity: 1,
            locale: {
               fields: {
                  id: '',
                  name: ''
               },
               fieldsTranslatable: {},
               validations: {
                  name: {required}
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
      mounted() {
         this.$nextTick(function () {
            this.init()
         })
      },
      methods: {
         async init() {
            this.loading = true
            this.getProvinces();
            this.getAddresses();
            this.loading = false
         },
         async initCart() {
            this.loading = true
            await this.$store.dispatch('qmarketplaceCart/GET_CART', this.storeData.id);
            this.loading = false
         },
         getAddresses() {
            let params = {
               remember: false,
               params: {
                  include: '',
                  filter: {
                     userId: this.$store.state.quserAuth.userId,
                  }
               }
            };//params
            this.$crud.index("apiRoutes.quser.addresses", params).then(response => {
               this.addresses = [];
               this.addresses.push({label: "Selecciona una dirección", value: 0, id: 0});
               for (var i = 0; i < response.data.length; i++) {
                  this.addresses.push({
                     address1: response.data[i].address1,
                     firstName: response.data[i].firstName,
                     lastName: response.data[i].lastName,
                     label: response.data[i].firstName + ' ' + response.data[i].lastName + ' - ' + response.data[i].address1,
                     value: response.data[i].id,
                     id: response.data[i].id
                  });
               }
            });
         },
         addAddress() {
            var data = {
               userId: this.$store.state.quserAuth.userId,
               firstName: this.form.firstName,
               lastName: this.form.lastName,
               address1: this.form.paymentAddress1,
               countryId: 48,
               country: "Colombia",
               provinceId: this.province_id.value,
               city: this.city_id.label,
               type: "shipping"

            };
            this.$crud.create("apiRoutes.quser.addresses", data).then(response => {
               this.$alert.success({message: this.$tr('ui.message.recordCreated'), pos: 'bottom'});
               this.form.firstName = "";
               this.form.lastName = "";
               this.form.telephone = "";
               this.form.email = "";
               this.form.paymentAddress1 = "";
               this.modalAddress = !this.modalAddress;
               this.getAddresses();
            }).catch(error => {
               this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
            });

         },
         updateShippingCost(shipMethod){
           if(shipMethod.optionsPivot!=undefined){
             if(shipMethod.name=="icommerceflatrate"){
               this.shipping=shipMethod.optionsPivot.cost
             }else{
               this.shipping=0
             }
           }else{
             this.shipping=0
           }
         },
         submitOrder() {
            this.loading = true
            if (this.form.addressShippingId.value == 0) {
               this.$alert.error({message: "Debes seleccionar una dirección", pos: 'bottom'})
            } else if (this.form.shippingMethodId == 0) {
               this.$alert.error({message: "Debes seleccionar un método de envío", pos: 'bottom'})
            } else if (this.form.paymentMethodId == 0) {
               this.$alert.error({message: "Debes seleccionar un método de pago", pos: 'bottom'})
            } else {
               var data = {};
               data = this.$clone(this.form)
               // data=this.form;
               data.paymentCity = this.city_id.value;
               data.shippingCity = data.paymentCity;
               data.paymentCountry = "Bogotá";
               data.shippingCountry = data.paymentCountry;
               data.cartId = this.cart.id;
               data.storeID = this.storeData.id;
               var shippingMethod = "";
               for (var i = 0; i < this.shippingMethods.length; i++) {
                  if (this.shippingMethods[i].id == this.form.shippingMethodId) {
                     shippingMethod = this.shippingMethods[i].name;
                     break;
                  }
               }//for
               data.shippingMethod = shippingMethod;
               data.payment_first_name = data.addressShippingId.firstName;
               data.shipping_first_name = data.addressShippingId.firstName;
               data.payment_last_name = data.addressShippingId.lastName;
               data.shipping_last_name = data.addressShippingId.lastName;
               data.paymentAddress1 = data.addressShippingId.address1;
               data.shippingAddress1 = data.paymentAddress1;
               data.addressShippingId = data.addressShippingId.id;
               data.addressPaymentId = data.addressShippingId;
               // console.log('form submit');
               // console.log(data);
               this.$crud.create("apiRoutes.qcommerce.orders", data).then(response => {
                  let order = response.data
                  this.$alert.success({message: this.$tr('ui.message.recordCreated'), pos: 'bottom'})
                  if (order.paymentData.redirectRoute) {
                    console.log('abre ventana');
                     window.open(order.paymentData.redirectRoute, '_blank')
                  }
                  this.$router.push({name: 'qcommerce.account.order', params: {id: response.data.orderId}})
                  this.loading = false
               }).catch(error => {
                  this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
                  this.loading = false
               })
            }
            this.loading = false
         },
         getProvinces() {
            // cityOptions
            // sectorOptions
            let params = {
               remember: false,
               params: {
                  include: '',
                  filter: {
                     allTranslations: true,
                     country: 48
                  }
               }
            };//params
            this.$crud.index("apiRoutes.ilocations.provinces", params).then(response => {
               this.optionsProvinces = [];
               this.optionsProvinces.push({label: "Selecciona una provincia", value: 0, id: 0});
               for (var i = 0; i < response.data.length; i++) {
                  this.optionsProvinces.push({
                     label: response.data[i].name,
                     value: response.data[i].id,
                     id: response.data[i].id
                  });
               }
            });
         },
         getCities() {
            if (this.province_id) {
               let params = {
                  remember: false,
                  params: {
                     include: '',
                     filter: {
                        allTranslations: true,
                        province_id: this.province_id.value
                     }
                  }
               };//params
               this.$crud.index("apiRoutes.ilocations.cities", params).then(response => {
                  this.optionsCities = [];
                  this.optionsCities.push({label: "Selecciona una ciudad", value: 0, id: 0});
                  for (var i = 0; i < response.data.length; i++) {
                     this.optionsCities.push({
                        label: response.data[i].name,
                        value: response.data[i].id,
                        id: response.data[i].id
                     });
                  }
               });
            }
         },
         getPaymentMethods() {
            this.$crud.index("apiRoutes.qcommerce.paymentMethods", {}).then(response => {
               this.paymentMethods = response.data;
            })
         },
         getShippingMethods() {
            this.$crud.index("apiRoutes.qcommerce.shippingMethods", {}).then(response => {
               this.shippingMethods = response.data;
            })
         },
         updateCart(product) {
            this.loading = true
            product.storeId = this.storeData.id
            this.$store.dispatch('qmarketplaceCart/UPDATE_PRODUCT_INTO_CART', product).then(response => {
               this.$q.dialog({
                  title: 'Producto Actualizado  en el carrito!',
                  color: 'positive',
               }).onOk(() => {
                  this.loading = false
               })
            }).catch(error => {
               this.$alert.error(error)
               this.loading = false
            })
         },
         deleteProductCart(product) {
            this.loading = true
            this.$q.dialog({
               title: `Esta seguro de eliminar  ${product.name} del carrito!`,
               color: 'negative',
               ok: 'Eliminar',
               cancel: 'Cancelar'
            }).onOk(() => {
               this.loading = true
               product.storeId = this.storeData.id
               this.$store.dispatch('qmarketplaceCart/DEL_PRODUCT_FROM_CART', product).then(response => {
                  this.$q.dialog({
                     title: 'Producto eliminado del carrito!',
                     color: 'negative',
                  }).onOk(() => {
                     this.loading = false
                  })
               }).catch(error => {
                  this.$alert.error(error)
                  this.loading = false
               })
            }).onCancel(() => {
               this.loading = false
            })
         },
         validateCoupon() {
            return new Promise((resolve, reject) => {
                   this.loading = true
                   if (this.form.coupon_code) {
                      let criteria = this.form.coupon_code
                      let params = {
                         params: {
                            filter: {
                               validate:true,
                               cart: this.cart.id,
                               store:this.storeData.id
                            }
                         }
                      }
                      this.$crud.show('apiRoutes.qcommerce.coupons', criteria, params).then(response => {
                         this.discont = response.data.discount
                         this.couponMessage=response.data
                         this.loading = false
                         resolve(true)//Resolve
                      }).catch(error => {
                         this.loading = false
                         reject(error)//Resolve
                      })
                   }
                   else {
                      this.loading = false
                      resolve(true)//Resolve
                   }
                }
            );
         }
      }
   }
</script>
<style lang="stylus">
</style>
