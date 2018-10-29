<template>

    <div class="container">
        <div class="row h-auto d-flex justify-content-center p-2 px-lg-0 py-lg-5">
            <div class="card h-auto shadow shadow-sm col-12 col-lg-8 text-right">

                <div class="card-body p-2" dir="rtl">

                    <div class="row">
                        <div class="col-12 p-0">
                            <input id="search_input" class="form-control" type="text" placeholder="جست جو ..." @input="doSearch()"/>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <table class="table table-hover table-borderless col-12"
                               :class="{'table-striped': !$parent.isMobileDevice}">
                            <thead class="bg-dark text-white">
                            <tr>
                                <th>نام</th>
                                <th>سرویس</th>
                                <th>دسته بندی</th>
                                <th>قیمت (ریال)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(service, key) in pages[currentPage-1]" :key="key">
                                <td data-label="نام">{{ service.title }}</td>
                                <td data-label="سرویس">{{ service.service }}</td>
                                <td data-label="دسته بندی">{{ service.gender }}</td>
                                <td data-label="قیمت (ریال)">{{ toMoneyFormat(service.price) }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="row d-flex justify-content-center">
                        <h5 v-if="searchNoResult" class="text-danger my-3">نتیجه ای یافت نشد</h5>
                    </div>

                    <div class="row d-flex justify-content-center mt-2">
                        <div class="col-12 col-md-6">
                            <pagination
                                    :pagesCount="pagesLength"
                                    :currentPage="currentPage"
                                    v-on:select="currentPage = $event"/>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>

</template>


<script>
    import Pagination from "../../components/Pagination";

    export default {
        name: "pricing",
        data() {
            return {

                currentPage: 1,

                searchNoResult: false,

                services: [],
                searchedServices: [],

            }
        },
        computed: {

            pages() {
                return this.chunk(this.searchedServices, 10);
            },
            pagesLength() {
                return this.pages.length;
            },

        },

        watch: {

        },

        components: {
            Pagination
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

            doSearch: function () {
                const word = document.getElementById('search_input').value.trim();
                const THIS = this;
                this.searchedServices = this.services.filter(function (row) {
                    return row.title.indexOf(word) !== -1
                        || row.service.indexOf(word) !== -1
                        || row.gender.indexOf(word) !== -1
                        || THIS.toMoneyFormat(row.price).indexOf(word) !== -1;
                });
                this.currentPage = 1;

                this.searchNoResult = !this.searchedServices.length;

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
            this.searchedServices = this.services = this.$userData.services;
        },
        mounted: function () {
        },
    }
</script>


<style scoped>

    *:focus {
        outline: 0;
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