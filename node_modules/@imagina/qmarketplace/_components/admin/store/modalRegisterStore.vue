<template>
   <div>
      <q-card class="card-store" style="min-width: 320px">

         <q-video
                 :ratio="16/9"
                 src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
         />
      </q-card>
   </div>
</template>
<script>
   export default {
      name: 'modal-register-store',
      watch: {},
      components: {
      },
      mounted(){
      },
      data() {
         return {  }
      },
      methods: {
      }
   }
</script>

<style lang="stylus">
   #card-store
      .q-img
         height 150px

      .q-card__section
         margin-top -50px
      .button-footer
         .q-btn
            .q-btn__content
               div
                  font-weight bold
                  color $primary
                  font-size 16px
               .q-icon
                  color $primary
</style>
