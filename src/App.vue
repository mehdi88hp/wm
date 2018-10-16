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

        methods: {},

        mounted() {},
        beforeMount() {

        },
        created() {
            // document.title = 'واش ماش';
            //
            // var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            // link.type = 'image/x-icon';
            // link.rel = 'shortcut icon';
            // link.href = require('../src/assets/icon.png');
            // document.getElementsByTagName('head')[0].appendChild(link);
        }

    }
</script>

<style>

    @import '../public/css/bootstrap.min.css';
    @import '../public/css/style.css';
    @import '../public/fontAwesome/css/all.css';

</style>
