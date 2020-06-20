<template>
   <q-page v-if="store">
      <header-store></header-store>
      <main-store></main-store>
      <footer-store></footer-store>
   </q-page>
</template>
<script>
   import headerStore from '@imagina/qmarketplace/_components/themes/header'
   import footerStore from '@imagina/qmarketplace/_components/themes/footer'
   import mainStore from '@imagina/qmarketplace/_components/themes/main'
   import {colors, AddressbarColor} from 'quasar'

   export default {
      name: 'showStore',

      preFetch({store, currentRoute, previousRoute, redirect, ssrContext}) {
         return new Promise(async resolve => {
            //Get data post
            let storeSlug = currentRoute.params.slug|| false
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

      components: {
         footerStore,
         mainStore,
         headerStore,
      },
      data() {
         return {
            loading: true,
            configName: 'apiRoutes.qmarketplace.store',
            storeSlug: this.$route.params.slug,
            store: null,
            cart:null
         }
      },
      mounted() {
         this.$nextTick(async function () {
            await this.getData()
         });
      },
      methods: {
         getData() {
            return new Promise((resolve, reject) => {
               const itemId = this.$clone(this.storeSlug)
               if (itemId) {
                  //Params--
                  let params = {
                     refresh: true,
                     params: {
                       include:'products,paymentMethods,shippingMethods',
                        filter: {
                           allTranslations: true,
                           field: 'slug',
                        },
                     }
                  }//test
                  //Request
                  this.$crud.show(this.configName, itemId, params).then(response => {
                     this.store = this.$clone(response.data);
                     colors.setBrand('storeprimary', this.store.options.theme_config.color_primary)
                     colors.setBrand('storesecondary', this.store.options.theme_config.color_secondary)
                     colors.setBrand('storebackground', this.store.options.theme_config.background)
                     resolve(true)//Resolve
                  }).catch(error => {
                     this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                     reject(false)//Resolve
                  })
               } else {
                  resolve(true)//Resolve
               }

            }).catch(error => {})
         },
      }
   }
</script>
<style lang="stylus">
</style>
