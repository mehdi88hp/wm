import Vue from 'vue'
import Router from 'vue-router'
// import auth from './middleware/auth'
import Main from './views/Main.vue'

Vue.use(Router);

const router = new Router({
    mode: 'hash',
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
            path: '/sign-up',
            name: 'SingUp',
            component: () => import('./views/SignUp.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Main,

            children: [
                {
                    path: 'orders',
                    component: () => import('./views/pages/Orders.vue'),
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
                    path: 'addresses',
                    component: () => import('./views/pages/Addresses.vue')
                },
                {
                    path: 'bills',
                    component: () => import('./views/pages/Bills.vue')
                },
                {
                    path: 'pricing',
                    component: () => import('./views/pages/Pricing.vue')
                },
                {
                    path: 'faq',
                    component: () => import('./views/pages/FAQ.vue')
                },
                {
                    path: 'help',
                    component: () => import('./views/pages/Help.vue')
                },
                {
                    path: 'introduce_to_friends',
                    component: () => import('./views/pages/IntroduceToFriends.vue')
                },
                {
                    path: 'social',
                    component: () => import('./views/pages/Social.vue')
                },
                {
                    path: 'call',
                    component: () => import('./views/pages/Call.vue')
                },
            ]
        },

        {
            path: '*',
            name: '404',
            component: () => import('./views/404.vue'),
        }
    ]
});

// global middleware for auth
router.beforeEach(function (to, from, next) {

    if (to.query.refresh) {
        console.log('YES');
        Vue.prototype.$initData(function () {
            AuthMiddleware(to, next);

        })
    } else {
        AuthMiddleware(to, next);

    }
});

function AuthMiddleware(to, next) {

    if (!localStorage.getItem('data')) {
        if (to.path !== '/login' && to.path !== '/login/'
        && to.path !== '/sign-up' && to.path !== '/sign-up/' && to.path !== '/' && to.path !== '') {
            return next('/login');
        }
    }

    return next();
}

export default router;
