<template>
  <div style="width: 100%;">
    <q-carousel
            arrows
            animated
            v-model="slide"
            infinite
            autoplay
    >
      <q-carousel-slide v-for="(slide,i) in gallery" :key="i" :name="`slide-${i}`"  :img-src="slide.path">
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
    export default {
        props:{
            gallery:{
                type: Array,
                default: []
            },
            storeName:{
              type:String,
              default:""
            }
        },
        data() {
            return {
                loading: false,
                position: {},
                slide: 'slide-0'
            }
        },
        created() {
        },
        methods:{
        }
    }
</script>
<style lang="stylus">
  .q-carousel
    height 600px
    .custom-caption
      top 40%
      max-width 50%
      margin-left 15%
      font-family $font-tertiary
      text-shadow: 1px 1px 1px #fff;
    @media screen and (max-width: $breakpoint-md)
      height 400px
      .custom-caption
        top 40%
        .text-h2
          font-size: 2.75rem;
          font-weight: 300;
          line-height: 2.5rem;
    @media screen and (max-width: $breakpoint-sm)
      height 200px
      .custom-caption
        .text-h2
          font-size: 1.75rem;
          font-weight: 300;
          line-height: 1.5rem;
</style>
