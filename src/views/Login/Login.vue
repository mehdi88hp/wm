<template>

    <div class="vh-100 vw-100 bg">

        <div class="container">
            <div class="row align-items-center vh-100">
                <div class="col"></div>
                <div class="col-lg-6 shadow p-3 mb-5 bg-white rounded">
                    <!-- the logo -->
                    <div class="row">
                        <div class="col"></div>
                        <div class="col-10 mt-5">
                            <img class="mw-100 mh-100" src="../../assets/logo.png" width="1000">
                        </div>
                        <div class="col"></div>
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
                <div class="col"></div>
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