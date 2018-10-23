<template>

    <div class="container">
        <div class="row h-auto d-flex justify-content-center p-2 p-lg-0">
            <div style="margin-top: 125pt;" class="card shadow shadow-sm col-12 col-lg-8 mb-2">
                <div class="card-body" dir="rtl">

                    <div style="margin-top: -125pt" class="row d-flex justify-content-center">

                        <div id="img_div_holder">
                            <!-- photo pick button -->
                            <transition name="fade" mode="out-in">
                                <img id="pickPhoto" v-if="isEditing" src='../../assets/camera_icon.jpg'
                                     class="img-fluid rounded-circle m-0 border border-white bg-dark"
                                     alt="user pic"
                                     width="800"
                                     height="800"
                                     onclick="document.getElementById('userPickPhotoFile').click()">
                            </transition>

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

                    <transition name="fade" mode="out-in">

                        <div v-bind:key="1" v-if="!isEditing"
                             class="row text-center d-flex justify-content-center mt-5">
                            <div class="row col-12">
                                <h1 class="col-12">{{ $userData.name + " " + $userData.last_name }}</h1>
                            </div>
                            <div class="row col-12 col-lg-8 mt-4">
                                <h5 class="col-lg-6">موجودی اکانت : </h5>
                                <h5 class="col-lg-6">{{ toMoneyFormat($userData.credit/10) }} تومان</h5>
                            </div>
                            <div class="row col-12 mt-4">
                                <button class="btn btn-outline-danger col m-2" v-on:click="isEditing=!isEditing">ویرایش
                                    حساب
                                </button>
                                <button class="btn btn-outline-dark col m-2"
                                        @click="$router.push({path: '/dashboard/bills'})">افزایش موجودی
                                </button>
                                <button class="btn btn-outline-info col m-2"
                                        @click="$router.push({path: '/dashboard/addresses'})">آدرس های من
                                </button>
                            </div>
                        </div>


                        <div v-bind:key="2" v-else class="row text-center d-flex justify-content-center mt-3 mt-md-5">
                            <div class="form-group col-12 col-md-10 px-0">

                                <transition name="fade" mode="out-in">
                                    <div class="alert alert-danger small text-right like-pre"
                                         v-if="!isHiddenError">{{ Error }}
                                    </div>
                                </transition>

                                <div class="row col-12 px-0 align-items-center mt-3">
                                    <label for="name" class="col-4 text-right">نام</label>
                                    <input placeholder="نام خود را وارد کنید" v-model="name" type="text" id="name"
                                           class="form-control col-8 text-info"
                                           v-on:input="Change()"/>
                                </div>

                                <div class="row col-12 px-0 align-items-center mt-3">
                                    <label for="last_name" class="col-4 text-right">نام خانوادگی</label>
                                    <input placeholder="نام خانوادگی خود را وارد کنید (optional)" v-model="last_name"
                                           type="text"
                                           id="last_name"
                                           class="form-control col-8 text-info"/>
                                </div>

                                <!--<div class="row col-12 align-items-center mt-3">-->
                                <!--<label for="password" class="col-4 text-right">رمز فعلی</label>-->
                                <!--<input placeholder="رمز عبور فعلی خود را وارد کنید" v-model="password"-->
                                <!--type="password"-->
                                <!--id="password"-->
                                <!--class="form-control col-8 text-info"-->
                                <!--v-on:input="Change()"/>-->
                                <!--</div>-->

                                <!--<div class="row col-12 align-items-center mt-3">-->
                                <!--<label for="password_new" class="col-4 text-right">رمز جدید</label>-->
                                <!--<input placeholder="رمز عبور جدید را وارد کنید" v-model="password_new"-->
                                <!--type="password"-->
                                <!--id="password_new"-->
                                <!--class="form-control col-8 text-info"-->
                                <!--v-on:input="Change()"/>-->
                                <!--</div>-->

                                <transition name="fade" mode="out-in">
                                    <div v-if="isProgressActive" class="progress mt-4">
                                        <div class="progress-bar progress-bar-striped progress-bar-animated bg-info"
                                             role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                             style="width: 100%"></div>
                                    </div>
                                </transition>

                                <div class="row col-12 align-items-center mt-5 d-flex justify-content-center">
                                    <div class="row d-flex justify-content-between">
                                        <button class="btn btn-outline-success mx-2" v-on:click="SendData()">ذخیره
                                            اطلاعات
                                        </button>
                                        <button class="btn btn-outline-danger mx-2"
                                                v-on:click="CancelEdit()">لغو
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </transition>


                </div>

            </div>
        </div>


        <!-- the modal -->
        <div class="modal" id="not_image_modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="p-3 border-bottom">
                        <div class="row">
                            <div class="col-12  d-flex justify-content-between">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h5 class="modal-title text-right" id="order_info_modal_Title">خطا</h5>
                            </div>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="d-block text-center">
                            <h5>فایل انتخاب شده تصویر نیست</h5>
                        </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">متوجه شدم</button>
                    </div>
                </div>
            </div>
        </div>


    </div>

</template>


<script>

    export default {
        name: "account",
        data() {
            return {
                newPicFile: '',
                userPicWidth: '',
                userPicHeight: '',

                isEditing: false,
                name: this.$userData.name,
                last_name: this.$userData.last_name,
                password: '',
                password_new: '',

                isProgressActive: false,

                isHiddenError: true,
                Error: '',
            }
        },
        computed: {
        },

        components: {
        },

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

                // if (!this.password) {
                //     this.Error += "\n" + "- رمز عبور خالی است";
                //     this.isHiddenError = false;
                // }
                //
                // if (!this.password_new) {
                //     this.Error += "\n" + "- رمز عبور جدید خود را وارد کنید";
                //     this.isHiddenError = false;
                // }

                if (!this.isHiddenError) return;


                let formData = new FormData();

                formData.append('token', this.$TOKEN);
                formData.append('name', this.name);
                formData.append('last_name', this.last_name);
                // formData.append('password', this.password);
                // formData.append('new_password', this.password_new);
                if (this.newPicFile) {
                    // console.log(this.newPicFile);
                    formData.append('pic', this.newPicFile);
                }

                this.isProgressActive = true;

                this.$API.post(
                    '/api/v5/user/editUser',
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
                                const new_data = this.$userData;
                                new_data.name = this.name;
                                if (this.last_name) {
                                    new_data.last_name = this.last_name;
                                }

                                if (response.data.image) {
                                    new_data.image = response.data.image;
                                    this.$parent.userPic = response.data.image;
                                }

                                this.password = '';
                                this.password_new = '';

                                this.$userData = new_data;
                                localStorage.setItem('data', JSON.stringify(new_data));

                                this.isEditing = false;

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

            CancelEdit: function () {
                this.isEditing = !this.isEditing;
                this.name = this.$userData.name;
                this.last_name = this.$userData.last_name;
                this.password = '';
                this.password_new = '';
                this.newPicFile = '';
                this.LoadPic();

            },

            setImageSrc: function (img) {
                document.getElementById("userPic_img").src = img;
            },

            LoadPic: function () {
                this.setImageSrc(require('../../assets/userPic.png'));
                const THIS = this;
                const pic = this.$userData.image;
                this.imageExists(pic, function (exists) {
                    if (exists) {
                        THIS.setImageSrc(pic);
                    }
                });

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

            imageExists: function (url, callback) {
                const img = new Image();
                img.onload = function () {
                    callback(true);
                };
                img.onerror = function () {
                    callback(false);
                };
                img.src = url;
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

        },
        mounted: function () {
            this.LoadPic();
        },
    }
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

    #userPic_holder {
        margin-top: -200px;
    }

    #userPic_holder:after {
        border-radius: 50%;
        position: absolute;
        content: "";
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.51) 100%);
    }

    .card-hover-blue {
        transition: 0.3s;
    }

    .card-hover-blue:hover {
        cursor: pointer;
        color: white;
        background-color: #92ccff;
    }

</style>