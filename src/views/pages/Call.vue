<template>

    <div class="container">
        <div class="row h-auto d-flex justify-content-center p-2 px-lg-0 py-lg-5">
            <div class="card h-auto shadow shadow-sm col-12 col-lg-8 p-0 p-md-2 text-right">

                <div class="card-body pt-1 pt-md-2 px-1" dir="rtl">
                <div class="px-3" dir="rtl">


                    <div class="row p-3 bg-info text-white rounded shadow-sm d-flex justify-content-between">
                        <i class="col-1 fas fa-2x fa-headset align-self-center"></i>
                        <div class="col-10 col-md-11 text-right align-self-center text-center text-justify" dir="rtl">
                            برای تماس با واش ماش می توانید از راه های زیر اقدام کنید. مرکز پشتیبانی تلفنی از ساعت ۸ الی ۲۰ فعال می باشد
                        </div>
                    </div>

                    <div class="row mt-5 d-flex justify-content-center">

                        <a id="card-phone" style="height: 10%;" v-ripple @click="handleCopy('00982122599005')"
                           data-toggle="popover" data-content="در بریده دان ذخیره شد"
                           class="col-8 col-lg-5 card-code rounded p-3 d-flex justify-content-between align-items-center card-telegram">

                            <i class="fas fa-2x fa-phone telegram"></i>
                            <div class="col-11">
                                <div class="text-center telegram" dir="ltr">00982122599005</div>
                            </div>
                        </a>

                    </div>

                    <div class="row mt-4 d-flex justify-content-center">


                        <a style="height: 10%;" v-ripple
                           href="mailto:support@washmash.com"
                           class="col-8 col-lg-5 card-code rounded p-3 d-flex justify-content-between align-items-center card-instagram">

                            <i class="fas fa-2x fa-envelope instagram"></i>
                            <div class="col-11">
                                <div class="text-center instagram" dir="ltr">support@washmash.com</div>
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
        name: "call",
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

            handleCopy: function (text) {
                this.copyToClipboard(text);
                const THIS = this;
                setTimeout(function () {
                    THIS.$nextTick(function () {
                        $('#card-phone').popover('hide');
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