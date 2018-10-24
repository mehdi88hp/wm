<template>
    <div class="vh-100 vw-100 text-right">
        <div id="navBar"
             class="w-100 h-auto bg-light py-0 px-2 shadow-sm d-flex justify-content-between align-items-center sticky-top"
             dir="rtl">

            <div class="dropdown h-auto mr-3">
                <div id="dropBtn" v-on:click="ShowDropdown()"
                     class="dropBtn row align-items-center nav-items-height clickable h-auto">
                    <img id="userPic" v-bind:src="userPic"
                         class="rounded-circle bg-dark float-right not-clickable user-pic-Main shadow" height="40"
                         width="40"/>
                    <div id="menu" class="float-left align-items-center mr-3 not-clickable">
                        <div class="row bar bar1 not-clickable"></div>
                        <div class="row bar bar2 not-clickable"></div>
                        <div class="row bar bar3 not-clickable"></div>
                    </div>
                </div>
                <transition name="fade">
                    <div v-if="dropDown_opened" class="dropdown-content">
                        <a v-on:click="$router.push({ path: '/dashboard/orders' })">
                            <i class="fas fa-tshirt"></i>&nbsp;&nbsp;<span>سفارشات من</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="$router.push({ path: '/dashboard/account' })">
                            <i class="far fa-user"></i>&nbsp;&nbsp;<span>حساب کاربری</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="$router.push({ path: '/dashboard/addresses' })">
                            <i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;<span>آدرس های من</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="$router.push({ path: '/dashboard/bills' })">
                            <i class="fas fa-concierge-bell"></i>&nbsp;&nbsp;<span>صورت حساب ها</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="$router.push({ path: '/dashboard/pricing' })">
                            <i class="fas fa-dollar-sign"></i>&nbsp;&nbsp;<span>قیمت خدمات</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="$router.push({ path: '/dashboard/faq' })">
                            <i class="far fa-question-circle"></i>&nbsp;&nbsp;<span>سوالات متداول</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="$router.push({ path: '/dashboard/help' })">
                            <i class="fas fa-info"></i>&nbsp;&nbsp;<span>راهنما</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="$router.push({ path: '/dashboard/introduce_to_friends' })">
                            <i class="fas fa-share-alt-square"></i>&nbsp;&nbsp;<span>معرفی به دوستان</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="$router.push({ path: '/dashboard/social' })">
                            <i class="fab fa-facebook-square"></i>&nbsp;&nbsp;<span>شبکه های اجتماعی</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="$router.push({ path: '/dashboard/call' })">
                            <i class="fas fa-phone-square"></i>&nbsp;&nbsp;<span>تماس با واش ماش</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a v-on:click="logOut()">
                            <i class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;<span>خروج از حساب</span>
                        </a>
                    </div>
                </transition>
            </div>

            <button v-on:click="$router.push({ path: '/dashboard/new-order' })"
                    class="btn btn-sm btn-info">
                <i class="fas fa-plus"></i>&nbsp;&nbsp;<span>سفارش جدید</span></button>


        </div>

        <div id="main_router_view_container">
            <transition name="fade" mode="out-in">
                <!--<keep-alive>-->
                <router-view id="main_router_view" style="height: 100%"/>
                <!--</keep-alive>-->
            </transition>
        </div>

    </div>
</template>

<script>

    // import Vue from 'vue'
    // import 'popper.js';
    // import 'bootstrap';

    export default {
        name: "Main",
        props: {},
        data() {
            return {
                dropDown_opened: false,
                userPic: '',
                windowHeight: 0,
            }
        },

        watch: {
            // windowHeight(newHeight, oldHeight) {
            windowHeight() {
                this.setViewHeight();
            }
        },

        methods: {

            ShowDropdown: function () {
                const before = this.dropDown_opened;
                this.dropDown_opened = !this.dropDown_opened;
                const after = this.dropDown_opened;

                if (before && !after) {
                    $('#menu').removeClass('change');
                }
                if (!before && after) {
                    $('#menu').addClass('change');
                }
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

                    const activeElement = document.activeElement;
                    const inputs = ['input', 'textarea'];

                    if (activeElement && inputs.indexOf(activeElement.tagName.toLowerCase()) !== -1) {
                        activeElement.focus();
                        console.log('hey !');
                    }
                });
            },


            focusToElementOnKeyboardOpen: function (e) {
                setTimeout(function () {
                    if (e.target.tagName.toLowerCase() === "input" || e.target.tagName.toLowerCase() === "textarea") {
                        e.target.scrollIntoView();
                    }
                }, 500);

            },

        },

        mounted() {

            this.$nextTick(() => {
                window.addEventListener('resize', () => {
                    this.windowHeight = window.innerHeight;
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

            document.addEventListener('focusin', this.focusToElementOnKeyboardOpen);


        },
        destroyed() {
            document.removeEventListener('click', this.documentClick);


            document.removeEventListener('focusin', this.focusToElementOnKeyboardOpen);

            this.$nextTick(() => {
                window.removeEventListener('resize', () => {
                    this.windowHeight = window.innerHeight;
                });
            });
        }

    }

</script>

<style scoped>

    *:focus {
        outline: 0;
    }

    .dropBtn {
        background-color: transparent;
        color: white;
        padding: 5px;
        font-size: 16px;
        border: none;
        cursor: pointer;
    }

    .dropdown {
        /*position: relative;*/
        /*display: inline-block;*/
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
        overflow-y: auto;
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

        /*#main_router_view {*/
        /*height: 91vh;*/
        /*}*/
        /*#navBar {*/
        /*height: 9vh;*/
        /*}*/
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

        /*#main_router_view {*/
        /*height: 94vh;*/
        /*}*/
        /*#navBar {*/
        /*height: 6vh;*/
        /*}*/
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