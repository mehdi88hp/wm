<template>

    <div class="container">
        <div class="row h-auto d-flex justify-content-center p-2 px-md-0 py-md-5">
            <div class="card h-auto shadow shadow-sm col-12 col-md-8 p-2 text-right">

                <div class="card-body pt-1 pt-md-2 px-1 pb-0" dir="rtl">


                    <transition name="fade" mode="out-in">

                        <div class="px-3" :key="1" v-if="!IncreaseBalance">
                            <div class="row mb-4">
                                <div class="card bg-dark h-auto shadow-sm col-12 text-white">

                                    <div class="card-body py-3 px-0">
                                        <div class="row balance-card">
                                            <div class="col-md-9">
                                                <div class="row">
                                                    <div class="col-6 text-right font-weight-bold d-flex justify-content-start">
                                                        <i class="fas fa-2x fa-file-invoice-dollar"></i>
                                                        &nbsp;
                                                        <span class="align-self-center">اعتبار فعلی :</span>
                                                    </div>
                                                    <div class="col-6 text-left font-weight-bold align-self-center mt-2 mt-md-0">
                                                        {{ toMoneyFormat($userData.credit/10) }}
                                                        تومان
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-12 d-flex justify-content-center d-block d-md-none my-2">
                                                <div class="col-10 dropdown-divider"></div>
                                            </div>

                                            <div class="col-md-3 d-flex justify-content-center align-items-center">
                                                <div class="btn btn-outline-info"
                                                     @click="IncreaseBalance=true">
                                                    افزایش اعتبار
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div v-if="Array.isArray(bills) && bills.length"
                                 class="row border border-success rounded mb-2 p-3 d-flex justify-content-center card-cash-info"
                                 v-for="(credit, key) in pages[currentPage-1]"
                                 :key="key">

                                <div class="col-12 text-center">{{ credit.date + " ساعت " + credit.time }}</div>

                                <hr class="row col-9"/>

                                <div class="col-12 text-center field-cash-info">
                                    {{ toMoneyFormat(credit.missionary) + " ریال " + credit.direction + " | " +
                                    credit.title
                                    }}
                                </div>
                            </div>

                            <div v-if="!Array.isArray(bills) || !bills.length"
                                 class="h5 col-12 text-info mt-4 text-center">شما هیچ صورتحسابی ندارید !
                            </div>


                            <div v-if="pagesLength > 1" class="row d-flex justify-content-center mt-4 mb-2">
                                <div class="col-12 col-md-6">
                                    <pagination
                                            :pagesCount="pagesLength"
                                            :currentPage="currentPage"
                                            v-on:select="currentPage = $event"/>
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

                                            <div class="col-md-7 px-1">
                                                <input class="col-12 form-control text-info align-self-center"
                                                       placeholder="مبلغ را وارد کنید"
                                                       v-model="amount"
                                                       type="number"
                                                       min="1"
                                                       step="1"
                                                       id="amount"/>
                                            </div>
                                            <div class="col-md-5 mt-3 mt-md-0">
                                                <div class="row">
                                                    <div class="col-6 px-1">
                                                        <div class="col-12 btn btn-outline-success"
                                                             @click="LeadToPay()">افزایش
                                                        </div>
                                                    </div>
                                                    <div class="col-6 px-1">
                                                        <div class="col-12 btn btn-outline-danger"
                                                             @click="IncreaseBalance = false; amount = '';">لغو
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <transition name="fade" mode="out-in">
                                            <div class="alert alert-danger small text-right like-pre mt-3 pb-0"
                                                 v-if="!isHiddenError">{{ Error }}
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </transition>

                </div>

            </div>
        </div>


    </div>

</template>


<script>
    import Pagination from "../../components/Pagination";
    export default {
        name: "new_order",
        data() {
            return {

                bills: [],

                amount: '',

                currentPage: 1,

                IncreaseBalance: false,

                isProgressActive: false,

                isHiddenError: true,
                Error: '',
            }
        },
        computed: {

            pages() {
                return this.chunk(this.bills, 5);
            },
            pagesLength() {
                return this.pages.length;
            },

        },

        components: {
            Pagination
        },

        methods: {

            chunk: function (array, size) {
                if (!array) return [];
                const firstChunk = array.slice(0, size);
                if (!firstChunk.length) {
                    return array;
                }
                return [firstChunk].concat(this.chunk(array.slice(size, array.length), size));
            },

            LeadToPay: function () {

                this.isHiddenError = true;

                if (!this.amount || parseInt(this.amount) < 1000) {
                    this.Error = 'مبلغ وارد شده کمتر از حد مجاز (۱۰۰۰ ریال) است';
                    this.isHiddenError = false;

                } else {

                    const url = this.$ApiBaseUrl + "/api/v5/user/addToCredit?token=" + this.$TOKEN + "&amount=" + this.amount + "&OS=web-app";
                    window.open(url, "_self")
                }
            },


            toMoneyFormat: function (number) {
                // return new Intl.NumberFormat('fa', {maximumSignificantDigits: 3}).format(number)

                const formatter = new Intl.NumberFormat('fa-IR', {
                    style: 'currency',
                    currency: 'IRR',
                    minimumFractionDigits: 0
                });

                return formatter.format(number).replace("ریال", '');
            }
        },
        beforeMount: function () {
            this.bills = this.$userData.credits_user;

            if (Array.isArray(this.bills) && this.bills.length) {
                this.bills.sort(function (a, b) {
                    return b.id - a.id;
                });
            }
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
        font-size: 1.75rem;
    }

    .field-cash-info {
        font-size: 1.3rem;
    }

    @media (max-width: 576px) {
        .balance-card {
            font-size: 1.2rem;
        }

        .field-cash-info {
            font-size: 1rem;
        }

    }

    @media (min-width: 576px) and (max-width: 992px) {
        .balance-card {
            font-size: 1.3rem;
        }

        .field-cash-info {
            font-size: 1.1rem;
        }

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