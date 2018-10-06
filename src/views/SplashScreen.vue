<template>
    <div class="container">
        <div class="row align-items-center h-100">
            <div class="col"></div>
            <div id="loader" class="col-md-8 col-sm-10">
                <h4 class="flex-fill text-center">Loading !</h4>
            </div>
            <div class="col"></div>
        </div>

    </div>
</template>

<script>

    export default {
        name: "SplashScreen",
        data() {
            return {
                // dynamicComponent: 'active-component'
            }
        },
        methods: {
            setDelay: function () {
                const delayInMilliseconds = 2000;

                const THIS = this;
                setTimeout(function() {
                    THIS.$router.push({ path: '/login' });
                }, delayInMilliseconds);
            },
        },
        beforeMount: function () {
            this.setDelay();
        }
    }
</script>

<style scoped>
    @import '../../public/css/bootstrap.min.css';

    #loader {
        position: absolute;
        top: 40%;
    }

</style>