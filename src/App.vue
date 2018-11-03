<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>

    export default {
        name: "App",
        props: {
            // component: String
        },
        data() {
            return {}
        },

        methods: {
            focusToElementOnKeyboardOpen: function (e) {
                setTimeout(function () {
                    const element = e.target;
                    if (element.tagName.toLowerCase() === "input" || element.tagName.toLowerCase() === "textarea") {
                        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                        if (!isSafari) {
                            element.scrollIntoView(true);
                        }
                    }
                }, 500);

            }
        },

        mounted() {},
        beforeMount() {

        },
        created() {
            // time schedule to refresh data
            const THIS = this;
            const loop = setInterval(function () {
                if (!localStorage.getItem('data')) {
                    clearInterval(loop);
                    return;
                }

                THIS.$initData();


            }, 120000);

            document.addEventListener('focusin', this.focusToElementOnKeyboardOpen);

        },
        destroyed() {
            document.removeEventListener('focusin', this.focusToElementOnKeyboardOpen);
        }


    }
</script>

<style>

    /*@import "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css";*/
    @import '../public/css/bootstrap.min.css';
    @import '../public/css/style.css';
    @import '../public/fontAwesome/css/all.css';

</style>
