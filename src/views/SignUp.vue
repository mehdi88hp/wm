<template>

    <div class="container vh-100">
        <div class="row vh-100 d-flex justify-content-center p-2 px-md-0 py-md-5">
            <div class="card shadow shadow-sm col-12 text-right align-self-start align-self-md-center mt-md-5">

                <div class="card-body" dir="rtl">


                    <div class="card bg-info h-auto shadow-sm col-12 text-white mb-3 mb-md-0">

                        <div class="card-body py-3 px-0">
                            <div class="row">

                                <div class="col-md-8 text-right font-weight-bold d-flex justify-content-start">
                                    <i class="far fa-2x fa-edit"></i>
                                    &nbsp;
                                    <span class="align-self-center">ثبت نام</span>
                                </div>

                                <div class="col-12 d-flex justify-content-center d-block d-md-none my-2">
                                    <div class="col-10 dropdown-divider"></div>
                                </div>

                                <div class="col-md-4">
                                    <div class="row d-flex justify-content-center justify-content-md-end ml-md-3">
                                        <button class="col-4 btn btn-secondary" @click="$router.push({path: '/login'})">
                                            لغو
                                        </button>
                                        <div class="col-1"></div>
                                        <button class="col-4 btn btn-warning" @click="SendData()">ثبت</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-12 mt-3">
                            <transition name="fade" mode="out-in">
                                <div v-if="isProgressActive && isMobile" class="progress col-12 mb-3">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-info"
                                         role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                         aria-valuemax="100"
                                         style="width: 100%"></div>
                                </div>
                            </transition>

                            <transition name="fade" mode="out-in">
                                <div class="col-12 alert alert-danger small text-right like-pre mb-3"
                                     v-if="!isHiddenError && isMobile">{{ Error }}
                                </div>
                            </transition>
                        </div>
                    </div>


                    <div class="row not-clickable d-flex justify-content-center img-user-pic-sign-up">

                        <div class="col-12 col-md-8 d-flex justify-content-center">
                            <div id="img_div_holder">
                                <!-- photo pick button -->

                                <img id="pickPhoto" src='../assets/camera_icon.jpg'
                                     class="img-fluid rounded-circle m-0 border border-white bg-dark clickable"
                                     alt="user pic"
                                     onclick="document.getElementById('userPickPhotoFile').click()">

                                <div id="userPicHolder" class="bg-white rounded-circle shadow-lg p-2">
                                    <!-- user photo -->
                                    <img class="rounded-circle m-0"
                                         alt="user pic"
                                         width="100%"
                                         height="100%"
                                         id="userPic_img">
                                    <input type="file" id="userPickPhotoFile" class="d-none" accept="image/*"
                                           v-on:change="HandleNewPic()"/>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div class="row mt-4">
                        <div class="col-lg-8">

                            <div class="row mb-3 mb-lg-0">


                                <div class="col-12">
                                    <transition name="fade" mode="out-in">
                                        <div v-if="isProgressActive && !isMobile" class="progress col-12 mb-3">
                                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-info"
                                                 role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                                 aria-valuemax="100"
                                                 style="width: 100%"></div>
                                        </div>
                                    </transition>

                                    <transition name="fade" mode="out-in">
                                        <div class="col-12 alert alert-danger small text-right like-pre mb-3"
                                             v-if="!isHiddenError && !isMobile">{{ Error }}
                                        </div>
                                    </transition>
                                </div>

                                <div class="col-md-6">
                                    <input class="col-12 form-control mb-4" type="text" v-model="name"
                                           @input="Change()"
                                           placeholder="نام"/>

                                </div>

                                <div class="col-md-6">

                                    <input class="col-12 form-control mb-4" type="text" v-model="last_name"
                                           @input="Change()"
                                           placeholder="نام خانوادگی (اختیاری)"/>

                                </div>

                                <div class="col-md-6">
                                    <select class="col-12 form-control mb-4" v-model="city" @change="Change()">
                                        <option value="-1" selected disabled hidden>شهر خود را انتخاب کنید
                                        </option>
                                        <option value="تهران">تهران</option>
                                    </select>
                                </div>

                                <div class="col-md-6">

                                    <searchable_select class="col-12 mb-4" :options="zones"
                                                       :value="zone"
                                                       :title="'محله خود را انتخاب کنید'"
                                                       v-on:choose="zone = $event"/>

                                </div>

                                <div class="col-12">
                                    <textarea class="col-12 form-control mb-4"
                                              style="height: 50pt; min-height: 50pt; max-height: 50pt;"
                                              v-model="address"
                                              placeholder="آدرس را وارد کنید"
                                              @input="Change()"></textarea>
                                </div>

                                <div class="col-12 d-flex justify-content-center">
                                    <div class="col-8 col-lg-4">
                                        <input class="form-control text-center" type="text" v-model="invite_code"
                                               placeholder="کد معرف (اختیاری)"/>
                                    </div>
                                </div>

                                <div class="col-12 d-flex justify-content-center mt-3">
                                    <button class="btn btn-link" @click="openInNewTab('http://washmash.com/terms/')">
                                        قوانین و مقررات را خوانده ام و می پذیرم
                                    </button>
                                </div>

                            </div>


                        </div>

                        <div class="col-lg-4 px-0">
                            <vl-map class="col-12 m-0 p-0 shadow shadow-lg border" id="map"
                                    style="height: 300pt;"
                                    :load-tiles-while-animating="true"
                                    :load-tiles-while-interacting="true"
                                    data-projection="EPSG:4326">
                                <vl-view :zoom.sync="zoom"
                                         :center.sync="center"
                                         :rotation.sync="rotation"></vl-view>

                                <vl-layer-tile id="osm">
                                    <vl-source-osm></vl-source-osm>
                                </vl-layer-tile>

                                <vl-layer-vector>
                                    <vl-source-vector>
                                        <vl-feature>
                                            <vl-geom-point :coordinates="center"></vl-geom-point>
                                        </vl-feature>

                                        <vl-feature>
                                            <vl-geom-circle :radius="500"
                                                            :coordinates="center"></vl-geom-circle>
                                            <vl-style-box>
                                                <vl-style-stroke color="red"></vl-style-stroke>
                                                <vl-style-fill
                                                        color="rgba(255, 77, 45, 0.26)"></vl-style-fill>
                                            </vl-style-box>
                                        </vl-feature>
                                    </vl-source-vector>
                                </vl-layer-vector>
                            </vl-map>
                        </div>

                    </div>


                </div>

            </div>
        </div>


        <!-- the modal -->
        <div class="modal" id="confirm_modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="p-3 border-bottom">
                        <div class="row">
                            <div class="col-12  d-flex justify-content-between">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h5 class="modal-title text-right" id="order_info_modal_Title">پیام تایید</h5>
                            </div>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="d-block text-center">
                            <h5>سفارش شما با موفقیت ثبت شد. منتظر تایید سفارش از سوی کارشناسان واش-ماش باشید</h5>
                        </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                        <button type="button" class="btn btn-success" data-dismiss="modal">متوجه شدم</button>
                    </div>
                </div>
            </div>
        </div>


    </div>

</template>


<script>

    import Vue from 'vue';
    import Searchable_select from "../components/SearchableSelect";

    export default {
        name: "sign_up",
        data() {
            return {

                zoom: 10,
                //        long  |   lat
                center: [51.3890, 35.6892],
                rotation: 0,
                geolocPosition: undefined,

                name: '',
                last_name: '',
                city: '-1',
                zone: '',
                address: '',
                invite_code: '',
                newPicFile: '',

                address_id: 0,

                lat: '',
                long: '',

                isProgressActive: false,

                isMobile: false,

                isHiddenError: true,
                Error: '',

                loadMap: true,
            }
        },
        computed: {
            zones() {
                const options = [];

                if (localStorage.getItem('cities'))
                    JSON.parse(localStorage.getItem('cities')).forEach(function (option) {
                        const row = [];
                        row.key = option;
                        row.value = option;

                        options.push(row);
                    });

                return options;
            },
        },

        components: {Searchable_select},

        methods: {

            Change: function () {
                this.isHiddenError = true;
                this.Error = '';
            },


            SendData: function () {
                this.isHiddenError = true;
                this.Error = '';


                if (!this.name) {
                    this.Error += "\n" + "- نام وارد نشده است";
                    this.isHiddenError = false;
                }

                if (this.city === '-1') {
                    this.Error += "\n" + "- شهر انتخاب نشده است";
                    this.isHiddenError = false;
                }

                if (!this.zone) {
                    this.Error += "\n" + "- محله انتخاب نشده است";
                    this.isHiddenError = false;
                }

                if (!this.address) {
                    this.Error += "\n" + "- آدرس وارد نشده است";
                    this.isHiddenError = false;
                }

                if (!this.isHiddenError) return;

                let formData = new FormData();

                formData.append('token', this.$TOKEN);
                formData.append('name', this.name);
                formData.append('last_name', this.last_name);
                formData.append('telephone', localStorage.getItem('phone'));
                formData.append('city', this.city);
                formData.append('neighbourhood', this.zone);
                formData.append('province', this.city);
                formData.append('address', this.address);
                formData.append('latitude', this.center[1]);
                formData.append('longitude', this.center[0]);
                formData.append('tell_friends', this.invite_code);
                if (this.newPicFile) {
                    formData.append('image', this.newPicFile);
                }

                this.isProgressActive = true;


                this.$API.post(
                    '/api/v5/user/SingUp',
                    formData,
                    {
                        headers: {
                            'Accept': 'application/json',
                        }
                    })
                    .then(
                        (response) => {
                            this.isProgressActive = false;
                            // console.log(response.data);
                            if (parseInt(response.data.code) === 1) {

                                // request to refresh data
                                localStorage.setItem('data', JSON.stringify(response.data));
                                Vue.prototype.$userData = response.data;
                                Vue.prototype.$TOKEN = response.data.token;
                                this.$router.push({path: '/dashboard/new-order'});

                            } else {
                                if (Object.keys(response.data.msg)[0] === 'token') {

                                    localStorage.removeItem('data');
                                    this.$router.push({path: '/login'});

                                } else {
                                    // console.log(response.data.msg);
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
                            console.log(error);
                        }
                    );


            },

            getKeyByValue: function (object, value) {
                return Object.keys(object).find(key => object[key] === value);
            },

            setImageSrc: function (img) {
                if (img !== null) {
                    document.getElementById("userPic_img").src = img;
                }
            },

            LoadPic: function () {
                this.setImageSrc(require('../assets/userPic.png'));
            },

            HandleNewPic: function () {

                const selectedFile = window.event.target.files[0];

                const fileType = selectedFile["type"];
                const ValidImageTypes = ["image/gif", "image/jpeg", "image/png"];

                if (ValidImageTypes.indexOf(fileType) < 0) {
                    this.$nextTick(function () {
                        $('#not_image_modal').modal('show');
                    });
                    return;
                }

                this.newPicFile = selectedFile;

                const reader = new FileReader();

                const THIS = this;
                reader.onload = function (event) {
                    THIS.setImageSrc(event.target.result);
                };

                reader.readAsDataURL(selectedFile);
            },

            openInNewTab: function (url) {
                const win = window.open(url, '_blank');
                win.focus();
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
            if (localStorage.getItem('data')) {
                this.$router.push({path: '/dashboard/new-order'});

            } else if (!localStorage.getItem('phone')) {
                this.$router.push({path: '/login'});

            }

            this.isMobile = (screen.width <= 992);
            console.log(screen.width);
            console.log(this.isMobile);
        },
        mounted: function () {
            this.LoadPic();

        },
        created: function () {

        }
    };

</script>


<style scoped>

    #userPicHolder {
        width: 100%;
        height: 100%;
    }

    #img_div_holder {
        width: 200pt;
        height: 200pt;
    }

    *:focus {
        outline: 0;
    }

    #pickPhoto {
        width: 60pt;
        height: 60pt;
        position: absolute;
        border-width: 5px !important;
    }

    #pickPhoto:hover {
        cursor: pointer;
    }

    hr {
        border-top: 1px solid #138496;
        -o-transition: .3s;
        -ms-transition: .3s;
        -moz-transition: .3s;
        -webkit-transition: .3s;
        transition: .3s;
    }


</style>