<template>

    <div class="container">

        <div class="row h-100 d-flex justify-content-center p-2 px-lg-0 py-lg-5">

            <div id="carouselIndicators" class="carousel slide align-self-center w-auto h-100 shadow-lg" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselIndicators" data-slide-to="2"></li>
                    <li data-target="#carouselIndicators" data-slide-to="3"></li>
                </ol>
                <div class="carousel-inner h-100">
                    <div class="carousel-item active w-auto h-100">
                        <div class="w-auto h-100 px-0">
                            <img class="img-fluid h-100 w-auto" width="600" height="1024"
                                 src="../../assets/help1.jpg"
                                 alt="First slide">
                        </div>
                    </div>
                    <div class="carousel-item w-auto h-100">
                        <div class="w-auto h-100 px-0">
                            <img class="img-fluid h-100 w-auto" width="600" height="1024"
                                 src="../../assets/help2.jpg"
                                 alt="Second slide">
                        </div>
                    </div>
                    <div class="carousel-item w-auto h-100">
                        <div class="w-auto h-100 px-0">
                            <img class="img-fluid h-100 w-auto" width="600" height="1024"
                                 src="../../assets/help3.jpg"
                                 alt="Third slide">
                        </div>
                    </div>
                    <div class="carousel-item w-auto h-100">
                        <div class="w-auto h-100 px-0">
                            <img class="img-fluid h-100 w-auto" width="600" height="1024"
                                 src="../../assets/help4.jpg"
                                 alt="Forth slide">
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