import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/login' || '/', // 注意这里的逻辑或操作符可能不是你想要的，通常应该是 path: '/login' 或 path: '/'
        name: 'Login',
        meta: { hideNavigation: false },
        component: () => import(/* webpackChunkName: "login" */ '@/components/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        meta: { hideNavigation: false },
        component: () => import(/* webpackChunkName: "register" */ '@/components/Register.vue')
    },
    {
        path: '/index',
        name: 'Home',
        meta: { hideNavigation: true },
        component: () => import(/* webpackChunkName: "home" */ '@/components/index.vue'),
        children: [ // 子路由应该是一个数组
            {
                path: 'home', // 子路由的路径
                name: 'indexHome',
                meta: { hideNavigation: true },
                component: () => import(/* webpackChunkName: "home" */ '@/components/content/Home.vue')
            },
            {
                path:'file',
                name: 'indexFile',
                meta: { hideNavigation: true },
                component: () => import(/* webpackChunkName: "file" */ '@/components/content/File.vue')
            },
            {
                path: 'application',
                name: 'indexApplication',
                meta: { hideNavigation: true },
                component: () => import(/* webpackChunkName: "application" */ '@/components/content/Application.vue')
            },
            {
                path: 'setting',
                name: 'indexSetting',
                meta: { hideNavigation: true },
                component: () => import(/* webpackChunkName: "setting" */ '@/components/content/Setting.vue')
            },
            {
                path: 'user',
                name: 'indexUser',
                meta: { hideNavigation: true },
                component: () => import(/* webpackChunkName: "user" */ '@/components/content/User.vue')
            },
            {
                path: 'about',
                name: 'indexAbout',
                meta: { hideNavigation: true },
                component: () => import(/* webpackChunkName: "about" */ '@/components/content/About.vue')
            },
            // 其他子路由...
        ]
    },
    {
        path: '/',
        redirect: '/login' // 重定向到 /login
    },
    // 其他路由...
];



const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
