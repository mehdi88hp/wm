<template>

    <div id="p_container" class="row d-flex justify-content-between">

        <div class="page-number d-flex justify-content-center align-items-center" style="width: 35px;"
             :class="{ 'none-selected-page': currentPage !== 1 }"
             @click="Pervious()">
            <i class="fas fa-chevron-right"></i>
        </div>

        <div class="row">
            <div v-for="(row, key) in pagesToShow" :key="row+key"
                 :class="{
             'none-selected-page': parseInt(row) !== parseInt(currentPage) && row !== '...',
             'selected-page': parseInt(row) === parseInt(currentPage),
             }"
                 class="page-number"
                 @click="Select(row)">{{ toPersianNumber(row) }}
            </div>
        </div>

        <div class="page-number d-flex justify-content-center align-items-center" style="width: 35px;"
             :class="{ 'none-selected-page': currentPage !== pagesCount }"
             @click="Next()">
            <i class="fas fa-chevron-left"></i>
        </div>

    </div>


</template>

<script>
    export default {
        name: 'pagination',
        props: {
            pagesCount: Number,
            currentPage: Number,

        },
        data() {
            return {
                pagesToShow: [],

                windowWidth: '',

            }
        },
        computed: {},

        watch: {
            pagesCount() {
                this.CalculatePages();
            },
            currentPage() {
                this.CalculatePages();
            },
            windowWidth() {
                this.CalculatePages();
            },
        },

        methods: {

            CalculatePages: function (CurrentPage = this.currentPage, PagesCount = this.pagesCount) {

                this.$nextTick(function () {

                    // console.log('current = ' + CurrentPage);

                    const pagesCount = parseInt(PagesCount);
                    const currentPage = parseInt(CurrentPage);

                    let indicator;
                    let digits_count = pagesCount.toString().length;

                    (digits_count > 2) ? (indicator = digits_count * 10) : (indicator = digits_count * 20);

                    let countPagesToShow = Math.floor(document.getElementById('p_container').offsetWidth / indicator) - 2;

                    if (window.innerWidth < 576) {
                        countPagesToShow -= 2;
                    }
                    // console.log(countPagesToShow);

                    const array = [];

                    if (countPagesToShow < 3 && pagesCount > countPagesToShow) {
                        array.push(currentPage);

                    } else if (countPagesToShow < 5 && pagesCount > countPagesToShow) {
                        if (currentPage !== 1) array.push('...');
                        array.push(currentPage);
                        if (currentPage !== pagesCount) array.push('...');

                    } else if (pagesCount > countPagesToShow) {

                        const beforeCount = currentPage - 1;
                        const afterCount = pagesCount - currentPage;


                        const condition = Math.floor(countPagesToShow / 2);

                        if (beforeCount > condition && afterCount > condition) {
                            countPagesToShow = countPagesToShow - 4;
                        } else {
                            countPagesToShow = countPagesToShow - 1;
                        }

                        let startFrom = 1;
                        if (beforeCount > condition) {
                            const positionOfCurrent = Math.ceil(countPagesToShow / 2);
                            startFrom = currentPage - positionOfCurrent + 1;
                            array.push(1);
                            array.push('...');
                        }

                        for (let j = 1; j <= countPagesToShow; j++) {
                            array.push(startFrom);
                            startFrom++;
                            if (startFrom > pagesCount) break;
                        }

                        if (afterCount > condition) {
                            array.push('...');
                            array.push(pagesCount);
                        }


                    } else {
                        for (let i = 1; i <= pagesCount; i++) {
                            array.push(i);
                        }

                    }


                    this.pagesToShow = array;

                    // console.log(array)


                });

            },

            Next: function () {
                if (this.currentPage !== this.pagesCount) {
                    this.$emit('select', this.currentPage + 1);
                }

            },

            Pervious: function () {
                if (this.currentPage !== 1) {
                    this.$emit('select', this.currentPage - 1);
                }

            },

            Select: function (page) {
                if (parseInt(page)) {
                    this.$emit('select', page);
                }
            },

            toPersianNumber: function (n) {
                const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
                return n
                    .toString()
                    .replace(/\d/g, x => farsiDigits[x]);
            },

        },
        created() {
            this.CalculatePages();

        },
        destroyed() {
            this.$nextTick(() => {
                window.removeEventListener('resize', () => {
                    this.windowHeight = window.innerHeight;
                });
            });
        },
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('resize', () => {
                    this.windowWidth = window.innerWidth;
                });
            });

        },
        beforeMount() {

        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    *:focus {
        outline: 0;
    }

    .page-number {
        background-color: transparent;
        color: #0c5460;
        min-width: 35px;
        height: 35px;
        text-align: center;
        vertical-align: middle;
        line-height: 35px;
        border-radius: 5px;
        margin: 0 1px;
        word-break: keep-all;
        padding: 0 5px;
    }

    .none-selected-page {
        -o-transition: .3s;
        -ms-transition: .3s;
        -moz-transition: .3s;
        -webkit-transition: .3s;
        transition: .3s;
    }

    .none-selected-page:hover {
        background-color: #0c5460;
        color: white;
    }

    .selected-page {
        background-color: #0c5460;
        color: white;
    }


</style>
