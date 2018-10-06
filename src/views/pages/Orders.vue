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
                                    <div id="order_info_modal_factor_status" class="col-7 text-left"></div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-5">هزینه سفارش :</div>
                                    <div id="order_info_modal_missionary" class="col-7 text-left"></div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-5">مبلغ مورد نیاز :</div>
                                    <div id="order_info_modal_to_pay" class="col-7 text-left"></div>
                                </div>
                                <div class="row d-flex justify-content-center mt-3">
                                    <button class="btn btn-success" id="order_info_modal_payButton"></button>
                                </div>
                            </div>
                        </div>

                        <table id="order_info_modal_table"
                               class="table table-borderless table-hover align-self-center mt-4" dir="rtl">
                            <thead>
                            <tr class="bg-dark text-white">
                                <th>#</th>
                                <th>نام</th>
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
                this.$nextTick(function () {

                    $('#order_info_modal_Title').text('سفارش شماره ' + order['number_order']);

                    $('#order_info_modal_pickup').text(order['date_pickup_user'] + " ساعت " +
                        order['time_pickup_user'].split(':')[0] + "تا" +
                        order['time_pickup_user'].split(':')[1]);

                    $('#order_info_modal_delivery').text(order['date_delivery_user'] + " ساعت " +
                        order['time_delivery_user'].split(':')[0] + "تا" +
                        order['time_delivery_user'].split(':')[1]);

                    $('#order_info_modal_factor_status').text(order['factor_payment_status']);


                    const order_info_modal_missionary = $('#order_info_modal_missionary');
                    const order_info_modal_to_pay = $('#order_info_modal_to_pay');
                    const order_info_modal_payButton = $('#order_info_modal_payButton');
                    if (order['factor_missionary']) {
                        order_info_modal_missionary.parent().show();
                        order_info_modal_missionary.text(this.toMoneyFormat(order['factor_missionary']));

                        if (order['remaining_amount']) {
                            order_info_modal_to_pay.parent().show();
                            order_info_modal_payButton.show();
                            order_info_modal_to_pay.text(this.toMoneyFormat(order['remaining_amount']));
                            order_info_modal_payButton.text(
                                this.toMoneyFormat(order['remaining_amount'])
                                + ' افزایش اعتبار و پرداخت فاکتور'
                            );
                        }
                    } else {
                        order_info_modal_missionary.parent().hide();
                        order_info_modal_to_pay.parent().hide();
                        order_info_modal_payButton.hide();
                    }

                    if (order['factors']) {
                        $('#order_info_modal_table').show();
                        this.factors = order['factors'];
                    } else {
                        $('#order_info_modal_table').hide();
                    }

                    $('#order_info_modal').modal('show');
                });
            },


            toMoneyFormat: function (number) {
                return new Intl.NumberFormat('fa', {maximumSignificantDigits: 3}).format(number)
            }
        },
        beforeMount: function () {

            this.orders = this.$userData['orders'];


        }
    }
</script>


<style scoped>

    *:focus {
        outline: 0;
    }

    .card-hover-blue {
        -o-transition:.3s;
        -ms-transition:.3s;
        -moz-transition:.3s;
        -webkit-transition:.3s;
        transition:.3s;
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