<template>
   <div>
      <div v-if="storeData.themeId==1" class="headerStore theme-layout-01">
         <header1/>
      </div>
      <div v-else-if="storeData.themeId==2" class="headerStore theme-layout-02">
         <header2/>
      </div>
      <div v-else-if="storeData.themeId==3" class="headerStore theme-layout-03">
         <header3/>
      </div>
      <div v-else-if="storeData.themeId==4" class="headerStore theme-layout-04">
         <header4/>
      </div>
      <div v-else-if="storeData.themeId==5" class="headerStore theme-layout-05">
         <header5/>
      </div>
   </div>
</template>

<script>
   import header1 from '@imagina/qmarketplace/_components/themes/01/top'
   import header2 from '@imagina/qmarketplace/_components/themes/02/top'
   import header3 from '@imagina/qmarketplace/_components/themes/03/top'
   import header4 from '@imagina/qmarketplace/_components/themes/04/top'
   import header5 from '@imagina/qmarketplace/_components/themes/05/top'
   import register from '@imagina/qmarketplace/_components/themes/register'
   import {colors, AddressbarColor} from 'quasar'

   export default {
      name: 'header-store',
      components: {
         header1,
         header2,
         header3,
         header4,
         header5,
         register
      },
      data() {
         return {}
      },
      mounted() {
         this.$nextTick(async function () {
            await this.getData()
         });
      },
      computed: {
         storeData() {
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         }
      },
      methods: {
         getData() {
            colors.setBrand('storeprimary', this.storeData.options.theme_config.color_primary)
            colors.setBrand('storesecondary', this.storeData.options.theme_config.color_secondary)
            colors.setBrand('storebackground', this.storeData.options.theme_config.background)
         },
      }
   }
</script>
<style lang="stylus">
   .headerStore
      background $primaryStore
      .menuStore
         .q-btn-dropdown
            .q-btn__wrapper:before
               border: none !important
               box-shadow: none !important
               transition: none
</style>
