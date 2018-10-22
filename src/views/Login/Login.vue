<template>

    <div class="vw-100 vh-100 bg">

        <div class="container">
            <div class="row vh-100 d-flex justify-content-center align-items-center p-2 p-lg-0">
                <div class="col-lg-6 shadow p-3 mb-5 bg-white rounded">
                    <!-- the logo -->
                    <div class="row d-flex justify-content-center">
                        <div class="col-12 col-md-10 mt-md-5">
                            <img class="col-12 img-fluid" src="../../assets/logo.png">
                        </div>
                    </div>

                    <div class="row mt-5 mb-3"><h4 class="flex-fill text-center">ورود / ثبت نام</h4></div>

                    <!-- form -->
                    <transition name="fade" mode="out-in">
                        <component v-bind:is="view"></component>
                    </transition>



                    <div v-if="isProgressActive" class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated bg-info"
                             role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                             style="width: 100%"></div>
                    </div>

                </div>
            </div>
        </div>

    </div>

</template>


<script>




    export default {
        name: "login",
        data() {
            return {
                view: 'phoneForm',

                isProgressActive: false,

                isBorderActive: true,
                isHiddenError: true,
                isButtonActive: false,

                doBounce: false,

                isCodeBorderActive: true,
                isCodeHiddenError: true,
                isCodeButtonActive: false,

                phone: '',
                code: '',
                Error: '',
            }
        },

        components: {
            'phoneForm': () => import('./phone.vue'),
            'codeForm': () => import('./code.vue')
        },

        methods: {
            setDelay: function () {
                const delayInMilliseconds = 3000;

                const THIS = this;
                setTimeout(function () {
                    THIS.$router.push({path: '/login'});
                }, delayInMilliseconds);
            },
        },
        beforeMount: function () {
            if (localStorage.getItem('logging-out')) {

                localStorage.removeItem('logging-out');

            } else if (localStorage.getItem('data')) {
                this.$router.push({path: '/dashboard/new-order'});

            }
        }
    }
</script>


<style scoped>

    .form-control::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: darkred;
        opacity: 1; /* Firefox */
    }

    .form-control:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: darkred;
    }

    .form-control::-ms-input-placeholder { /* Microsoft Edge */
        color: darkred;
    }

    .bounce {
        animation: bounce-in .3s;
    }

    .bounce_back {
        animation: bounce-in .3s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.25);
        }
        100% {
            transform: scale(1);
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }


</style>