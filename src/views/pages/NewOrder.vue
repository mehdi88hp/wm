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
                                 :class="{disabled : !isDeliveryTimeChosen || (!order_service && Stage === 'order_service' && orderServiceAllowed)}"
                                 v-on:click="Next()">
                                <i class="fas fa-2x fa-backward"></i>&nbsp;<span>مرحله بعد</span>
                            </div>
                            <div class="btn btn-outline-success d-flex justify-content-center align-items-center"
                                 :key="2"
                                 :class="{disabled : isProgressActive}"
                                 v-if="Stage === 'final'"
                                 v-on:click="ConfirmOrder()">
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
                                        <select v-on:change="getRegion()" v-model="address" dir="rtl"
                                                class="custom-select text-right"
                                                id="inputAddress">
                                            <option value="-1" selected disabled hidden>انتخاب کنید ...</option>
                                            <option v-for="(address, key) in $userData.addresses"
                                                    v-bind:key="key"
                                                    v-bind:value="address"
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
                                                {{ show_time(time.time) }}
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
                                                {{ show_time(time) }}
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


                            <hr class="my-3"/>

                            <!-- check coupon -->
                            <div class="row">
                                <div class="col-md-2">
                                    <button class="col-12 btn btn-outline-info"
                                            :class="{disabled: !coupon}" @click="checkCoupon()">
                                        ثبت
                                    </button>
                                </div>
                                <div class="col-md-10">
                                    <div class="input-group">
                                        <input type="text" class="form-control text-center"
                                               placeholder="کد تخفیف خود را وارد کنید"
                                               aria-label="کد تخفیف خود را وارد کنید"
                                               aria-describedby="coupon-label"
                                               @input="isHiddenErrorCoupon = true"
                                        v-model="coupon">
                                        <div class="input-group-append">
                                            <span class="input-group-text bg-dark text-white"
                                                  id="coupon-label">کد تخفیف</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <transition name="fade" mode="out-in">
                                <div v-if="isProgressActiveCoupon"  class="row">
                                    <div class="col-12">
                                        <div class="progress mb-2">
                                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-info"
                                                 role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                                 aria-valuemax="100"
                                                 style="width: 100%"></div>
                                        </div>
                                    </div>
                                </div>
                            </transition>

                            <transition name="fade" mode="out-in">
                                <div class="alert small text-right text-justify mt-2"
                                     :class="{'alert-danger': !hasValidCoupon, 'alert-success': hasValidCoupon}"
                                     v-if="!isHiddenErrorCoupon" dir="rtl">
                                    {{ ErrorCoupon }}
                                </div>
                            </transition>



                            <hr class="my-3"/>

                            <!-- write description -->
                            <div class="input-group">
                                <textarea style="min-height: 50pt;" class="form-control text-right"
                                          aria-label="توضیحات اضافی" v-model="description"></textarea>
                                <div style="min-height: 50pt;" class="input-group-append">
                                    <span class="input-group-text bg-secondary text-white">توضیحات اضافی</span>
                                </div>
                            </div>


                        </div>
                        <div :key="2" v-if="Stage !== 'setting'">

                            <transition name="fade" mode="out-in">

                                <!-- choosing order service -->
                                <div :key="1" v-if="Stage === 'order_service' && orderServiceAllowed">

                                    <div class="row">
                                        <h1 class="col-12 text-right">نوع سرویس سفارش</h1>
                                        <p class="col-12 text-right text-justify mt-2">&emsp;از لیست زیر نوع سرویس سفارش خود را وارد کنید. سپس برروی «مرحله بعد» کلیک کنید&emsp;</p>
                                    </div>

                                    <hr class="mb-3 mt-2"/>


                                    <div v-ripple v-for="(order_service_row, key) in $userData.order_services"
                                         :id="'order_service_row'+key"
                                         class="card col-12 border border-info mb-3"
                                         :class="{'card-order-service' : order_service !== order_service_row, 'card-order-service-clicked' : order_service === order_service_row}"
                                         :key="key"
                                         v-on:click="selectOrderService('order_service_row'+key, order_service_row)" order_service_el>

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
                                <div :key="2" v-if="Stage !== 'order_service' || !orderServiceAllowed">

                                    <transition name="fade" mode="out-in">

                                        <!-- choosing extra option -->
                                        <div :key="1" v-if="Stage === 'extra_option' && extraOptionsAllowed">
                                            <div class="row">
                                                <h1 class="col-12 text-right">گزینه های اضافی سفارش</h1>
                                                <p class="col-12 text-right text-justify mt-2">&emsp;محصولات مورد نظر و تعداد آن ها را تعیین کنید. سپس برروی «مرحله بعد» کلیک کنید&emsp;</p>
                                            </div>

                                            <hr class="mb-3 mt-2"/>

                                            <div class="row mb-4">
                                                <div v-for="(extra_option_row, key) in getOrderExtraOptions()"
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
                                                                       v-on:click="Minus(key)"></i>
                                                                    <i class="fas fa-plus m-2"
                                                                       v-on:click="Plus(key)"></i>
                                                                </div>
                                                                <div class="col-6">
                                                                    <div class="col-12 m-2">
                                                                        <span>تعداد : </span>
                                                                        &nbsp;
                                                                        <span :id="'count_extra_option_'+key">{{ extra_options[key].count }}</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <!-- final approvement -->
                                        <div :key="2" v-if="Stage !== 'extra_option' || extraOptionsAllowed">

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

                                            <transition name="fade" mode="out-in">
                                                <div class="alert alert-danger small text-right like-pre"
                                                     v-if="!isHiddenError" dir="rtl">{{ Error }}
                                                </div>
                                            </transition>

                                            <div class="row">
                                                <h1 class="col-12 text-right">تایید مشخصات سفارش</h1>
                                                <p class="col-12 text-right text-justify mt-2">&emsp;مشخصات سفارش را با دقت بررسی کرده و سپس برروی تایید نهایی سفارش کلیک کنید&emsp;</p>
                                            </div>

                                            <hr class="mb-3 mt-2"/>

                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-12 border border-info rounded p-3">
                                                        <div class="row mb-3">
                                                            <div class="col-md-9 text-right">
                                                                {{ address.city + ' - ' + address.neighbourhood + ' - ' + address.address }}
                                                            </div>
                                                            <div class="col-md-3 text-right">آدرس دریافت</div>
                                                        </div>

                                                        <div class="row mb-3">
                                                            <div class="col-md-6 text-left">
                                                                {{ pickup_date.date_pickup + ' | ' + show_time(pickup_time.time) }}
                                                            </div>
                                                            <div class="col-md-6 text-right">تاریخ و ساعت دریافت</div>
                                                        </div>

                                                        <div class="row mb-3">
                                                            <div class="col-md-6 text-left">{{ delivery_date.date + ' | ' + show_time(delivery_time) }}</div>
                                                            <div class="col-md-6 text-right">تاریخ و ساعت تحویل</div>
                                                        </div>

                                                        <div v-if="orderServiceAllowed" class="row mb-3">
                                                            <div class="col-md-6 text-left">{{ order_service.title }}</div>
                                                            <div class="col-md-6 text-right">نوع سرویس سفارش</div>
                                                        </div>

                                                        <div v-if="couponCode" class="row">
                                                            <div class="col-md-6 text-left">{{ couponCode }}</div>
                                                            <div class="col-md-6 text-right">کد تخفیف ثبت شده</div>
                                                        </div>


                                                        <div v-if="description" class="row d-flex justify-content-center">
                                                            <div class="col-11 border border-dark rounded my-3 p-3">
                                                                <div class="row">
                                                                    <div class="col-md-6 text-right">{{ description }}
                                                                    </div>
                                                                    <div class="col-md-6 text-right">توضیحات سفارش</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div v-if="getOrderExtraOption().length && extraOptionsAllowed" class="row mt-4">

                                                    <div class="col-12 d-flex justify-content-center">
                                                        <h3>آیتم های اضافی</h3>
                                                    </div>

                                                    <table id="order_info_modal_table"
                                                           class="table table-borderless table-hover align-self-center mt-2"
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
                                                            <td>{{ option.title }}</td>
                                                            <td>{{ option.price }}</td>
                                                            <td>{{ option.count }}</td>
                                                            <td>{{ option.count * option.price }}</td>
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
                // Stage: 'final',
                Stage: 'setting',

                orderServiceAllowed: false,
                extraOptionsAllowed: false,

                isAddressChosen: false,
                isPickupDateChosen: false,
                isPickupTimeChosen: false,
                isDeliveryDateChosen: false,
                isDeliveryTimeChosen: false,

                order_service: '',

                pickup_dates: [],
                pickup_times: [],

                delivery_dates: [],
                delivery_times: [],

                address: '-1',
                pickup_date: '-1',
                pickup_time: '-1',
                delivery_date: '-1',
                delivery_time: '-1',

                hasValidCoupon: false,
                coupon: '',
                couponCode: '',

                description: '',

                extra_options: [],

                isProgressActive: false,
                isProgressActiveCoupon: false,

                isHiddenError: true,
                Error: '',

                isHiddenErrorCoupon: true,
                ErrorCoupon: '',
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

            checkCoupon: function () {

                this.isProgressActiveCoupon = true;

                let formData = new FormData();

                formData.append('token', this.$TOKEN);
                formData.append('coupon', this.coupon);

                this.$API.post(
                    '/api/v5/user/checkCoupon', formData,
                    {
                        headers: {
                            'Accept': 'application/json',
                        }
                    })
                    .then(
                        (response) => {
                            this.isProgressActiveCoupon = false;

                            if (parseInt(response.data.code) === 1) {
                                this.couponCode = this.coupon;
                                this.hasValidCoupon = true;

                                this.isHiddenErrorCoupon = false;
                                this.ErrorCoupon = 'کد تخفیف معتبر است و با موفقیت ثبت شد';
                            } else {
                                this.hasValidCoupon = false;
                                this.isHiddenErrorCoupon = false;
                                this.ErrorCoupon = response.data.msg;
                            }
                        }, (error) => {
                            this.hasValidCoupon = false;
                            this.isProgressActiveCoupon = true;
                            console.log(error)
                        }
                    );

            },

            getRegion: function () {
                this.$nextTick(function () {

                    this.pickup_date = '-1';
                    this.pickup_time = '-1';
                    this.delivery_date = '-1';
                    this.delivery_time = '-1';

                    this.isAddressChosen = false;
                    this.isPickupDateChosen = false;
                    this.isPickupTimeChosen = false;
                    this.isDeliveryDateChosen = false;
                    this.isDeliveryTimeChosen = false;

                    this.isProgressActive = true;

                    let formData = new FormData();

                    formData.append('token', this.$TOKEN);
                    formData.append('id', this.address.id);

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

                                    this.isAddressChosen = false;
                                    this.isPickupDateChosen = false;
                                    this.isPickupTimeChosen = false;
                                    this.isDeliveryDateChosen = false;
                                    this.isDeliveryTimeChosen = false;
                                }
                            }, (error) => {
                                this.isProgressActive = true;
                                console.log(error)
                            }
                        );


                });

            },


            selectPickupDate: function () {

                this.pickup_time = '-1';
                this.delivery_date = '-1';
                this.delivery_time = '-1';

                this.isPickupDateChosen = false;
                this.isPickupTimeChosen = false;
                this.isDeliveryDateChosen = false;
                this.isDeliveryTimeChosen = false;

                this.pickup_times = this.pickup_date.time_pickup;
                this.isPickupDateChosen = true;

            },

            selectPickupTime: function () {

                this.delivery_date = '-1';
                this.delivery_time = '-1';

                this.isPickupTimeChosen = false;
                this.isDeliveryDateChosen = false;
                this.isDeliveryTimeChosen = false;

                this.delivery_dates = this.pickup_time.delivery;
                this.isPickupTimeChosen = true;


            },

            selectDeliveryDate: function () {


                this.delivery_time = '-1';

                this.isDeliveryDateChosen = false;
                this.isDeliveryTimeChosen = false;

                this.delivery_times = this.delivery_date.time;
                this.isDeliveryDateChosen = true;


            },

            selectDeliveryTime: function () {

                this.isDeliveryTimeChosen = parseInt(this.delivery_time) !== -1;

            },

            Next: function () {
                if (this.Stage === 'setting') {
                    if (this.orderServiceAllowed) {
                        this.Stage = 'order_service';

                    } else {
                        if (this.extraOptionsAllowed) {
                            this.Stage = 'extra_option';

                        } else {
                            this.Stage = 'final';

                        }
                    }

                } else if (this.Stage === 'order_service') {
                    if (this.extraOptionsAllowed) {
                        this.Stage = 'extra_option';

                    } else {
                        this.Stage = 'final';

                    }

                } else if (this.Stage === 'extra_option') {
                    this.Stage = 'final';
                }

            },


            Previous: function () {
                if (this.Stage === 'order_service') {
                    this.Stage = 'setting';

                } else if (this.Stage === 'extra_option') {
                    if (this.orderServiceAllowed) {
                        this.Stage = 'order_service';
                    } else {
                        this.Stage = 'setting';
                    }

                } else if (this.Stage === 'final') {
                    if (this.extraOptionsAllowed) {
                        this.Stage = 'extra_option';
                    } else {
                        if (this.orderServiceAllowed) {
                            this.Stage = 'order_service';
                        } else {
                            this.Stage = 'setting';
                        }

                    }

                }

            },


            selectOrderService: function (id, order_service) {
                this.order_service = order_service;

            },

            getOrderExtraOptions: function () {

                const extra_options = this.$userData.order_extra_options;
                if (!this.extra_options.length) {
                    const THIS = this;
                    extra_options.forEach(function (option, key) {
                        const row = {};
                        row.id = option.id;
                        row.title = option.title;
                        row.price = option.price;
                        row.count = 0;
                        THIS.extra_options[key] = row;
                    });
                }
                return extra_options;
            },

            Plus: function (key) {
                this.extra_options[key].count += 1;
                $('#count_extra_option_' + key).text(this.extra_options[key].count);
            },

            Minus: function (key) {
                if (this.extra_options[key].count > 0) {
                    this.extra_options[key].count -= 1;
                }
                $('#count_extra_option_' + key).text(this.extra_options[key].count);
            },

            getOrderExtraOption: function () {
                const THIS = this;
                return this.extra_options.filter(function (option, key) {
                    if (option.count !== 0) {
                        return THIS.extra_options[key];
                    }
                });
            },

            show_time: function (time) {
                const array = time.split(' : ');
                return "ساعت " + array[0] + " تا " + array[1];
            },

            getKeyByValue: function (object, value) {
                return Object.keys(object).find(key => object[key] === value);
            },


            ConfirmOrder: function () {

                const THIS = this;
                this.isProgressActive = true;
                this.isHiddenError = true;


                let formData = new FormData();

                formData.append('token', this.$TOKEN);
                formData.append('date_pickup_user', this.pickup_date.date_pickup);
                formData.append('time_pickup_user', this.pickup_time.time);
                formData.append('date_delivery_user', this.delivery_date.date);
                formData.append('time_delivery_user', this.delivery_time);
                formData.append('address_id', this.address.id);
                formData.append('order_service_id', this.order_service.id);
                formData.append('description', this.description);

                if (this.hasValidCoupon) {
                    formData.append('coupon', this.couponCode);
                }

                // create extra_options_array to send
                this.getOrderExtraOption().forEach(function (option, key) {
                    formData.append('extra_options[' + key + '][id]', option.id);
                    formData.append('extra_options[' + key + '][count]', option.count);
                });

                this.$API.post(
                    '/api/v5/user/registerOrder', formData,
                    {
                        headers: {
                            'Accept': 'application/json',
                        }
                    })
                    .then(
                        (response) => {
                            this.isProgressActive = false;

                            if (parseInt(response.data.code) === 1) {
                                // request to refresh data
                                this.$initData(function () {
                                    THIS.$nextTick(function () {
                                        const modal = $("#confirm_modal");
                                        modal.modal('show');
                                        modal.on('hide.bs.modal', function () {
                                            THIS.$router.push({path: '/dashboard/orders'});
                                        });
                                    });
                                });
                            } else {
                                if (Object.keys(response.data.msg)[0] === 'token') {

                                    localStorage.removeItem('data');
                                    this.$router.push({path: '/login'});

                                } else {
                                    console.log(response.data.msg);
                                    this.Error = '';
                                    const THIS = this;
                                    Object.values(response.data.msg).forEach(function (error_message) {
                                        THIS.Error += "\n - " + error_message;
                                    });
                                    this.isHiddenError = false;

                                }
                            }
                        }, (error) => {
                            this.isProgressActive = false;
                            console.log(error)
                        }
                    );


            },


            countWords: function (str) {
                return str.trim().split('').length;
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

            this.orderServiceAllowed = this.$userData.register_order_settings.find(function (ros) {
                return ros.id === 1;
            }).enabled;

            this.extraOptionsAllowed = this.$userData.register_order_settings.find(function (ros) {
                return ros.id === 2;
            }).enabled;

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