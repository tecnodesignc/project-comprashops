<template>
  <div>
    <div v-if="store.themeId==1">
      <footer1 :address="store.address" :schedules="store.schedules"></footer1>
          </div>
    <div v-else-if="store.themeId==2">
      <footer2 :address="store.address" :schedules="store.schedules"></footer2>
    </div>
    <div v-else-if="store.themeId==3">
      <footer3 :address="store.address" :schedules="store.schedules"></footer3>
    </div>
    <div v-else-if="store.themeId==4">
      <footer4 :address="store.address" :schedules="store.schedules"></footer4>
    </div>
    <div v-else-if="store.themeId==5">
      <footer5 :address="store.address" :schedules="store.schedules"></footer5>
    </div>
  </div>
</template>

<script>
  import footer1 from '@imagina/qmarketplace/_components/themes/01/contact'
  import footer2 from '@imagina/qmarketplace/_components/themes/02/contact'
  import footer3 from '@imagina/qmarketplace/_components/themes/03/contact'
  import footer4 from '@imagina/qmarketplace/_components/themes/04/contact'
  import footer5 from '@imagina/qmarketplace/_components/themes/05/contact'
    export default {
      name: 'footerStore',
      components: {
        footer1,
        footer2,
        footer3,
        footer4,
        footer5
      },
        data() {
            return {
                store: []
            }
        },
        created() {
          this.getTheme()
        },
        methods:{
            getTheme(){
              let storeSlug = this.$route.params.slug
              let store = this.$store.state.qcrudMaster.show[`qmarketplace-store-${storeSlug}`].data
              if (store) {
                this.store = store
              }
            },
        }
    }
</script>
<style lang="stylus">
</style>
