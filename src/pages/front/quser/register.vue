<template>
  <div id="authLoginRegister" class="flex flex-center">
    <form-auth :horizontal-extra-fields="true" @logged="redirect()"/>
  </div>
</template>

<script>
  //components
  import formAuth from 'src/components/quser/auth/form-register'

  export default {
    props: {},
    components: { formAuth },
    beforeRouteEnter (to, from, next) {
      next(vm => vm.checkRedirect(from))
    },
    mounted () {
      //console.warn("Quser/Register/Parametros: "+this.$route.params.userRol)
      this.$nextTick(function () {
        this.checkRedirect()
      })
    },
    data () {
      return {
        redirectTo: false
      }
    },
    methods: {
      //check if redirect to route specific
      async checkRedirect (from = false) {
        let route = from || await this.$cache.get.item('route.after.login')

        if (route && route.name && (route.name != 'auth.logout')) {
          this.redirectTo = route
          //Save data of route in storage
          this.$cache.set('route.after.login', {
            name: route.name,
            fullPath: route.fullPath,
            meta: route.meta,
            params: route.params,
            path: route.path,
            query: route.query
          })
        } else {
          //Search route in storage
          this.redirectTo = { name: 'app.home' }
        }
      },
      //Redirect after login
      redirect () {
        this.$cache.remove('route.after.login')
        this.$router.push(this.redirectTo)
      }
    }
  }
</script>

<style lang="stylus">
  #authLoginRegister
    min-height 100vh


</style>
