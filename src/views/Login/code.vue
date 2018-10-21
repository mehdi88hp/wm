<template>

    <div class="row d-flex justify-content-center">
        <div class="col-10 col-md-8">

            <form onsubmit="return false;">
                <div class="form-group">
                    <label for="codeField" class="col-12 text-center text-justify small">کد فعالسازی ارسال شده به
                        <label v-html="phone"></label> را وارد کنید</label>
                    <input id="codeField"
                           type="text"
                           v-bind:oninput="checkCode()"
                           v-bind:class="{
                           border : isCodeBorderActive,
                           'border-danger' : isCodeBorderActive,
                           'text-danger' : isCodeBorderActive,
                           'text-primary' : !isCodeBorderActive
                       }"
                           class="form-control text-center"
                           v-model="code"
                           maxlength="4"
                           aria-describedby="emailHelp"
                           placeholder="کد فعال سازی">

                    <transition name="fade">
                        <div class="alert alert-danger small mt-2 like-pre"
                             v-if="!isCodeHiddenError">{{ Error }}
                        </div>
                    </transition>
                </div>


                <div class="form-group mt-2" v-bind:class="{ bounce : doBounce }">
                    <button class="btn btn-outline-primary col-12" v-on:click="submitCodeForm()"
                            :disabled="!isCodeButtonActive">اعتبارسنجی
                    </button>
                </div>

                <div class="row d-flex justify-content-center">
                    <button type="button" class="btn btn-link mb-2 mt-1" :class="{disabled: second_count_down}"
                            v-on:click="RequestActivationCode()">
                       {{ second_count_down }} کد فعال سازی را دریافت نکردم؟
                    </button>
                </div>
                <div class="row d-flex justify-content-center">
                    <button type="button" class="btn btn-link mb-5" v-on:click="$parent.view = 'phoneForm'">
                        تغییر شماره
                    </button>
                </div>
            </form>

            <!-- the modal -->
            <div class="modal" id="activate_code_resent_modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="p-3 border-bottom">
                            <div class="row">
                                <div class="col-12  d-flex justify-content-between">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h5 class="modal-title text-right" id="order_info_modal_Title">پیام</h5>
                                </div>
                            </div>
                        </div>
                        <div class="modal-body">
                            <div class="d-block text-center">
                                <h5>کد تایید به شماره <label v-html="phone"></label> دوباره ارسال شد</h5>
                            </div>
                        </div>
                        <div class="modal-footer d-flex justify-content-center">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">باشه</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>

</template>


<script>


    import Vue from 'vue'

    export default {
        name: "codeForm",
        data() {
            return {

                second_count_down: 30,

                doBounce: false,
                isCodeBorderActive: true,
                isCodeHiddenError: true,
                isCodeButtonActive: false,
                code: '',
                Error: '',
                phone: '',
                isCodeInvalid: false,

            }
        },

        methods: {

            checkCode: function () {
                this.isCodeBorderActive = !this.code.match(/^([0-9]|[۰-۹])+$/);

                if (this.countWords(this.code) > 0) {
                    if (this.isCodeBorderActive) {
                        this.isCodeHiddenError = false;
                        this.Error = "کد وارد شده نامعتبر است";
                    } else {
                        this.isCodeButtonActive = this.countWords(this.code) === 4;
                        this.doBounce = this.countWords(this.code) === 4;

                        if (this.isCodeInvalid && (this.countWords(this.code) > 3)) {
                            return;
                        }
                        this.isCodeHiddenError = true;
                        this.Error = "";
                    }
                } else {
                    this.isCodeHiddenError = true;
                }
            },

            submitCodeForm: function () {

                this.isCodeButtonActive = false;
                this.$parent.isProgressActive = true;

                const code = this.convertNumbers2English(this.code);
                const phone_num = this.convertNumbers2English(this.phone);


                let formData = new FormData();

                formData.append('active_code', code);
                formData.append('phone', phone_num);

                this.$API.post(
                    '/api/v5/user/SignIn',
                    formData,
                    {
                        headers: {
                            'Accept': 'application/json',
                        }
                    })
                    .then(
                        (response) => {
                            console.log(response);
                            this.$parent.isProgressActive = false;
                            console.log(response.data);
                            if (parseInt(response.data.code) === 1) {

                                // todo Handle to SingUp Page if user in new
                                if (!response.data.user_exists) {

                                    localStorage.setItem('cities', JSON.stringify(response.data.cities));
                                    localStorage.setItem('phone', phone_num);
                                    this.$router.push({path: '/sign-up'});

                                } else {

                                    localStorage.setItem('data', JSON.stringify(response.data));
                                    Vue.prototype.$userData = response.data;
                                    Vue.prototype.$TOKEN = response.data.token;
                                    this.$router.push({path: '/dashboard/new-order'});

                                }
                            } else {
                                this.isCodeInvalid = true;
                                this.isCodeHiddenError = false;
                                this.Error = "کد وارد شده موجود نیست! دوباره امتحان کنید";
                            }
                        }, (error) => {
                            this.$parent.isProgressActive = true;
                            this.isCodeButtonActive = true;
                            console.log(error)
                        }
                    );
            },


            RequestActivationCode: function () {

                this.isCodeButtonActive = false;
                this.$parent.isProgressActive = true;

                const phone_num = this.convertNumbers2English(this.phone);

                let formData = new FormData();

                formData.append('phone', phone_num);

                this.$API.post(
                    '/api/v5/user/requestSignInActivateCode',
                    formData,
                    {
                        headers: {
                            'Accept': 'application/json',
                        }
                    })
                    .then(
                        (response) => {
                            console.log(response);
                            this.$parent.isProgressActive = false;
                            if (parseInt(response.data.code) === 1) {

                                this.$parent.view = 'codeForm';
                                this.$nextTick(function () {
                                    $('#activate_code_resent_modal').modal('show');
                                });

                                this.set_count_down();

                            } else {
                                this.isCodeButtonActive = true;
                                this.isCodeHiddenError = false;
                                this.Error = response.data.msg;

                            }
                        }, (error) => {
                            this.$parent.isProgressActive = true;
                            this.isCodeButtonActive = true;
                            console.log(error)
                        }
                    );
            },

            set_count_down: function () {
                this.second_count_down = 30;
                const THIS = this;
                const interval = setInterval(function () {
                    THIS.second_count_down--;
                    if (THIS.second_count_down === 0) {
                        THIS.second_count_down = '';
                        clearInterval(interval);
                    }
                }, 1000);
            },


            countWords: function (str) {
                return str.trim().split('').length;
            },


            convertNumbers2English: function (string) {
                return string.replace(/[\u0660-\u0669]/g, function (c) {
                    return c.charCodeAt(0) - 0x0660;
                }).replace(/[\u06f0-\u06f9]/g, function (c) {
                    return c.charCodeAt(0) - 0x06f0;
                });
            },

        },
        beforeMount: function () {
            this.phone = localStorage.getItem('phone');

            this.set_count_down();
        },
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