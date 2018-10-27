<template>

    <div class="container">
        <div class="row h-auto d-flex justify-content-center p-2 px-md-0 py-md-5">
            <div class="card h-auto shadow shadow-sm col-12 col-md-10 p-0 p-md-2 text-right">

                <div class="card-body pt-1 pt-md-2 px-1" dir="rtl">


                    <transition name="fade" mode="out-in">

                        <div class="mx-3" :key="1" v-if="!ShowAddressForm">
                            <div class="row mb-4">
                                <div class="card bg-dark h-auto shadow-sm col-12 text-white">

                                    <div class="card-body py-3 px-0">
                                        <div class="row balance-card d-md-flex justify-content-md-between">

                                            <div class="col-12 col-md-8">
                                                <div class="col-12 text-right font-weight-bold d-flex justify-content-start">
                                                    <i class="fas fa-2x fa-map-marked-alt"></i>
                                                    &nbsp;
                                                    <span class="align-self-center">آدرس های من</span>
                                                </div>
                                            </div>

                                            <div class="col-12 d-flex justify-content-center d-block d-md-none my-2">
                                                <div class="col-10 dropdown-divider"></div>
                                            </div>

                                            <div class="col-12 col-md-4 d-flex justify-content-center justify-content-md-end align-items-center">
                                                <div class="btn btn-outline-info"
                                                     @click="New()">
                                                    ثبت آدرس جدید
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="row rounded mb-3 p-3 d-flex justify-content-center card-cash-info"
                                 v-for="(address, key) in addresses"
                                 :key="key"
                                 @click="Edit(address)">

                                <div class="col-12 text-center">{{ address.city + " | " + address.neighbourhood }}</div>

                                <div class="col-12 text-center field-cash-info">
                                    {{ address.address }}
                                </div>
                            </div>

                        </div>

                        <div :key="2" v-if="ShowAddressForm">

                            <div class="card bg-info h-auto shadow-sm col-12 text-white">

                                <div class="card-body py-3 px-0">
                                    <div class="row">

                                        <div class="col-md-8 text-right font-weight-bold d-flex justify-content-start">
                                            <i class="far fa-2x fa-edit"></i>
                                            &nbsp;
                                            <span class="align-self-center">اطلاعات را وارد نمونده و سپس برروی گزینه ثبت کلیک کنید</span>
                                        </div>

                                        <div class="col-12 d-flex justify-content-center d-block d-md-none my-2">
                                            <div class="col-10 dropdown-divider"></div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="row d-flex justify-content-center justify-content-md-end ml-md-3 mt-3 mt-md-0">
                                                <button class="col-4 btn btn-secondary" @click="Cancel()">لغو</button>
                                                <div class="col-1"></div>
                                                <button class="col-4 btn btn-warning" @click="SendData()">ثبت</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div class="row pt-3">

                                <div class="col-md-6 px-2">
                                    <div class="container">

                                        <transition name="fade" mode="out-in">
                                            <div v-if="isProgressActive" class="progress mb-3">
                                                <div class="progress-bar progress-bar-striped progress-bar-animated bg-info"
                                                     role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                                     aria-valuemax="100"
                                                     style="width: 100%"></div>
                                            </div>
                                        </transition>

                                        <transition name="fade" mode="out-in">
                                            <div class="alert alert-danger small text-right like-pre mb-3"
                                                 v-if="!isHiddenError">{{ Error }}
                                            </div>
                                        </transition>


                                        <select class="col-12 form-control mb-4" v-model="city" @change="Change()">
                                            <option value="-1" selected disabled hidden>شهر خود را انتخاب کنید
                                            </option>
                                            <option value="تهران">تهران</option>
                                        </select>

                                        <searchable_select class="col-12 mb-4" :options="zones"
                                                           :value="zone"
                                                           :title="'محله خود را انتخاب کنید'"
                                                           v-on:choose="zone = $event"/>

                                        <textarea class="col-12 form-control mb-4"
                                                  style="height: 50pt; min-height: 50pt; max-height: 50pt;"
                                                  v-model="address"
                                                  placeholder="آدرس را وارد کنید"
                                                  @input="Change()"></textarea>


                                    </div>
                                </div>

                                <div class="col-md-6">

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
                    </transition>

                </div>

            </div>
        </div>


    </div>

</template>


<script>

    import Searchable_select from "../../components/SearchableSelect";

    export default {
        name: "addresses",
        data() {
            return {

                addresses: this.$userData.addresses,

                zoom: 10,
                //        long  |   lat
                center: [51.3890, 35.6892],
                rotation: 0,
                geolocPosition: undefined,

                isEdit: false,
                city: '-1',
                zone: '',
                address: '',

                address_id: 0,

                lat: '',
                long: '',

                ShowAddressForm: false,

                isProgressActive: false,

                isHiddenError: true,
                Error: '',

                loadMap: true,
            }
        },
        computed: {

            zones() {
                const options = [];
                this.$userData.cities.forEach(function (option) {
                    const row = [];
                    row.key = option;
                    row.value = option;

                    options.push(row);
                });

                return options;
            },
        },

        components: {
            Searchable_select
        },

        methods: {

            Change: function () {
                this.isHiddenError = true;
                this.Error = '';
            },


            New: function () {

                this.address_id = 0;

                this.isEdit = false;
                this.city = '-1';
                this.zone = '';
                this.address = '';
                this.ShowAddressForm = true;
                this.center = [51.3890, 35.6892];

            },

            Edit: function (address) {

                this.address_id = address.id;

                this.isEdit = true;
                this.city = 'تهران';
                this.zone = address.neighbourhood;
                this.address = address.address;
                if (parseFloat(address.longitude)) {
                    this.center = [parseFloat(address.longitude), parseFloat(address.latitude)];
                } else {
                    this.center = [51.3890, 35.6892];
                }

                this.ShowAddressForm = true;

            },

            Cancel: function () {
                this.ShowAddressForm = false;
            },

            SendData: function () {
                this.isHiddenError = true;
                this.Error = '';


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
                formData.append('title', this.name);
                formData.append('city', this.city);
                formData.append('neighbourhood', this.zone);
                formData.append('province', this.city);
                formData.append('address', this.address);
                formData.append('latitude', this.center[1]);
                formData.append('longitude', this.center[0]);
                formData.append('address_id', this.address_id);

                this.isProgressActive = true;

                let path = '/api/v5/user/createAddress';
                if (this.isEdit) {
                    path = '/api/v5/user/editAddress';
                }

                this.$API.post(
                    path,
                    formData,
                    {
                        headers: {
                            'Accept': 'application/json',
                        }
                    })
                    .then(
                        (response) => {
                            // console.log(response.data);
                            if (parseInt(response.data.code) === 1) {

                                // request to refresh data
                                const THIS = this;
                                this.$initData(function (data) {

                                    THIS.addresses = data.addresses;
                                    THIS.ShowAddressForm = false;
                                });

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

                            this.isProgressActive = false;

                        }, (error) => {
                            this.isProgressActive = false;
                            console.log(error);
                        }
                    );


            },

        },
        beforeMount: function () {

        },
        mounted: function () {

        },
        created: function () {

        }
    };


</script>


<style scoped>

    *:focus {
        outline: 0;
    }

    .card-cash-info {
        border: 1px solid #138496;
        color: #138496;
        -o-transition: .3s;
        -ms-transition: .3s;
        -moz-transition: .3s;
        -webkit-transition: .3s;
        transition: .3s;
    }

    .card-cash-info:hover {
        border: #ffffff;
        color: #ffffff;
        cursor: pointer;
        background-color: #138496;
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
        border-top: 1px solid #138496;
        -o-transition: .3s;
        -ms-transition: .3s;
        -moz-transition: .3s;
        -webkit-transition: .3s;
        transition: .3s;
    }


</style>