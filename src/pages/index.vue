<template>
  <q-page class="flex flex-center">
    <img style="max-width: 40vw"
         :src="$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path">
    fdgdfg
    <div class="test"></div>
  </q-page>
</template>

<style lang="stylus">

</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
