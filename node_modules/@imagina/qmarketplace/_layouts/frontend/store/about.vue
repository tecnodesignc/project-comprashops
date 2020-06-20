<template>
   <q-page class="theme-layout-about">
      <header-store></header-store>
      <div v-if="success">
      <div class="q-py-xl">
         <div class="q-container">
            <div class="row q-col-gutter-xl">
               <div class="col-xs-12 col-sm-12 col-md-6 col-lg-7 q-py-xl">

                  <h4 class="title-label bg-store-secondary text-white text-center">
                     <div>Conócenos</div>
                  </h4>

                  <div class="text-subtitle1 text-justify" v-html="store.description">
                  </div>
               </div>
               <div class="col-xs-12 col-sm-12 col-md-6 col-lg-5 q-py-xl">

                  <q-card class="bg-store-secondary text-white rounded-md">
                     <q-card-section>
                        <div class="text-h5 text-center q-my-lg">Contactanos</div>
                        <q-list>
                           <chat color="white" type="1"></chat>
                           <q-item>
                              <q-item-section avatar class="q-mr-md">
                                 <q-icon size="lg" name="fas fa-map-marker-alt"/>
                              </q-item-section>
                              <q-item-section class="q-pb-lg">
                                 <div class="text-subtitle1 text-bold">Email</div>
                                 <div class="text-subtitle1">
                                    <a :href="'mailto:'+store.options.email"
                                       class="text-white">{{store.options.email}}</a>
                                 </div>
                              </q-item-section>
                           </q-item>
                           <q-item>
                              <q-item-section avatar class="q-mr-md">
                                 <q-icon size="lg" name="fas fa-map-marker-alt"/>
                              </q-item-section>
                              <q-item-section class="q-pb-lg">
                                 <div class="text-subtitle1 text-bold">Dirección</div>
                                 <div class="text-subtitle1">
                                    {{store.address}}
                                 </div>
                              </q-item-section>
                           </q-item>
                           <q-item>
                              <q-item-section avatar class="q-mr-md">
                                 <q-icon size="lg" name="far fa-clock"/>
                              </q-item-section>
                              <q-item-section class="q-pb-lg">
                                 <div class="text-subtitle1 text-bold">Horario de atención</div>
                                 <div class="text-subtitle1" v-for="(item, i) in store.schedules" :key="'schedule'+i">
                                    {{item}}
                                 </div>
                              </q-item-section>
                           </q-item>
                        </q-list>
                     </q-card-section>
                  </q-card>

               </div>
            </div>
         </div>
      </div>

      <div class="bg-store-primary">
         <div class="q-container">
            <div class="row q-col-gutter-xl q-py-md">
               <div class="col-xs-12 col-sm-12 col-md-6 col-lg-7 q-pb-lg" v-if="store.options.youtube">

                  <div class="embed-responsive">
                     <iframe class="embed-responsive-item" :src="store.options.youtube"></iframe>
                  </div>


               </div>
               <div class="col-xs-12 col-sm-12 col-md-6 col-lg-5 q-pb-lg">

                  <div class="row justify-center">
                     <div class="col-xs-12 col-sm-10 col-md-8">
                        <q-list class="q-mb-lg">
                           <q-item class="bg-white text-store-primary rounded-sm q-mb-sm">
                              <q-item-section class="q-py-sm q-px-md text-h6">Síguenos en:</q-item-section>
                           </q-item>
                           <div v-for="(item,i) in store.social" :key="'social'+i">
                              <q-item clickable @click.native="openUrl(item.url, '_blank')">
                                 <q-item-section avatar>
                                    <q-icon color="white" :name="item.icon"/>
                                 </q-item-section>
                                 <q-item-section class="q-py-md text-white">{{item.name}}</q-item-section>
                              </q-item>
                              <q-separator class="bg-white"/>
                           </div>
                        </q-list>
                     </div>
                  </div>

               </div>
            </div>
         </div>
      </div>

      <div class="q-py-xl">
         <div class="q-container">
            <div class="row q-col-gutter-xl">
               <div class="col-12 q-py-xl">

                  <q-list padding class="q-mb-md">
                     <q-item>
                        <q-item-section top avatar class="q-mr-md">
                           <q-icon size="xl" color="store-secondary" name="far fa-images"/>
                        </q-item-section>
                        <q-item-section>
                           <q-item-label class="text-h5 text-store-secondary text-bold q-mb-sm">Galeria</q-item-label>
                        </q-item-section>
                     </q-item>
                  </q-list>

                  <q-carousel
                          arrows
                          animated
                          v-model="slide"
                          thumbnails
                          infinite
                          autoplay="3500"
                          :fullscreen.sync="fullscreen"
                          v-if="store.gallery.length"
                  >
                     <q-carousel-slide :img-src="slide.path" v-for="(slide,i) in store.gallery" :key="`gallery-${i}`" :name="`gallery-${i}`">
                     </q-carousel-slide>
                     <template v-slot:control>
                        <q-carousel-control
                                position="bottom-right"
                                :offset="[18, 18]"
                        >
                           <q-btn
                                   push round dense color="white" text-color="primary"
                                   :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                                   @click="fullscreen = !fullscreen"
                           />
                        </q-carousel-control>
                     </template>
                  </q-carousel>

               </div>
            </div>
         </div>
      </div>
      <div class="map-google" v-if="store.options.map">
         <div class="line"></div>
         <div class="q-container">
            <div class="row">
               <div class="col-12">

                  <h3 class="title-label bg-store-secondary text-white">
                     <div>
                        <q-icon color="white" name="fas fa-map-marker-alt"/>
                        ¿Dónde encontrarnos?
                     </div>
                  </h3>

               </div>
            </div>
         </div>
         <iframe
                 width="100%"
                 height="550px"
                 frameborder="0" style="border:0;"
                 :src="store.options.map"
                 allowfullscreen>
         </iframe>
      </div>
      </div>
      <footer-store></footer-store>

   </q-page>
</template>

<script>
   import headerStore from '@imagina/qmarketplace/_components/themes/header'
   import footerStore from '@imagina/qmarketplace/_components/themes/footer'
   import mainStore from '@imagina/qmarketplace/_components/themes/main'
   import {colors, AddressbarColor} from 'quasar'
   import chat from '@imagina/qmarketplace/_components/qchat/chat'

   export default {
      name: "about",
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
                  params: {include: 'categories,user,products'}
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

      components: {
         footerStore,
         mainStore,
         headerStore,
         chat
      },
      data() {
         return {
            loading: true,
            configName: 'apiRoutes.qmarketplace.store',
            storeSlug: this.$route.params.slug,
            store: null,
            cart: null,
            slide: 'gallery-0',
            fullscreen: false,
            success:false
         }
      },
      mounted() {
         this.$nextTick(async function () {
           this.init()
         });
      },
      methods: {
         async init() {
            await this.getData()
         },
         getData() {
            return new Promise((resolve, reject) => {
               const itemId = this.$clone(this.storeSlug)
               if (itemId) {
                  //Params--
                  let params = {
                     refresh: true,
                     params: {
                        filter: {
                           allTranslations: true,
                           field: 'slug',
                        },
                     }
                  }//test
                  //Request
                  this.$crud.show(this.configName, itemId, params).then(response => {
                     this.store = this.$clone(response.data);
                   /* if(this.store.gallery.length) this.slide=this.$clone(this.store.gallery[0].path)
                     console.slide*/
                     colors.setBrand('storeprimary', this.store.options.theme_config.color_primary)
                     colors.setBrand('storesecondary', this.store.options.theme_config.color_secondary)
                     colors.setBrand('storebackground', this.store.options.theme_config.background)
                     this.success=true
                     resolve(true)//Resolve
                  }).catch(error => {
                     this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                     reject(error)//Resolve
                  })
               } else {
                  resolve(true)//Resolve
               }

            })
         },
         openUrl(url,target){
            return window.open(url,target)
         }
      }

   }
</script>
<style lang="stylus">
   .theme-layout-about
      background-color $storeBackground

      .q-container
         padding-left 15px
         padding-right 15px

      .title-label
         padding 10px 30px
         width auto
         font-family $font-primary

      .map-google
         border-bottom 5px solid $storeSecondary
         position relative

         .title-label
            position absolute
            margin 0
            top -30px
            @media screen and (max-width: $breakpoint-md)
               font-size 20px
               padding 5px 20px
               left 20px
               right 20px

         .line
            width 100%
            height 5px
            background-color $storeSecondary

      .embed-responsive
         position relative
         display block
         width 100%
         padding 0
         overflow hidden
         border 10px solid #ffffff

         .embed-responsive-item
            position absolute
            top 0
            bottom 0
            left 0
            width 100%
            height 100%
            border 0

         &:before
            display block
            content ""
            padding-top 56.25%
</style>
