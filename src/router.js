import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import * as process from "../.eslintrc";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'SplashScreen',
            component: () => import('./views/SplashScreen.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('./views/Login/Login.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Main,
            children: [
                {
                    path: 'orders',
                    component: () => import('./views/pages/Orders.vue')
                },
                {
                    path: 'new-order',
                    component: () => import('./views/pages/NewOrder.vue')
                },
                {
                    path: 'account',
                    component: () => import('./views/pages/Account.vue')
                },
                {
                    path: 'about',
                    component: () => import('./views/pages/About.vue')
                },
            ]
        },
    ]
})
