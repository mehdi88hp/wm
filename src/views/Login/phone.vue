<template>

    <div class="row">
        <div class="col"></div>
        <div class="col-8">

            <form onsubmit="return false;">
                <div class="form-group">
                    <input type="text"
                           v-bind:oninput="checkPhone()"
                           v-bind:class="{
                           border : isBorderActive,
                           'border-danger' : isBorderActive,
                           'text-danger' : isBorderActive,
                           'text-primary' : !isBorderActive
                           }"
                           class="form-control text-center"
                           v-model="phone"
                           maxlength="11"
                           aria-describedby="emailHelp"
                           placeholder="شماره همراه">

                    <transition name="fade">
                        <div class="alert alert-danger small mt-2 text-right like-pre"
                             v-if="!isHiddenError">{{ Error }}
                        </div>
                    </transition>
                </div>


                <div class="form-group mb-5 mt-2" v-bind:class="{ bounce : doBounce }">

                    <button class="btn btn-outline-primary col-12" v-on:click="submitForm()"
                            :disabled="!isButtonActive">ورود
                    </button>

                </div>
            </form>

        </div>
        <div class="col"></div>
    </div>

</template>


<script>


    export default {
        name: "login",
        data() {
            return {
                isBorderActive: true,
                isHiddenError: true,
                isButtonActive: false,

                doBounce: false,

                phone: '',
                Error: '',
            }
        },
        methods: {


            checkPhone: function () {

                this.isBorderActive = !(this.convertNumbers2English(this.phone).startsWith('0') && this.phone.match(/^([0-9]|[۰-۹])+$/));

                if (this.countWords(this.phone) > 0) {

                    if (this.countWords(this.phone) > 1) {
                        this.isBorderActive = !(this.convertNumbers2English(this.phone).startsWith('09') && this.phone.match(/^([0-9]|[۰-۹])+$/));
                    }
                    if (this.isBorderActive) {
                        this.isHiddenError = false;
                        this.Error = "شماره وارد شده نامعتبر است. شماره خود را در ۱۱ رقم وارد کنید.";
                    } else {
                        this.isHiddenError = true;
                        this.Error = "";

                        this.isButtonActive = this.countWords(this.phone) === 11;
                        this.doBounce = this.countWords(this.phone) === 11;

                    }
                } else {
                    this.isHiddenError = true;
                }

            },

            submitForm: function () {

                this.isButtonActive = false;
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

                                localStorage.setItem('phone', phone_num);

                                this.$parent.view = 'codeForm';

                            } else {
                                this.isButtonActive = true;
                                this.isHiddenError = false;
                                this.Error = response.data.msg;

                            }
                        }, (error) => {
                            this.$parent.isProgressActive = true;
                            this.isButtonActive = true;
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