<template>
<div>

   <q-btn
           color="positive" :loading="loading"
           icon="fas fa-plus" :label="Registrarse" @click="openRegisterModal=!openRegisterModal"
   />
   <q-dialog v-model="openRegisterModal">
      <q-card>
         <q-toolbar>
            <q-avatar icon="far fa-envelope-open" class="text-primary">
            </q-avatar>
            <q-toolbar-title class="text-primary"><span class="text-weight-bold">Aun no estas registrado</span>
            </q-toolbar-title>
            <q-btn flat round dense icon="close" v-close-popup></q-btn>
         </q-toolbar>
         <q-card-section>
            <div class="text-right">
               Registrate con nosotros para obtener los mejores veneficios
            </div>

            <div class="text-right">
               <!--Update button-->
               <q-btn
                       color="positive" :loading="loading"
                       icon="fas fa-plus" :label="Registrarse" @click="register()"
               />
            </div>

            <!--Loading-->
            <inner-loading :visible="loading"/>
         </q-card-section>
      </q-card>
   </q-dialog>
</div>
</template>


<script>


   export default {
      name: 'register-guest',
      props: {},
      components: {},
      watch: {
         productId() {
            this.init()
         }
      },
      data() {
         return {
            loading: false,
            openRegisterModal:false
         }
      },
      mounted() {
         this.$nextTick(() => {
            this.init()
         })
      },
      computed: {
      },
      methods: {
         //Init
         init() {

         },
       register(){
          this.$router.push({name: 'auth.register'})
       }
      }
   }
</script>

<style lang="stylus">
   #addCartOptions
      .price
         font-size 1.5rem
         font-weight bold
         color $primary

   #selectQuantityComponent
      .q-btn-item
         font-size 15px
         padding 0
         border-radius 20% !important

      .remove
         background $red !important
         color #ffffff !important

      .add
         background $positive!important
         color #fff !important

</style>
