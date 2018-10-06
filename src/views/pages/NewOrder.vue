<template>

    <div class="container">
        <div class="row h-auto d-flex justify-content-center py-5">
            <div style="padding: 0;" class="card h-auto shadow shadow-sm col-12 col-lg-8 text-right">

                <div class="card-header">
                    <!-- level controller button box -->
                    <div class="row d-flex justify-content-between mx-1">


                        <transition name="fade" mode="out-in">
                            <div class="btn btn-outline-info d-flex justify-content-center align-items-center"
                                 :key="1"
                                 v-if="Stage !== 'final'"
                                 :class="{disabled : !isDeliveryTimeChosen || (!order_service_id && Stage === 'order_service')}"
                                 v-on:click="Next()">
                                <i class="fas fa-2x fa-backward"></i>&nbsp;<span>مرحله بعد</span>
                            </div>
                            <div class="btn btn-outline-success d-flex justify-content-center align-items-center"
                                 :key="2"
                                 v-if="Stage === 'final'"
                                 v-on:click="Next()">
                                <i class="fas fa-2x fa-backward"></i>&nbsp;<span>تایید نهایی سفارش</span>
                            </div>
                        </transition>

                        <transition name="fade" mode="out-in">
                            <div class="btn btn-outline-danger d-flex justify-content-center align-items-center"
                                 v-if="Stage !== 'setting'" v-on:click="Previous()">
                                <span>مرحله قبل</span>&nbsp;<i class="fas fa-2x fa-forward"></i>
                            </div>
                        </transition>

                    </div>
                </div>


                <div class="card-body">

                    <transition name="fade" mode="out-in">

                        <!-- main features of order -->
                        <div :key="1" v-if="Stage === 'setting'">
                            <div class="row">
                                <h1 class="col-12 text-right">تنظیمات سفارش</h1>
                                <p class="col-12 text-right text-justify mt-2">&emsp;مشخصات اولیه سفارش خود را وارد کنید. سپس برروی «مرحله بعد» کلیک کنید&emsp;</p>
                            </div>

                            <hr class="mb-3 mt-2"/>


                            <!-- choose address -->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="input-group mb-3">
                                        <select v-on:change="getRegion()" v-model="address_id" dir="rtl"
                                                class="custom-select text-right"
                                                id="inputAddress">
                                            <option value="-1" selected disabled hidden>انتخاب کنید ...</option>
                                            <option v-for="(address, key) in $userData.addresses"
                                                    v-bind:key="key"
                                                    v-bind:value="address.id"
                                            >{{ address.city + ' - ' + address.neighbourhood + ' - ' + address.address }}
                                            </option>
                                        </select>
                                        <div class="input-group-append">
                                            <label class="input-group-text bg-info text-white" for="inputAddress">
                                                &nbsp;آدرس&nbsp;<i class="fas fa-map-marker-alt"></i>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <transition name="fade" mode="out-in">
                                <div class="row">
                                    <div class="col-12">
                                        <div v-if="isProgressActive" class="progress mb-3">
                                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-info"
                                                 role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                                 aria-valuemax="100"
                                                 style="width: 100%"></div>
                                        </div>
                                    </div>
                                </div>
                            </transition>


                            <!-- choose pick up day and time -->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="input-group mb-3">
                                        <select v-on:change="selectPickupDate()" v-model="pickup_date" dir="rtl"
                                                class="custom-select text-right"
                                                id="pickup_time"
                                                :disabled="!isAddressChosen">
                                            <option value="-1" selected disabled hidden>انتخاب کنید ...</option>
                                            <option v-for="(date, key) in pickup_dates"
                                                    v-bind:key="key"
                                                    v-bind:value="date">
                                                {{ date.date_pickup }}
                                            </option>
                                        </select>
                                        <div class="input-group-append">
                                            <label class="input-group-text bg-danger text-white" for="pickup_time">
                                                &nbsp;روز دریافت&nbsp;<i class="far fa-calendar-alt"></i>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="input-group mb-3">
                                        <select v-on:change="selectPickupTime" v-model="pickup_time" dir="rtl"
                                                class="custom-select text-right" id="pickup_date"
                                                :disabled="!(isAddressChosen && isPickupDateChosen)">
                                            <option value="-1" selected disabled hidden>انتخاب کنید ...</option>
                                            <option v-for="(time, key) in pickup_times" v-bind:key="key"
                                                    v-bind:value="time">
                                                {{ "ساعت " + time.time.split(' : ')[0] + " تا " + time.time.split(' : ')[1] }}
                                            </option>
                                        </select>
                                        <div class="input-group-append">
                                            <label class="input-group-text bg-danger text-white" for="pickup_date">
                                                &nbsp; ساعت دریافت&nbsp;<i class="fas fa-clock"></i>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <!-- choose pick up day and time -->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="input-group mb-3">
                                        <select v-on:change="selectDeliveryDate()" v-model="delivery_date" dir="rtl"
                                                class="custom-select text-right" id="delivery_time"
                                                :disabled="!(isAddressChosen && isPickupDateChosen && isPickupTimeChosen)">
                                            <option value="-1" selected disabled hidden>انتخاب کنید ...</option>
                                            <option v-for="(date, key) in delivery_dates"
                                                    v-bind:key="key"
                                                    v-bind:value="date">
                                                {{ date.date }}
                                            </option>
                                        </select>
                                        <div class="input-group-append">
                                            <label class="input-group-text bg-success text-white" for="delivery_time">
                                                &nbsp;روز تحویل&nbsp;<i class="far fa-calendar-alt"></i>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="input-group mb-3">
                                        <select v-on:change="selectDeliveryTime()" v-model="delivery_time" dir="rtl" class="custom-select text-right"
                                                id="delivery_date"
                                                :disabled="!(isAddressChosen && isPickupDateChosen && isPickupTimeChosen && isDeliveryDateChosen)">
                                            <option value="-1" selected disabled hidden>انتخاب کنید ...</option>
                                            <option v-for="(time, key) in delivery_times" v-bind:key="key"
                                                    v-bind:value="time">
                                                {{ "ساعت " + time.split(' : ')[0] + " تا " + time.split(' : ')[1] }}
                                            </option>
                                        </select>
                                        <div class="input-group-append">
                                            <label class="input-group-text bg-success text-white" for="delivery_date">
                                                &nbsp; ساعت تحویل&nbsp;<i class="fas fa-clock"></i>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div :key="2" v-if="Stage !== 'setting'">

                            <transition name="fade" mode="out-in">

                                <!-- choosing order service -->
                                <div :key="1" v-if="Stage === 'order_service'">

                                    <div class="row">
                                        <h1 class="col-12 text-right">نوع سرویس سفارش</h1>
                                        <p class="col-12 text-right text-justify mt-2">&emsp;از لیست زیر نوع سرویس سفارش خود را وارد کنید. سپس برروی «مرحله بعد» کلیک کنید&emsp;</p>
                                    </div>

                                    <hr class="mb-3 mt-2"/>


                                    <div v-ripple v-for="(order_service_row, key) in $userData.order_services"
                                         :id="'order_service_row'+key"
                                         class="card col-12 border border-info mb-3"
                                         :class="{'card-order-service' : order_service_id !== order_service_row.id, 'card-order-service-clicked' : order_service_id === order_service_row.id}"
                                         :key="key"
                                         v-on:click="selectOrderService('order_service_row'+key)" :data-id="order_service_row.id" order_service_el>
                                        <div class="card-body text-right">

                                            <div class="row">
                                                <div class="col-4">
                                                    <p class="card-text col-12" v-if="order_service_row.fixed_price"><span>هزینه ثابت :‌ </span>&emsp;<span>{{ order_service_row.fixed_price }}</span>
                                                    </p>
                                                    <p class="card-text col-12" v-if="order_service_row.variable_price">
                                                        <span>هزینه متغیر :‌ </span>&emsp;<span>{{ order_service_row.variable_price }}</span>
                                                    </p>
                                                </div>
                                                <div class="col-6">
                                                    <h5 class="card-title">{{ order_service_row.title }}</h5>
                                                    <p class="card-text">{{ order_service_row.description }}</p>
                                                </div>
                                                <div class="col-2 p-0">
                                                    <img :src="order_service_row.icon"
                                                         class="img-fluid m-0"
                                                         alt="user pic"
                                                         id="userPic_img"
                                                         height="100%"
                                                         width="100%">
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div :key="2" v-if="Stage !== 'order_service'">

                                    <transition name="fade" mode="out-in">

                                        <!-- choosing extra option -->
                                        <div :key="1" v-if="Stage === 'extra_option'">
                                            <div class="row">
                                                <h1 class="col-12 text-right">گزینه های اضافی سفارش</h1>
                                                <p class="col-12 text-right text-justify mt-2">&emsp;محصولات مورد نظر و تعداد آن ها را تعیین کنید. سپس برروی «مرحله بعد» کلیک کنید&emsp;</p>
                                            </div>

                                            <hr class="mb-3 mt-2"/>

                                            <div class="row mb-4">
                                                <div v-for="(extra_option_row, key) in getOrderExtraOptions($userData.order_extra_options)"
                                                     :key="key" class="col-lg-6 text-right">
                                                    <div style="padding: 0;" class="card card-extra-option col-12 mb-4">
                                                        <img width="100%" height="100%"
                                                             class="card-img-top"
                                                             :src="extra_option_row.logo"
                                                             :alt="extra_option_row.title">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <h5 class="card-title col-6 text-left">
                                                                    {{ extra_option_row.price }}
                                                                </h5>
                                                                <h5 class="card-title col-6">
                                                                    {{ extra_option_row.title }}
                                                                </h5>

                                                            </div>
                                                            <p class="card-text text-justify">
                                                                {{ extra_option_row.description }}
                                                            </p>

                                                            <div class="row">
                                                                <div class="col-6 d-flex justify-content-start">
                                                                    <i class="fas fa-minus m-2"
                                                                       v-on:click="Minus(extra_option_row.id)"></i>
                                                                    <i class="fas fa-plus m-2"
                                                                       v-on:click="Plus(extra_option_row.id)"></i>
                                                                </div>
                                                                <div class="col-6">
                                                                    <div class="col-12 m-2">
                                                                        <span>تعداد : </span>
                                                                        &nbsp;
                                                                        <span :id="'count_extra_option_'+extra_option_row.id">{{ extra_options[extra_option_row.id] }}</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div :key="2" v-if="Stage !== 'extra_option'">


                                            <div class="row">
                                                <h1 class="col-12 text-right">تایید مشخصات سفارش</h1>
                                                <p class="col-12 text-right text-justify mt-2">&emsp;مشخصات سفارش را با دقت بررسی کرده و سپس برروی تایید نهایی سفارش کلیک کنید&emsp;</p>
                                            </div>

                                            <!-- final approvement -->
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-12 border border-info rounded p-3">
                                                        <div class="row mb-3">
                                                            <div class="col-md-9 text-left">a</div>
                                                            <div class="col-md-3 text-right">آدرس دریافت</div>
                                                        </div>

                                                        <div class="row mb-3">
                                                            <div class="col-md-6 text-left">a</div>
                                                            <div class="col-md-6 text-right">تاریخ و ساعت دریافت</div>
                                                        </div>

                                                        <div class="row mb-3">
                                                            <div class="col-md-6 text-left">a</div>
                                                            <div class="col-md-6 text-right">تاریخ و ساعت تحویل</div>
                                                        </div>

                                                        <div class="row">
                                                            <div class="col-md-6 text-left">a</div>
                                                            <div class="col-md-6 text-right">نوع سرویس سفارش</div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div v-if="getOrderExtraOption().length" class="row mt-3">

                                                    <div class="col-12 d-flex justify-content-center">
                                                        <h3>آیتم های اضافی</h3>
                                                    </div>

                                                    <table id="order_info_modal_table"
                                                           class="table table-borderless table-hover align-self-center mt-4"
                                                           dir="rtl">
                                                        <thead>
                                                        <tr class="bg-dark text-white">
                                                            <th>#</th>
                                                            <th>عنوان</th>
                                                            <th>هزینه واحد (ریال)</th>
                                                            <th>تعداد</th>
                                                            <th>قیمت کل (ریال)</th>
                                                        </tr>
                                                        </thead>

                                                        <tbody>
                                                        <tr v-for="(option, index) in getOrderExtraOption()"
                                                            v-bind:key="index">
                                                            <td>{{ index+1 }}</td>
                                                            <td>{{ getOptionbyId(getKeyByValue(getOrderExtraOption(), option)).title }}</td>
                                                            <td>{{ getOptionbyId(getKeyByValue(getOrderExtraOption(), option)).price }}</td>
                                                            <td>{{ option }}</td>
                                                            <td>{{ 'xxx' }}</td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>


                                        </div>

                                    </transition>

                                </div>

                            </transition>

                        </div>

                    </transition>

                </div>

            </div>
        </div>


        <!-- the modal -->
        <div class="modal" id="not_image_modal" tabindex="-1" role="dialog" dir="rtl">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title w-100 text-right">خطا</h5>
                        <button type="button" class="close flex-shrink-1" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="d-block text-center">
                            <h5>فایل انتخاب شده تصویر نیست</h5>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">متوجه شدم</button>
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
                // Stage: 'final',
                Stage: 'setting',

                isAddressChosen: false,
                isPickupDateChosen: false,
                isPickupTimeChosen: false,
                isDeliveryDateChosen: false,
                isDeliveryTimeChosen: false,

                order_service_id: '',

                pickup_dates: [],
                pickup_times: [],

                delivery_dates: [],
                delivery_times: [],

                address_id: '-1',
                pickup_date: '-1',
                pickup_time: '-1',
                delivery_date: '-1',
                delivery_time: '-1',

                extra_options: [],

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

            getRegion: function () {
                this.$nextTick(function () {
                    if (parseInt(this.address_id) === -1) {
                        this.isAddressChosen = false;
                        this.pickup_date = '-1';
                        this.pickup_time = '-1';
                        this.delivery_date = '-1';
                        this.delivery_time = '-1';
                    } else {

                        this.isProgressActive = true;

                        let formData = new FormData();

                        formData.append('token', this.$TOKEN);
                        formData.append('id', this.address_id);

                        this.$API.post(
                            '/api/v5/user/getRegionById', formData,
                            {
                                headers: {
                                    'Accept': 'application/json',
                                }
                            })
                            .then(
                                (response) => {
                                    this.isProgressActive = false;

                                    if (parseInt(response.data.code) === 1) {
                                        this.pickup_dates = response.data.datas;
                                        this.isAddressChosen = true;
                                    } else {
                                        this.Error = "آدرس نامعتبر است";
                                        this.isHiddenError = false;
                                        this.pickup_date = '-1';
                                        this.pickup_time = '-1';
                                        this.delivery_date = '-1';
                                        this.delivery_time = '-1';
                                    }
                                }, (error) => {
                                    this.isProgressActive = true;
                                    console.log(error)
                                }
                            );

                    }

                });

            },


            selectPickupDate: function () {
                if (parseInt(this.pickup_date) === -1) {
                    this.isPickupDateChosen = false;
                    this.pickup_time = '-1';
                    this.delivery_date = '-1';
                    this.delivery_time = '-1';
                } else {
                    this.pickup_times = this.pickup_date.time_pickup;
                    this.isPickupDateChosen = true;
                }

            },

            selectPickupTime: function () {
                if (parseInt(this.pickup_time) === -1) {
                    this.isPickupTimeChosen = false;
                    this.delivery_date = '-1';
                    this.delivery_time = '-1';
                } else {
                    this.delivery_dates = this.pickup_time.delivery;
                    this.isPickupTimeChosen = true;
                }

            },

            selectDeliveryDate: function () {
                if (parseInt(this.delivery_date) === -1) {
                    this.isDeliveryDateChosen = false;
                    this.delivery_time = '-1';
                } else {
                    this.delivery_times = this.delivery_date.time;
                    this.isDeliveryDateChosen = true;
                }

            },

            selectDeliveryTime: function () {
                this.isDeliveryTimeChosen = parseInt(this.delivery_time) !== -1;

            },

            Next: function () {
                if (this.Stage === 'setting') {
                    this.Stage = 'order_service';
                } else if (this.Stage === 'order_service') {
                    this.Stage = 'extra_option';
                } else if (this.Stage === 'extra_option') {
                    this.Stage = 'final';
                }

            },



            Previous: function () {
                if (this.Stage === 'order_service') {
                    this.Stage = 'setting';
                } else if (this.Stage === 'extra_option') {
                    this.Stage = 'order_service';
                } else if (this.Stage === 'final') {
                    this.Stage = 'extra_option';
                }

            },


            selectOrderService: function (id) {
                this.$nextTick(function () {

                    $('div[order_service_el]').each(function () {
                        $(this).removeClass('card-order-service-clicked');
                        $(this).addClass('card-order-service');
                    });

                    const order_service_row = $('#'+id);
                    order_service_row.removeClass('card-order-service');
                    order_service_row.addClass('card-order-service-clicked');

                    this.order_service_id = order_service_row.data('id');
                });

            },

            getOrderExtraOptions: function (options) {

                if (!this.extra_options.length) {
                    const THIS = this;
                    options.forEach(function (option) {
                        THIS.extra_options[option.id] = 0;
                    });
                }
                return options;
            },

            Plus: function (key) {
                this.extra_options[key] += 1;
                $('#count_extra_option_'+key).text(this.extra_options[key]);
            },

            Minus: function (key) {
                if (this.extra_options[key] > 0) {
                    this.extra_options[key] -= 1;
                }
                $('#count_extra_option_'+key).text(this.extra_options[key]);
            },

            getKeyByValue: function(object, value) {
                return Object.keys(object).find(key => object[key] === value);
            },

            getOptionbyId: function (id) {
                return this.$userData.order_extra_options.filter(function (option) {
                    return option.id === id;
                })
            },

            Change: function () {
                this.isHiddenError = true;
                this.Error = '';
            },

            SendData: function () {

                this.isHiddenError = true;
                this.Error = '';
            },

            getOrderExtraOption: function () {
                return this.extra_options.filter(function(option) { return option !== 0; });
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

    .disabled {
        pointer-events: none;
        cursor: default;
    }


    .card-order-service {
        color: #138496;
        background-color: #ffffff;
        -o-transition:.5s;
        -ms-transition:.5s;
        -moz-transition:.5s;
        -webkit-transition:.5s;
        transition:.5s;
    }

    .card-order-service:hover {
        cursor: pointer;
        color: #ffffff;
        background-color: #138496;
    }

    .card-order-service-clicked {
        color: #ffffff;
        background-color: #138496;
    }

    .card-order-service-clicked:hover {
        cursor: pointer;
    }

    hr {
        border-top: 1px solid #17a2b8;
    }


    .card-extra-option {
        color: #b21f2d;
        background-color: #ffffff;
        -o-transition:.5s;
        -ms-transition:.5s;
        -moz-transition:.5s;
        -webkit-transition:.5s;
        transition:.5s;
    }

    .card-extra-option:hover {
        color: #ffffff;
        background-color: #b21f2d;
    }

    .fa-plus {
        cursor: pointer;
    }

    .fa-minus {
       cursor: pointer;
    }


</style>