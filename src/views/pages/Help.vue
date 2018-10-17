<template>

    <div class="container">

        <div class="row h-100 d-flex justify-content-center py-5">

            <div id="carouselIndicators" class="carousel slide align-self-center w-100 h-100 shadow-lg" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner h-100">
                    <div class="carousel-item active w-100 h-100">
                        <div class="row">
                            <div class="col"></div>
                            <img class="col d-none rounded-circle"
                                 src="https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/PZSxGIZ/cinematic-bg-3-loopable-background_nl6buhlfg__F0000.png"
                                 alt="Third slide">
                            <div class="col"></div>
                        </div>
                        <div class="carousel-caption d-none d-md-block">
                            <h3 class="mb-3">واش ماش</h3>
                            <p class="text-justify text-center mb-5" dir="rtl">بعد از نصب برنامه واش ماش و عضویت در آن می توانید سفارش خود را ثبت کنید. در این مرحله مشخصات سفارش را وارد می کنید.</p>
                        </div>
                    </div>
                    <div class="carousel-item w-100 h-100">
                        <div class="row">
                            <div class="col"></div>
                            <img class="col d-none rounded-circle"
                                 src="https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/PZSxGIZ/cinematic-bg-3-loopable-background_nl6buhlfg__F0000.png"
                                 alt="Third slide">
                            <div class="col"></div>
                        </div>
                        <div class="carousel-caption d-none d-md-block">
                            <h3 class="mb-3">جمع آوری ها</h3>
                            <p class="text-justify text-center mb-5" dir="rtl">واش ماشی ها در روز و ساعتی که مشخص کرده اید به درب منزل و یا محل کار شما می آیند و کیسه مخصوص واش ماش حاوی البسه و سایر را از شما دریافت می کنند.</p>
                        </div>
                    </div>
                    <div class="carousel-item w-100 h-100">
                        <div class="row">
                            <div class="col"></div>
                            <img class="col d-none rounded-circle align-self-center"
                                 src="https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/PZSxGIZ/cinematic-bg-3-loopable-background_nl6buhlfg__F0000.png"
                                 alt="Third slide">
                            <div class="col"></div>
                        </div>
                        <div class="carousel-caption d-none d-md-block">
                            <h3 class="mb-3">شستشو از ما</h3>
                            <p class="text-justify text-center mb-5" dir="rtl">خدمات درخواستی روی البسه و سایر طبق دستورالعمل مشخصه روی هر یک از آن ها با دقت و کیفیت بالا توسط پیشرفته ترین دستگاه های روز دنیا و مرغوبترین مواد شوینده انجام می شود.</p>
                        </div>
                    </div>
                    <div class="carousel-item w-100 h-100">
                        <div class="row">
                            <div class="col"></div>
                            <img class="col d-none rounded-circle align-self-center"
                                 src="https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/PZSxGIZ/cinematic-bg-3-loopable-background_nl6buhlfg__F0000.png"
                                 alt="Third slide">
                            <div class="col"></div>
                        </div>
                        <div class="carousel-caption d-none d-md-block">
                            <h3 class="mb-3">تحویل رایگان ما</h3>
                            <p class="text-justify text-center mb-5" dir="rtl">واش ماشی ها در روز و ساعتی که مشخص کرده اید به درس منزل و یا محل کار شما می آیند و البسه و سایر شسته و آماده را تحویل شما می دهند. شما می توانید هزینه را بصورت نقدی، توسط دستگاه pos، آنلاین و یا از طریق حساب مجازی خود در واش ماش پرداخت نمایید.</p>
                        </div>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>

        </div>


    </div>

</template>


<script>
    export default {
        name: "help",
        data() {
            return {}
        },
        computed: {

            groupedOrders() {
                return this.chunk(this.orders, 2)
            },
        },

        components: {
            // 'phoneForm': () => import('./phone.vue'),
            // 'codeForm': () => import('./code.vue')
        },

        methods: {


            toMoneyFormat: function (number) {
                return new Intl.NumberFormat('fa', {maximumSignificantDigits: 3}).format(number)
            }
        },
        beforeMount: function () {

        },
        mounted: function () {
        },
    }
</script>


<style scoped>

    *:focus {
        outline: 0;
    }

    img {
        width: 25vw;
        height: 25vw;
    }

    hr {
        border-top: 1px solid #1e7e34;
        -o-transition: .3s;
        -ms-transition: .3s;
        -moz-transition: .3s;
        -webkit-transition: .3s;
        transition: .3s;
    }


</style>