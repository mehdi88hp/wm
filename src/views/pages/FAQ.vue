<template>

    <div class="container">

        <div class="row h-auto d-flex justify-content-center p-2 px-lg-0 py-lg-5">

            <div class="accordion col-12 col-lg-8 px-0" id="accordion" dir="rtl">

                <div v-for="(faq, key) in $userData.FAQ" :key="key">

                    <div class="rounded bg-info p-4 text-white shadow-lg mb-4 font-weight-bold" :id="'heading'+key"
                         data-toggle="collapse"
                         :data-target="'#collapse'+key"
                         aria-expanded="false" :aria-controls="'collapse'+key">
                        <h5 class="col-12 text-right">
                            {{ faq.question }}
                        </h5>
                    </div>

                    <div class="collapse" :id="'collapse'+key" :class="{show: !key}" :aria-labelledby="'heading'+key"
                         data-parent="#accordion">
                        <div class="rounded bg-white py-5 px-5 mb-4 text-justify shadow-lg">
                            {{ faq.answer }}
                        </div>
                    </div>
                </div>


            </div>
        </div>


    </div>

</template>


<script>
    export default {
        name: "faq",
        data() {
            return {

                sort: 'men',
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

            toMoneyFormat: function (number) {
                return new Intl.NumberFormat('fa', {maximumSignificantDigits: 3}).format(number)
            }
        },
        beforeMount: function () {

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