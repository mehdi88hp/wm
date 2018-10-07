<template>

    <div class="container">
        <div v-if="!orders.length" class="row h-100 d-flex justify-content-center">
            <div class="col-md-8 text-center align-self-center">
                <h1>شما تاکنون هیچ سفارشی ثبت نکرده اید</h1>
                <button v-on:click="$router.push({ path: '/dashboard/new-order' })" class="btn btn-info btn-lg mt-5">
                    <span>ثبت سفارش جدید</span>&nbsp;&nbsp;<i class="fas fa-plus"></i></button>
            </div>

        </div>

        <div v-if="orders.length" class="row h-100 mt-5" dir="rtl">

            <div class="col-lg-6 p-2" v-for="(order, index) in orders" v-bind:key="index">
                <div class="card shadow shadow-sm card-hover-blue"
                     @click='HandleModal(order)'>
                    <div class="card-body">
                        <div class="clearfix">
                            <div class="h5 float-right">سفارش شماره {{ order['number_order'] }}</div>
                            <div class="col-6 float-left text-left">{{ order['order_status'] }}</div>
                        </div>
                        <div class="container mt-2">
                            <div class="row">
                                <div class="col-3">دریافت :</div>
                                <div class="col-9 text-center">{{ order['date_pickup_user'] + " ساعت " +
                                    order['time_pickup_user'].split(':')[0] + "تا" +
                                    order['time_pickup_user'].split(':')[1] }}
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-3">تحویل :</div>
                                <div class="col-9 text-center">{{ order['date_delivery_user'] + " ساعت " +
                                    order['time_delivery_user'].split(':')[0] + "تا" +
                                    order['time_delivery_user'].split(':')[1] }}
                                </div>
                            </div>
                        </div>
                        <div class="col-12"></div>
                    </div>
                </div>
            </div>

        </div>

        <!-- Modal -->
        <div class="modal fade" id="order_info_modal" tabindex="-1" role="dialog"
             aria-labelledby="order_info_modal_Title" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close col-1" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title col-11 text-right" id="order_info_modal_Title">Modal title</h5>
                    </div>
                    <div class="modal-body">


                        <div class="card border border-dark">
                            <div class="card-body" dir="rtl">
                                <div class="row">
                                    <div class="col-3">دریافت :</div>
                                    <div id="order_info_modal_pickup" class="col-9 text-left"></div>
                                </div>

                                <div class="row">
                                    <div class="col-3">تحویل :</div>
                                    <div id="order_info_modal_delivery" class="col-9 text-left"></div>
                                </div>
                            </div>
                        </div>

                        <div class="card border border-dark mt-3">
                            <div class="card-body" dir="rtl">
                                <div class="row">
                                    <div class="col-5">وضعیت فاکتور :</div>
                                    <div id="order_info_modal_factor_status" class="col-7 text-left">{{ factor_payment_status }}</div>
                                </div>
                                <div v-if="order_missionary" class="row mt-2">
                                    <div class="col-5">هزینه سفارش :</div>
                                    <div id="order_info_modal_missionary" class="col-7 text-left">{{ toMoneyFormat(order_missionary) }}</div>
                                </div>
                                <div v-if="order_missionary && to_pay" class="row mt-2">
                                    <div class="col-5">مبلغ مورد نیاز :</div>
                                    <div id="order_info_modal_to_pay" class="col-7 text-left">{{ toMoneyFormat(to_pay) }}</div>
                                </div>
                                <div v-if="order_missionary && to_pay" class="row d-flex justify-content-center mt-3">
                                    <button class="btn btn-success" id="order_info_modal_payButton">{{ payButtonText }}</button>
                                </div>
                            </div>
                        </div>


                        <div v-if="factors.length" class="row mt-5">
                            <!--<h5 class="col-12 text-center">فاکتورها</h5>-->

                            <table id="order_info_modal_table"
                                   class="table table-borderless table-hover align-self-center mt-2" dir="rtl">
                                <thead>
                                <tr class="bg-dark text-white">
                                    <th>#</th>
                                    <th>عنوان</th>
                                    <th>دسته بندی</th>
                                    <th>هزینه واحد (ریال)</th>
                                    <th>تعداد</th>
                                    <th>قیمت کل (ریال)</th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr v-for="(factor, index) in factors" v-bind:key="index">
                                    <td>{{ index+1 }}</td>
                                    <td>{{ factor['title'] }}</td>
                                    <td>{{ factor['service'] }}</td>
                                    <td>{{ factor['price'] }}</td>
                                    <td>{{ factor['number'] }}</td>
                                    <td>{{ factor['total'] }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer" dir="rtl">
                        <button type="button" class="btn btn-secondary btn-danger" data-dismiss="modal">بستن</button>
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
                data: [],
                orders: [],
                factors: [],

                order_number: '',
                modal_delivery: '',
                modal_pickup: '',
                factor_payment_status: '',
                order_missionary: '',
                to_pay: '',
                payButtonText: '',



            }
        },
        computed: {
            groupedOrders() {
                return this.chunk(this.orders, 2)
                // returns a nested array:
                // [[article, article, article], [article, article, article], ...]
            },
        },

        components: {
            // 'phoneForm': () => import('./phone.vue'),
            // 'codeForm': () => import('./code.vue')
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


            HandleModal: function (order) {

                this.factors = [];

                this.order_number = '';
                this.modal_delivery = '';
                this.modal_pickup = '';
                this.factor_payment_status = '';
                this.order_missionary = '';
                this.to_pay = '';
                this.payButtonText = '';

                this.order_number = 'سفارش شماره ' + order['number_order'];

                this.modal_pickup = order['date_pickup_user'] + " ساعت " +
                    order['time_pickup_user'].split(':')[0] + "تا" +
                    order['time_pickup_user'].split(':')[1];

                this.modal_delivery = order['date_delivery_user'] + " ساعت " +
                    order['time_delivery_user'].split(':')[0] + "تا" +
                    order['time_delivery_user'].split(':')[1];

                this.factor_payment_status = order['factor_payment_status'];

                this.order_missionary = order['factor_missionary'];

                this.to_pay = order['remaining_amount'];
                this.payButtonText = this.toMoneyFormat(order['remaining_amount'])
                    + ' افزایش اعتبار و پرداخت فاکتور';

                this.factors = order['factors'];

                this.$nextTick(function () {
                    $('#order_info_modal').modal('show');
                });
            },


            toMoneyFormat: function (number) {
                return new Intl.NumberFormat('fa', {maximumSignificantDigits: 3}).format(number)
            }
        },
        beforeMount: function () {

            this.orders = this.$userData['orders'].reverse();


        }
    }
</script>


<style scoped>

    *:focus {
        outline: 0;
    }

    .card-hover-blue {
        -o-transition: .3s;
        -ms-transition: .3s;
        -moz-transition: .3s;
        -webkit-transition: .3s;
        transition: .3s;
    }

    .card-hover-blue:hover {
        cursor: pointer;
        color: white;
        background-color: #92ccff;
    }

    /*.card-header:hover {*/
    /*cursor: pointer;*/
    /*transition: background .2s ease-in;*/
    /*background-color: rgba(158, 227, 248, 0.7);*/
    /*}*/

</style>