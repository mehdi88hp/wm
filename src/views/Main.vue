<template>
    <div class="vh-100 vw-100 text-right">
        <nav class="navbar navbar-expand-lg navbar-light bg-light py-0 px-2 shadow-sm sticky-top" dir="rtl">

            <!--<a class="navbar-brand float-right d-lg-none d-xl-none" href="#">واش ماش</a>-->

            <div class="dropdown openDropDown">
                <button id="dropBtn" v-on:click="ShowDropdown()"
                        class="dropBtn openDropDown row align-items-center mr-0 nav-items-height">
                    <img id="userPic" v-bind:src="userPic"
                         class="rounded-circle bg-dark openDropDown float-right" height="40" width="40"/>
                    <div id="menu" class="float-left align-items-center mr-3">
                        <div class="bar bar1"></div>
                        <div class="bar bar2"></div>
                        <div class="bar bar3"></div>
                    </div>
                </button>
                <transition name="fade">
                    <div v-if="dropDown_opened" class="dropdown-content">
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


            <button class="navbar-toggler float-right ml-3" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse text-right" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active row align-items-center mx-1">
                        <!-- for lg and xl -->
                        <button v-on:click="$router.push({ path: '/dashboard/orders' })"
                                class="btn btn-light btn-sm mb-3 mb-lg-0 mb-xl-0 d-none d-lg-block">
                            <span>سفارشات من</span></button>

                        <!-- for sm and md -->
                        <a class="nav-link d-lg-none" v-on:click="$router.push({ path: '/dashboard/orders' })">
                            <div class="">سفارشات من</div>
                        </a>
                    </li>
                    <li class="nav-item row align-items-center mx-1">
                        <button v-on:click="$router.push({ path: '/dashboard/new-order' })"
                                class="btn btn-info btn-sm mb-3 mb-lg-0 mb-xl-0">
                            <i class="fas fa-plus"></i>&nbsp;&nbsp;<span>سفارش جدید</span></button>
                    </li>
                </ul>
            </div>
        </nav>


        <transition name="fade" mode="out-in">
            <keep-alive>
                <router-view style="height: 94vh;"/>
            </keep-alive>
        </transition>

    </div>
</template>

<script>

    // import Vue from 'vue'
    // import 'popper.js';
    // import 'bootstrap';

    export default {
        name: "Main",
        props: {
            // component: String
        },
        data() {
            return {
                dropDown_opened: false,
                userPic: '',
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
            }
        },

        beforeMount() {

            if (this.$router.currentRoute.path === '/dashboard' || this.$router.currentRoute.path === '/dashboard/') {
                this.$router.push({path: '/dashboard/new-order'});
            }

            if (this.$userData['image']) {
                this.userPic = this.$userData['image'];
            } else {
                this.userPic = require('../assets/userPic.png');
            }

        },
        created() {
            document.addEventListener('click', this.documentClick);
        },
        destroyed() {
            document.removeEventListener('click', this.documentClick);
        }

    }

</script>

<style scoped>

    *:focus {
        outline: 0;
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