<template>
    <div class="vh-100 vw-100 text-right">

        <div id="navBar"
             class="h-auto w-100 bg-light py-0 px-2 shadow-sm d-flex justify-content-between align-items-center sticky-top"
             dir="rtl">

            <div class="dropdown h-auto mr-3">
                <div id="dropBtn" v-on:click="ShowDropdown()"
                     class="dropBtn row align-items-center nav-items-height clickable h-auto">
                    <img id="userPic" v-bind:src="userPic"
                         class="rounded-circle float-right not-clickable user-pic-Main shadow" height="40"
                         width="40"/>
                    <div id="menu" class="float-left align-items-center mr-3 not-clickable"
                         :class="{ change: dropDown_opened }">
                        <div class="row bar bar1 not-clickable"></div>
                        <div class="row bar bar2 not-clickable"></div>
                        <div class="row bar bar3 not-clickable"></div>
                    </div>
                </div>
                <transition name="fade">
                    <div v-if="dropDown_opened && !isMobileDevice" class="dropdown-content">
                        <a v-on:click="$router.push({ path: '/dashboard/orders' })"
                           class="d-flex justify-content-center align-items-center">
                            <i class="fas fa-tshirt col-1"></i>&nbsp;&nbsp;<span class="col-11">سفارشات من</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="$router.push({ path: '/dashboard/account' })"
                           class="d-flex justify-content-center align-items-center">
                            <i class="far fa-user col-1"></i>&nbsp;&nbsp;<span class="col-11">حساب کاربری</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="$router.push({ path: '/dashboard/addresses' })"
                           class="d-flex justify-content-center align-items-center">
                            <i class="fas fa-map-marker-alt col-1"></i>&nbsp;&nbsp;<span
                                class="col-11">آدرس های من</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="$router.push({ path: '/dashboard/bills' })"
                           class="d-flex justify-content-center align-items-center">
                            <i class="fas fa-concierge-bell col-1"></i>&nbsp;&nbsp;<span
                                class="col-11">صورت حساب ها</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="$router.push({ path: '/dashboard/pricing' })"
                           class="d-flex justify-content-center align-items-center">
                            <i class="fas fa-dollar-sign col-1"></i>&nbsp;&nbsp;<span class="col-11">قیمت خدمات</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="$router.push({ path: '/dashboard/faq' })"
                           class="d-flex justify-content-center align-items-center">
                            <i class="far fa-question-circle col-1"></i>&nbsp;&nbsp;<span
                                class="col-11">سوالات متداول</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="$router.push({ path: '/dashboard/help' })"
                           class="d-flex justify-content-center align-items-center">
                            <i class="fas fa-info col-1"></i>&nbsp;&nbsp;<span class="col-11">راهنما</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="$router.push({ path: '/dashboard/introduce_to_friends' })"
                           class="d-flex justify-content-center align-items-center">
                            <i class="fas fa-share-alt-square col-1"></i>&nbsp;&nbsp;<span class="col-11">معرفی به دوستان</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="$router.push({ path: '/dashboard/social' })"
                           class="d-flex justify-content-center align-items-center">
                            <i class="fab fa-facebook-square col-1"></i>&nbsp;&nbsp;<span class="col-11">شبکه های اجتماعی</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="$router.push({ path: '/dashboard/call' })"
                           class="d-flex justify-content-center align-items-center">
                            <i class="fas fa-phone-square col-1"></i>&nbsp;&nbsp;<span
                                class="col-11">تماس با واش ماش</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="logOut()" class="d-flex justify-content-center align-items-center">
                            <i class="fas fa-sign-out-alt col-1"></i>&nbsp;&nbsp;<span
                                class="col-11">خروج از حساب</span>
                        </a>
                    </div>
                </transition>
            </div>

            <button v-on:click="$router.push({ path: '/dashboard/new-order' })"
                    class="btn btn-sm btn-info">
                <i class="fas fa-plus"></i>&nbsp;&nbsp;<span>سفارش جدید</span></button>

        </div>

        <div id="mySideNav" class="sideNav" :class="{ 'sideNav-opened': dropDown_opened && isMobileDevice }" dir="rtl">
            <a v-on:click="$router.push({ path: '/dashboard/orders' })"
               class="d-flex justify-content-center align-items-center">
                <i class="fas fa-tshirt col-1"></i>&nbsp;&nbsp;<span class="col-11">سفارشات من</span>
            </a>
            <div class="dropdown-divider"></div>
            <a v-on:click="$router.push({ path: '/dashboard/account' })"
               class="d-flex justify-content-center align-items-center">
                <i class="far fa-user col-1"></i>&nbsp;&nbsp;<span class="col-11">حساب کاربری</span>
            </a>
            <div class="dropdown-divider"></div>
            <a v-on:click="$router.push({ path: '/dashboard/addresses' })"
               class="d-flex justify-content-center align-items-center">
                <i class="fas fa-map-marker-alt col-1"></i>&nbsp;&nbsp;<span class="col-11">آدرس های من</span>
            </a>
            <div class="dropdown-divider"></div>
            <a v-on:click="$router.push({ path: '/dashboard/bills' })"
               class="d-flex justify-content-center align-items-center">
                <i class="fas fa-concierge-bell col-1"></i>&nbsp;&nbsp;<span class="col-11">صورت حساب ها</span>
            </a>
            <div class="dropdown-divider"></div>
            <a v-on:click="$router.push({ path: '/dashboard/pricing' })"
               class="d-flex justify-content-center align-items-center">
                <i class="fas fa-dollar-sign col-1"></i>&nbsp;&nbsp;<span class="col-11">قیمت خدمات</span>
            </a>
            <div class="dropdown-divider"></div>
            <a v-on:click="$router.push({ path: '/dashboard/faq' })"
               class="d-flex justify-content-center align-items-center">
                <i class="far fa-question-circle col-1"></i>&nbsp;&nbsp;<span class="col-11">سوالات متداول</span>
            </a>
            <div class="dropdown-divider"></div>
            <a v-on:click="$router.push({ path: '/dashboard/help' })"
               class="d-flex justify-content-center align-items-center">
                <i class="fas fa-info col-1"></i>&nbsp;&nbsp;<span class="col-11">راهنما</span>
            </a>
            <div class="dropdown-divider"></div>
            <a v-on:click="$router.push({ path: '/dashboard/introduce_to_friends' })"
               class="d-flex justify-content-center align-items-center">
                <i class="fas fa-share-alt-square col-1"></i>&nbsp;&nbsp;<span class="col-11">معرفی به دوستان</span>
            </a>
            <div class="dropdown-divider"></div>
            <a v-on:click="$router.push({ path: '/dashboard/social' })"
               class="d-flex justify-content-center align-items-center">
                <i class="fab fa-facebook-square col-1"></i>&nbsp;&nbsp;<span class="col-11">شبکه های اجتماعی</span>
            </a>
            <div class="dropdown-divider"></div>
            <a v-on:click="$router.push({ path: '/dashboard/call' })"
               class="d-flex justify-content-center align-items-center">
                <i class="fas fa-phone-square col-1"></i>&nbsp;&nbsp;<span class="col-11">تماس با واش ماش</span>
            </a>
            <div class="dropdown-divider"></div>
            <a v-on:click="logOut()" class="d-flex justify-content-center align-items-center">
                <i class="fas fa-sign-out-alt col-1"></i>&nbsp;&nbsp;<span class="col-11">خروج از حساب</span>
            </a>
        </div>


        <div id="main_router_view_container"
             :style="[dropDown_opened ? {'overflow-y': 'hidden', 'margin-right': PaddingIfHasVerticalScroll()} : {'overflow-y': 'auto', '-webkit-overflow-scrolling': 'touch'}]">
            <transition name="fade" mode="out-in">
                <!--<keep-alive>-->
                <router-view id="main_router_view" style="height: 100%"/>
                <!--</keep-alive>-->
            </transition>
        </div>

    </div>
</template>

<script>

    export default {
        name: "Main",
        props: {},
        data() {
            return {
                dropDown_opened: false,
                userPic: '',
                windowHeight: 0,
                isMobileDevice: false,
            }
        },

        watch: {
            // windowHeight(newHeight, oldHeight) {
            windowHeight() {
                this.setViewHeight();
            }
        },

        methods: {

            /** @return {string} */
            PaddingIfHasVerticalScroll: function () {
                let padding = '0';
                    if (
                        document.getElementById('main_router_view_container').scrollHeight
                        >
                        document.getElementById('main_router_view_container').clientHeight
                    ) {
                        padding = '5px';
                    }

                return padding;

            },

            ShowDropdown: function () {
                this.dropDown_opened = !this.dropDown_opened;

            },
            documentClick: function (event) {
                if (!document.getElementById('dropBtn').contains(event.target)) {
                    const before = this.dropDown_opened;
                    this.dropDown_opened = false;
                    if (before) {
                        $('#menu').removeClass('change');
                    }
                }
            },


            logOut: function () {

                let formData = new FormData();

                formData.append('token', this.$TOKEN);

                this.$API.post(
                    '/api/v5/user/SingOut',
                    formData,
                    {
                        headers: {
                            'Accept': 'application/json',
                        }
                    });

                localStorage.removeItem('data');
                localStorage.setItem('logging-out', 'true');
                this.$router.push({path: '/login'});
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


            setViewHeight: function () {
                this.$nextTick(function () {
                    const window_height = window.innerHeight;
                    const nav_height = $('#navBar').height();

                    const main_router_view_container = $('#main_router_view_container');
                    main_router_view_container.height(window_height - nav_height);
                });
            },

        },

        mounted() {

            this.$nextTick(() => {
                window.addEventListener('resize', () => {
                    this.windowHeight = window.innerHeight;
                    this.isMobileDevice = window.innerWidth < 576;
                });
            });

        },


        beforeMount() {

            if (this.$router.currentRoute.path === '/dashboard' || this.$router.currentRoute.path === '/dashboard/') {
                this.$router.push({path: '/dashboard/new-order'});
            }


            this.userPic = require('../assets/userPic.png');
            const THIS = this;
            const pic = this.$userData.image;
            this.imageExists(pic, function (exists) {
                if (exists) {
                    THIS.userPic = pic;
                }
            });


        },
        created() {
            document.addEventListener('click', this.documentClick);

            this.setViewHeight();

            this.isMobileDevice = window.innerWidth < 576;


        },
        destroyed() {
            document.removeEventListener('click', this.documentClick);

            this.$nextTick(() => {
                window.removeEventListener('resize', () => {
                    this.windowHeight = window.innerHeight;
                });
            });
        }

    };
</script>

<style scoped>

    *:focus {
        outline: 0;
    }

    .sideNav {
        height: 100%;
        width: 250px;
        max-width: 250px;
        position: fixed;
        z-index: 99;
        right: -250px;
        background-color: #111;
        overflow-x: hidden;
        overflow-y: auto;

        -o-transition: .5s ease;
        -ms-transition: .5s ease;
        -moz-transition: .5s ease;
        -webkit-transition: .5s ease;
        transition: .5s ease;
    }

    .sideNav-opened {
        transform: translateX(-250px);
    }

    .sideNav a {
        padding: 10px;
        font-size: 13px;
        color: white;
        display: block;
    }

    .sideNav a:hover {
        color: #c82333;
    }

    .dropBtn {
        background-color: transparent;
        color: white;
        padding: 5px;
        font-size: 16px;
        border: none;
        cursor: pointer;
    }

    .dropdown-content {
        margin-right: 30px;
        right: 0;
        /*display: none;*/
        position: absolute;
        background-color: #f9f9f9;
        min-width: 230px;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        z-index: 1;
    }

    .dropdown-content a:hover {
        cursor: pointer;
    }

    .bar {
        width: 3px;
        height: 3px;
        background-color: #333;
        margin: 3px 0;
        transition: 0.4s;
    }

    @media (hover: hover) {
        .dropdown:hover .dropdown-content {
            /*display: block;*/
        }

        .dropdown-content a:hover {
            background-color: #f1f1f1
        }

        .dropBtn:hover {
            /*background-color: #a8a8a8;*/
        }
    }

    #main_router_view_container {
        overflow-x: hidden;
        /*overflow-y: auto;*/
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
    }

    #main_router_view {
        /*position: relative;*/
    }

    @media (min-width: 0px) {
        /*xs*/
        .dropdown {
            /*margin-top: -20pt;*/
        }

        .dropdown-content a {
            color: black;
            padding: 10px;
            font-size: 14px;
            text-decoration: none;
            display: block;
        }
    }

    @media (min-width: 576px) {
        /*sm*/

    }

    @media (min-width: 768px) {
        /*md*/
        .user-pic-Main {
            margin-top: 0;
        }

        .dropdown-content a {
            font-size: 12px;
        }
    }

    @media (min-width: 992px) {
        /*lg*/
    }

    @media (min-width: 1200px) {
        /*xl*/
    }

    .nav-items-height {
        height: 6vh;
    }

    .dropdown-divider {
        margin: 0;
        padding: 0;
    }

    li a:hover {
        cursor: pointer;
    }

    @media (min-width: 992px) {
        li a:hover {
            background-color: #9c9c9c;
        }
    }

    .dropBtn:hover .bar {
        background-color: #79ffff;
    }

    .change .bar1 {
        width: 5px;
        -webkit-transform: rotate(-45deg) translate(5px, 5px);
        transform: rotate(-45deg) translate(5px, 5px);
    }

    .change .bar2 {
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        width: 5px;
        /*opacity: 0;*/
    }

    .change .bar3 {
        width: 5px;
        -webkit-transform: rotate(-45deg) translate(-5px, -5px);
        transform: rotate(-45deg) translate(-5px, -5px);
    }

</style>