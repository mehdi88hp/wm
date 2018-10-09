import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import axios from 'axios'
import VueSession from 'vue-session'

Vue.use(VueSession);

const $ = require('jquery');
window.$ = $;
require('popper.js');
require('bootstrap');


Vue.config.productionTip = false;


Vue.prototype.$BaseUrl = 'http://127.0.0.1:8000';

Vue.prototype.$userData = '';
Vue.prototype.$TOKEN = '';

if (localStorage.getItem('data')) {
    Vue.prototype.$userData = JSON.parse(localStorage.getItem('data'));
    Vue.prototype.$TOKEN = Vue.prototype.$userData['token'];
}

const api = axios.create({baseURL: Vue.prototype.$BaseUrl});
Vue.prototype.$API = api;

Vue.prototype.$initData = function () {

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
                    return true;

                } else {
                    return false;
                }
            }, (error) => {
                console.log(error);
                return false;
            }
        );
};


import Ripple from 'vue-ripple-directive'

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
