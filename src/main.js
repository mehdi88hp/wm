import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import axios from 'axios'
import VueSession from 'vue-session'
import VueLayers from 'vuelayers'// openLayers for map
import 'vuelayers/lib/style.css'
import Ripple from 'vue-ripple-directive'

// const $ = require('jquery');
// window.$ = $;
// require('popper.js');
// require('bootstrap');

import $ from 'jquery'

window.$ = $;
import 'popper.js'
import 'bootstrap'


// DEFINING GLOBAL VARIABLES AND FUNCTIONS

// Vue.prototype.$ApiBaseUrl = 'http://www.washmash.com/washmash_test/public';
Vue.prototype.$ApiBaseUrl = 'http://127.0.0.1:8000';

Vue.prototype.$userData = '';
Vue.prototype.$TOKEN = '';
if (localStorage.getItem('data')) {
    Vue.prototype.$userData = JSON.parse(localStorage.getItem('data'));
    Vue.prototype.$TOKEN = Vue.prototype.$userData['token'];
}

const api = axios.create({baseURL: Vue.prototype.$ApiBaseUrl});
Vue.prototype.$API = api;

Vue.prototype.$initData = function (callBack) {
    let formData = new FormData();
    formData.append('token', Vue.prototype.$TOKEN);
    api.post(
        '/api/v5/user/Init', formData,
        {
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(
            (response) => {
                if (parseInt(response.data.code) === 1) {
                    console.log(response.data);
                    Vue.prototype.$userData = response.data;
                    localStorage.setItem('data', JSON.stringify(response.data));
                    callBack(response.data);
                }
            }, (error) => {
                console.log(error);
            }
        );
};


Vue.config.productionTip = false;
Vue.use(VueLayers);
Vue.use(VueSession);
Vue.directive('ripple', Ripple);


new Vue({
    router,
    render: h => h(App),
    methods: {
        doInit: function () {
            alert('aaa');
        }
    }
}).$mount('#app');
