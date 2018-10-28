<template>

    <div class="container">

        <div class="row h-auto d-flex justify-content-center p-3 px-lg-0 py-lg-5">

            <div class="accordion col-12 col-lg-8 px-0" id="accordion" dir="rtl">

                <div v-for="(faq, key) in $userData.FAQ" :key="key">

                    <div class="rounded bg-info p-4 text-white shadow-lg mb-4 font-weight-bold"
                         data-toggle="collapse"
                         aria-expanded="true">
                        <h5 class="col-12 text-right">
                            {{ faq.question }}
                        </h5>
                    </div>

                    <div class="collapse show"
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

            }
        },
        computed: {

        },

        components: {
        },

        methods: {
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

    hr {
        border-top: 1px solid #1e7e34;
        -o-transition: .3s;
        -ms-transition: .3s;
        -moz-transition: .3s;
        -webkit-transition: .3s;
        transition: .3s;
    }


</style>