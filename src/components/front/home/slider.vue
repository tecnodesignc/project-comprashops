<template>
    <div id="mainSlider" class="q-pt-sm">
        <q-carousel v-if="success"
                v-model="slide"
                swipeable
                animated
                :padding="true"
                :arrows="true"
                :navigation="true"
                control-color="primary"
                navigation-position="bottom"
                height="368px"
                class="rounded-borders"
        >
            <q-carousel-slide  class="column flex-center" v-for="(slide, i) in slider.slides" :key="i" :name="'slide-'+i"
                              v-if="slide.active && slide.title">
                <div class="row fit justify-end items-center q-gutter-xs q-col-gutter">
                    <div class="col-6">
                        <h3 class="slide-subtitle q-mt-md">{{slide.caption}}</h3>
                        <h2 class="slide-title">{{slide.title}}</h2>
                        <div class="slide-caption q-mt-sm" v-html="slide.customHtml"></div>
                        <q-btn  class="q-mt-lg no-shadow btn-small slide-link"
                                color="primary"
                                :to="slide.url"
                                label="Comprar" ></q-btn>
                    </div>
                    <q-img class="col-4 mobile-hide" :src="slide.imageUrl"/>
                </div>
            </q-carousel-slide>
            <q-carousel-slide  class="column flex-center" v-else-if="slide.active" :img-src="slide.imageUrl" :name="'slide-'+i"></q-carousel-slide>
        </q-carousel>
    </div>
</template>
<script>

    export default {
        props: {},
        components: {},
        watch: {},
        mounted() {
            this.$nextTick(function () {
                this.init()
            })
        },
        data() {
            return {
                success:false,
                slider: [{
                    slides: {}
                }],
                slide:'slide-'+0
            }
        },
        computed: {},
        methods: {
            async init() {
                await this.getSlider();
            },
            getSlider(refresh = false) {
                return new Promise((resolve, reject) => {
                    let criteria = 'main'
                    let params = {
                        refresh,
                        params: {
                            filter: {
                                field: 'system_name'
                            },
                            include: 'slides'
                        }
                    }
                    this.loading = true
                    this.$crud.show('apiRoutes.qslider.sliders', criteria, params).then(response => {
                        this.slider = response.data
                        this.success=true
                        this.loading = false
                        resolve(true);
                    }).catch(error => {
                        console.warn('Error slider Get' + error)
                        this.loading = false
                        reject(error);
                    })
                });
            },
        }

    }
</script>
<style lang="stylus">
#mainSlider
    .q-carousel
        background inherit

    .slide-subtitle
        font-family "Open Sans";
        text-align left;
        line-height 22px;
        letter-spacing 0px;
        font-weight 700;
        font-size 14px;
        color rgb(250, 79, 38);
        text-decoration none;
        white-space nowrap;
        transform-origin 50% 50%;
        opacity 1;
        transform translate(0px, 0px);
    .slide-title
        font-family "Open Sans";
        text-transform uppercase;
        visibility visible;
        text-align left;
        line-height 31px;
        letter-spacing 0px;
        font-weight 700;
        font-size 25px;
        height auto;
        color rgb(17, 17, 17);
        text-decoration none;
        white-space normal;
        transform-origin 50% 50%;
        opacity 1;
        transform translate(0px, 0px);
    .slide-caption
        z-index 11;
        font-family "Open Sans";
        visibility visible;
        text-align left;
        word-wrap break-word !important;
        line-height 20px;
        letter-spacing 0px;
        font-weight 400;
        font-size 13px;
        color rgb(85, 85, 85);
        text-decoration none;
        transform-origin 50% 50%;
        opacity 1;
        transform translate(0px, 0px);
    .slide-link
        font-family "Open Sans";
        visibility visible;
        text-align center;
        line-height 20px;
        letter-spacing 0px;
        font-weight 700;
        font-size 13px;
        border-color transparent;
        border-style none;
        border-radius 3px;
        padding 3px 18px;
        text-decoration none;
        white-space normal;
        width 137px;
        transform-origin 50% 50%;
        opacity 1;
        transform translate(0px, 0px);

</style>
