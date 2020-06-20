<template>
   <div v-if="storeData.themeId==1">
      <main1/>
   </div>
   <div v-else-if="storeData.themeId==2">
      <main2/>
   </div>
   <div v-else-if="storeData.themeId==3">
      <main3/>
   </div>
   <div v-else-if="storeData.themeId==4">
      <main4/>
   </div>
   <div v-else-if="storeData.themeId==5">
      <main5/>
   </div>
   <div v-else>
     <defaultTheme/>
   </div>
</template>

<script>
   import main1 from '@imagina/qmarketplace/_components/themes/01/block'
   import main2 from '@imagina/qmarketplace/_components/themes/02/block'
   import main3 from '@imagina/qmarketplace/_components/themes/03/block'
   import main4 from '@imagina/qmarketplace/_components/themes/04/block'
   import main5 from '@imagina/qmarketplace/_components/themes/05/block'
   import defaultTheme from '@imagina/qmarketplace/_components/themes/default/block'

   export default {
      name: 'mainStore',
      components: {
         main1,
         main2,
         main3,
         main4,
         main5,
         defaultTheme
      },
      mounted() {
        /*
        console.warn('ain', this.storeData)
        */
      },
      computed:{
         storeData(){
            let storeSlug = this.$route.params.slug
            return this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
         }
      },
   }
</script>
<style lang="stylus">
</style>
