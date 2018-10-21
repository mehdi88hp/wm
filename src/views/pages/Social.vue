<template>

    <div class="container">
        <div class="row h-auto d-flex justify-content-center p-2 px-lg-0 py-lg-5">
            <div class="card h-auto shadow shadow-sm col-12 col-lg-8 p-0 p-md-2 text-right">

                <div class="card-body pt-1 pt-md-2 px-1" dir="rtl">

                <div class="px-3">


                    <div class="row p-3 bg-info text-white rounded shadow-sm d-flex justify-content-between">
                        <i class="col-1 fas fa-2x fa-stream align-self-center"></i>
                        <div class="col-10 col-md-11 text-right align-self-center text-right text-justify" dir="rtl">
                            واش ماش را در شبکه های اجتماعی محبوب دنبال کنید
                        </div>
                    </div>

                    <div class="row mt-5 d-flex justify-content-center">

                        <a style="height: 10%;" v-ripple href="https://t.me/WASHMASHAPP"
                           class="col-10 col-lg-4 card-code rounded p-3 d-flex justify-content-between align-items-center card-telegram">

                            <i class="fab fa-2x fa-telegram telegram"></i>
                            <div class="col-12">
                                <div class="text-center telegram" dir="ltr">@WASHMASHAPP</div>
                            </div>
                        </a>

                    </div>

                    <div class="row mt-4 d-flex justify-content-center">


                        <a style="height: 10%;" v-ripple href="http://www.instagram.com/WASHMASHAPP"
                           class="col-10 col-lg-4 card-code rounded p-3 d-flex justify-content-between align-items-center card-instagram">

                            <i class="fab fa-2x fa-instagram instagram"></i>
                            <div class="col-12">
                                <div class="text-center instagram" dir="ltr">@WASHMASHAPP</div>
                            </div>
                        </a>

                    </div>

                    <div class="row mt-4 d-flex justify-content-center">

                        <a style="height: 10%;" v-ripple href="http://www.facebook.com/WASHMASHAPP"
                           class="col-10 col-lg-4 card-code rounded p-3 d-flex justify-content-between align-items-center card-facebook">

                            <i class="fab fa-2x fa-facebook facebook"></i>
                            <div class="col-12">
                                <div class="text-center facebook" dir="ltr">@WASHMASHAPP</div>
                            </div>
                        </a>

                    </div>

                    <div class="row mt-4 mb-5 d-flex justify-content-center">

                        <a style="height: 10%;" v-ripple href="https://twitter.com/WASHMASHAPP"
                           class="col-10 col-lg-4 card-code rounded p-3 d-flex justify-content-between align-items-center card-twitter">

                            <i class="fab fa-2x fa-twitter twitter"></i>
                            <div class="col-12">
                                <div class="text-center twitter" dir="ltr">@WASHMASHAPP</div>
                            </div>
                        </a>

                    </div>


                </div>
                </div>

            </div>

        </div>
    </div>

</template>


<script>
    export default {
        name: "social",
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

            handleCopy: function () {
                this.copyToClipboard(this.$userData.tell_friends);
                const THIS = this;
                setTimeout(function () {
                    THIS.$nextTick(function () {
                        $('.card-code').popover('hide');
                    });
                }, 2000);
            },

            toMoneyFormat: function (number) {
                return new Intl.NumberFormat('fa', {maximumSignificantDigits: 3}).format(number)
            },

            copyToClipboard: function (text) {
                if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
                    var textarea = document.createElement("textarea");
                    textarea.textContent = text;
                    textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
                    document.body.appendChild(textarea);
                    textarea.select();
                    try {
                        return document.execCommand("copy");  // Security exception may be thrown by some browsers.
                    } catch (ex) {
                        console.warn("Copy to clipboard failed.", ex);
                        return false;
                    } finally {
                        document.body.removeChild(textarea);
                    }
                }
            },
        },
        beforeMount: function () {
            this.services = this.$userData.services.filter(function (service) {
                return service.gender === 'مردانه';
            });
        },
        mounted: function () {
            this.$nextTick(function () {
                $(function () {
                    $('[data-toggle="popover"]').popover();
                });
            })
        },
    }
</script>


<style scoped>

    *:focus {
        outline: 0;
    }


    .telegram {
        color: #0088cc;
        -o-transition: .5s;
        -ms-transition: .5s;
        -moz-transition: .5s;
        -webkit-transition: .5s;
        transition: .5s;
    }

    .facebook {
        color: #3B5998;
        -o-transition: .5s;
        -ms-transition: .5s;
        -moz-transition: .5s;
        -webkit-transition: .5s;
        transition: .5s;
    }

    .instagram {
        color: #fb3958;
        -o-transition: .5s;
        -ms-transition: .5s;
        -moz-transition: .5s;
        -webkit-transition: .5s;
        transition: .5s;
    }

    .twitter {
        color: #00C6FF;
        -o-transition: .5s;
        -ms-transition: .5s;
        -moz-transition: .5s;
        -webkit-transition: .5s;
        transition: .5s;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    .card-telegram {
        color: #0088cc;
        -o-transition: .5s;
        -ms-transition: .5s;
        -moz-transition: .5s;
        -webkit-transition: .5s;
        transition: .5s;
    }

    .card-facebook {
        color: #3B5998;
        -o-transition: .5s;
        -ms-transition: .5s;
        -moz-transition: .5s;
        -webkit-transition: .5s;
        transition: .5s;
    }

    .card-instagram {
        color: #fb3958;
        -o-transition: .5s;
        -ms-transition: .5s;
        -moz-transition: .5s;
        -webkit-transition: .5s;
        transition: .5s;
    }

    .card-twitter {
        color: #00C6FF;
        -o-transition: .5s;
        -ms-transition: .5s;
        -moz-transition: .5s;
        -webkit-transition: .5s;
        transition: .5s;
    }




    .card-telegram:hover {
        color: #ffffff;
        background-color: #0088cc;
        transform: scale(1.3);
    }
    .card-telegram:hover .telegram {
        color: #ffffff;
    }

    .card-facebook:hover {
        color: #ffffff;
        background-color: #3B5998;
        transform: scale(1.3);
    }
    .card-facebook:hover .facebook {
        color: #ffffff;
    }

    .card-instagram:hover {
        color: #ffffff;
        background-color: #fb3958;
        transform: scale(1.3);
    }
    .card-instagram:hover .instagram {
        color: #ffffff;
    }

    .card-twitter:hover {
        color: #ffffff;
        background-color: #00C6FF;
        transform: scale(1.3);
    }
    .card-twitter:hover .twitter {
        color: #ffffff;
    }

</style>