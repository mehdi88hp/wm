import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import VueSession from 'vue-session'

Vue.use(VueSession);

Vue.config.productionTip = false;


Vue.prototype.$BaseUrl = 'http://127.0.0.1:8000';

Vue.prototype.$userData = JSON.parse(localStorage.getItem('data'));
Vue.prototype.$TOKEN = Vue.prototype.$userData['token'];


import axios from 'axios'

const api = axios.create({baseURL: Vue.prototype.$BaseUrl});
Vue.prototype.$API = api;


const $ = require('jquery');
window.$ = $;
require('popper.js');
require('bootstrap');


import Ripple from 'vue-ripple-directive'
Vue.directive('ripple', Ripple);


new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
