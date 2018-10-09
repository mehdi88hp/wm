<template>

    <div class="row">
        <div class="col"></div>
        <div class="col-8">

            <form onsubmit="return false;">
                <div class="form-group">
                    <label for="code" class="col-12 text-right small">کد فعالسازی ارسال شده به
                        <label v-html="phone"></label> را وارد کنید</label>
                    <input id="code"
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
                        <div class="alert alert-danger small mt-2 text-right"
                             v-if="!isCodeHiddenError">{{ Error }}
                        </div>
                    </transition>
                </div>


                <div class="form-group mt-2" v-bind:class="{ bounce : doBounce }">
                    <button class="btn btn-outline-primary col-12" v-on:click="submitCodeForm()"
                            :disabled="!isCodeButtonActive">اعتبارسنجی
                    </button>
                </div>
                <button type="button" class="btn btn-link mb-5 mt-1" v-on:click="RequestActivationCode()">ارسال دوباره کد</button>
                <button type="button" class="btn btn-link mb-5 mt-1" v-on:click="$parent.view = 'phoneForm'">تغییر شماره</button>

            </form>

            <!-- the modal -->
            <div class="modal" id="activate_code_resent_modal" tabindex="-1" role="dialog" dir="rtl">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title w-100 text-right">پیام</h5>
                            <button type="button" class="close flex-shrink-1" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="d-block text-center">
                                <h5>کد تایید به شماره <label v-html="phone"></label> دوباره ارسال شد</h5>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">باشه</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <div class="col"></div>
    </div>

</template>


<script>


    import Vue from 'vue'

    export default {
        name: "login",
        data() {
            return {

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
                                localStorage.setItem('data', JSON.stringify(response.data));
                                Vue.prototype.$userData = response.data;
                                Vue.prototype.$TOKEN = response.data.token;
                                this.$router.push({ path: '/dashboard/new-order' });
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
                                })

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




            countWords: function (str) {
                return str.trim().split('').length;
            },


            convertNumbers2English: function (string) {
                return string.replace(/[\u0660-\u0669]/g, function (c) {
                    return c.charCodeAt(0) - 0x0660;
                }).replace(/[\u06f0-\u06f9]/g, function (c) {
                    return c.charCodeAt(0) - 0x06f0;
                });
            }

        },
        beforeMount: function () {
            this.phone = localStorage.getItem('phone');
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