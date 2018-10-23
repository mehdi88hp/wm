<template>

    <div class="container">
        <div class="row h-auto d-flex justify-content-center p-2 px-lg-0 py-lg-5">
            <div class="card h-auto shadow shadow-sm col-12 col-lg-8 text-right">

                <div class="card-body p-2" dir="rtl">

                    <div class="row">
                        <div class="col">
                            <div v-ripple
                                 class="col-12 rounded p-3 text-center card-sort"
                                 :class="{ 'card-sort': sort !== 'men', 'card-sort-clicked': sort === 'men' }"
                                 @click="doSort('men')">
                                مردانه
                            </div>
                        </div>
                        <div class="col">
                            <div v-ripple
                                 class="col-12 rounded p-3 text-center card-sort"
                                 :class="{ 'card-sort': sort !== 'women', 'card-sort-clicked': sort === 'women' }"
                                 @click="doSort('women')">
                                زنانه
                            </div>
                        </div>
                        <div class="col">
                            <div v-ripple
                                 class="col-12 rounded p-3 text-center card-sort"
                                 :class="{ 'card-sort': sort !== 'home', 'card-sort-clicked': sort === 'home' }"
                                 @click="doSort('home')">
                                منسوجات خانگی
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <table class="table table-striped table-hover">
                            <thead class="bg-dark text-white">
                            <tr>
                                <th>نام</th>
                                <th>سرویس</th>
                                <th>دسته بندی</th>
                                <th>قیمت (ریال)</th>
                            </tr>
                            </thead>
                            <tbody style="word-break:break-all;">
                            <tr v-for="(service, key) in services" :key="key">
                                <td>{{ service.title }}</td>
                                <td>{{ service.service }}</td>
                                <td>{{ service.gender }}</td>
                                <td style="word-break:keep-all;">{{ toMoneyFormat(service.price) }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>
    </div>

</template>


<script>
    export default {
        name: "pricing",
        data() {
            return {

                sort: 'men',

                services: [],

                men_list: [],
                women_list: [],
                home_list: [],
            }
        },
        computed: {
        },

        components: {
        },

        methods: {

            doSort: function (sort) {
                this.sort = sort;
                if (sort === 'men') {
                    if (Array.isArray(this.men_list) && this.men_list.length) {
                        this.services = this.men_list;

                    } else {
                        this.services = this.men_list = this.$userData.services.filter(function (service) {
                            return service.gender === 'مردانه';
                        }).slice(0,11);

                    }

                } else if (sort === 'women') {
                    if (Array.isArray(this.women_list) && this.women_list.length) {
                        this.services = this.women_list;

                    } else {
                        this.services = this.women_list = this.$userData.services.filter(function (service) {
                            return service.gender === 'زنانه';
                        }).slice(0,11);

                    }

                } else if (sort === 'home') {
                    if (Array.isArray(this.home_list) && this.home_list.length) {
                        this.services = this.home_list;

                    } else {
                        this.services = this.home_list = this.$userData.services.filter(function (service) {
                            return service.gender === 'منسوجات خانگی';
                        }).slice(0,11);

                    }

                }
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
            this.services = this.men_list = this.$userData.services.filter(function (service) {
                return service.gender === 'مردانه';
            }).slice(0,11);
        },
        mounted: function () {
        },
    }
</script>


<style scoped>

    *:focus {
        outline: 0;
    }

    .card-sort {
        color: #138496;
        background-color: #ffffff;
        -o-transition: .5s;
        -ms-transition: .5s;
        -moz-transition: .5s;
        -webkit-transition: .5s;
        transition: .5s;
    }

    .card-sort:hover {
        cursor: pointer;
        color: #ffffff;
        background-color: #138496;
    }

    .card-sort-clicked {
        color: #ffffff;
        background-color: #138496;
    }

    .card-sort-clicked:hover {
        cursor: pointer;
    }

    hr {
        border-top: 1px solid #1e7e34;
        -o-transition: .3s;
        -ms-transition: .3s;
        -moz-transition: .3s;
        -webkit-transition: .3s;
        transition: .3s;
    }


</style>