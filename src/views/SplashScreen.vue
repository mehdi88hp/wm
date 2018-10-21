<template>
    <div class="container">
        <div class="row align-items-center vh-100 d-flex justify-content-center align-items-center">
            <div class="col-12 col-lg-6">
                <img src="../assets/logo.png" class="col-12 LOGO img-fluid bg-white shadow-lg rounded"/>

                <div class="col-12 d-flex justify-content-center">
                <div class="col-8 px-0 progress mt-4">
                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-info"
                         role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                         style="width: 100%"></div>
                </div>
                </div>

            </div>
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
                setTimeout(function () {

                    if (localStorage.getItem('data')) {
                        THIS.$router.push({path: '/dashboard/new-order'});

                    } else {
                        THIS.$router.push({path: '/login'});

                    }

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

    .LOGO {
        -o-transition: .3s;
        -ms-transition: .3s;
        -moz-transition: .3s;
        -webkit-transition: .3s;
        transition: .3s;
    }

    .LOGO:hover {
        transform: scale(1.1);

    }

</style>