<template>

    <div class="container">
        <div class="row h-auto d-flex justify-content-center py-5">
            <div class="card h-auto shadow shadow-sm col-12 col-lg-8 text-right">

                <div class="card-body" dir="rtl">


                    <transition name="fade" mode="out-in">

                        <div :key="1" v-if="!IncreaseBalance">
                            <div class="row mb-4">
                                <div class="card bg-dark h-auto shadow-sm col-12 text-white">

                                    <div class="card-body py-3 px-0">
                                        <div class="row balance-card">
                                            <div class="col-9">
                                                <div class="row">
                                                    <div class="col-6 text-right font-weight-bold d-flex justify-content-start">
                                                        <i class="fas fa-2x fa-file-invoice-dollar"></i>
                                                        &nbsp;
                                                        <span class="align-self-center">اعتبار فعلی :</span>
                                                    </div>
                                                    <div class="col-6 text-left font-weight-bold align-self-center">
                                                        {{ toMoneyFormat($userData.credit/10) }}
                                                        تومان
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-3 d-flex justify-content-center align-items-center">
                                                <div class="btn btn-outline-info btn-lg"
                                                     @click="IncreaseBalance=true">
                                                    افزایش اعتبار
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="row border border-success rounded mb-2 p-3 d-flex justify-content-center card-cash-info"
                                 v-for="(credit, key) in $userData.credits_user"
                                 :key="key">

                                <div class="col-12 text-center">{{ credit.date + " ساعت " + credit.time }}</div>

                                <hr class="row col-9"/>

                                <div class="col-12 text-center field-cash-info">
                                    {{ toMoneyFormat(credit.missionary) + " ریال " + credit.direction + " | " +
                                    credit.title
                                    }}
                                </div>
                            </div>

                        </div>

                        <div :key="2" v-if="IncreaseBalance">

                            <div class="card bg-info h-auto shadow-sm col-12 text-white">

                                <div class="card-body py-3 px-0">
                                    <div class="row">

                                        <div class="col-12 text-right font-weight-bold d-flex justify-content-start">
                                            <i class="fas fa-2x fa-credit-card align-self-center"></i>
                                            &nbsp;
                                            <span class="align-self-center">مبلغ افزایش اعتبار حساب را وارد نموده و سپس دکمه افزایش را بزنید</span>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-12 mt-3">
                                    <div class="container form-group">
                                        <div class="row align-items-center">

                                            <div class="col-7 px-1">
                                                <input class="col-12 form-control text-info align-self-center"
                                                       placeholder="مبلغ را وارد کنید"
                                                       v-model="amount"
                                                       type="number"
                                                       min="1"
                                                       id="amount"
                                                       v-on:input="Change()"/>
                                            </div>
                                            <div class="col-5">
                                                <div class="row">
                                                    <div class="col-6 px-1">
                                                        <div class="col-12 btn btn-lg btn-outline-success">افزایش</div>
                                                    </div>
                                                    <div class="col-6 px-1">
                                                        <div class="col-12 btn btn-lg btn-outline-danger"
                                                             @click="IncreaseBalance = false">لغو
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </transition>

                </div>

            </div>
        </div>


        <!-- the modal -->
        <div class="modal" id="confirm_modal" tabindex="-1" role="dialog" dir="rtl">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title w-100 text-right">پیام تایید</h5>
                        <button type="button" class="close flex-shrink-1" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="d-block text-center">
                            <h5>سفارش شما با موفقیت ثبت شد. منتظر تایید سفارش از سوی کارشناسان واش-ماش باشید</h5>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-dismiss="modal">متوجه شدم</button>
                    </div>
                </div>
            </div>
        </div>


    </div>

</template>


<script>
    export default {
        name: "new_order",
        data() {
            return {

                amount: '',


                IncreaseBalance: false,

                isProgressActive: false,

                isHiddenError: true,
                Error: '',
            }
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

            show_time: function (time) {
                const array = time.split(' : ');
                return "ساعت " + array[0] + " تا " + array[1];
            },

            getKeyByValue: function (object, value) {
                return Object.keys(object).find(key => object[key] === value);
            },

            countWords: function (str) {
                return str.trim().split('').length;
            },

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

    .card-cash-info {
        -o-transition: .3s;
        -ms-transition: .3s;
        -moz-transition: .3s;
        -webkit-transition: .3s;
        transition: .3s;
    }

    .card-cash-info:hover {
        border: #ffffff;
        color: #ffffff;
        background-color: #1e7e34;
        transform: scale(1.025, 1.025);
    }

    .card-cash-info:hover hr {
        border-top: 1px solid #ffffff;
    }

    .balance-card {
        font-size: 20pt;
    }

    .field-cash-info {
        font-size: 15pt;
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