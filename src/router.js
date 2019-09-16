/* eslint-disable */

import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Login from "./views/Auth/Login";
import Pages from "./views/Pages/ContainerPages";
import Page from "./views/Page/ContainerPage";

Vue.use(Router);

let router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/",
            component: {
                render: h => h("router-view")
            },
            children: [{
                    path: "/",
                    name: "home",
                    component: Home
                },
                {
                    path: "/pages/:slug",
                    name: "pages",
                    component: Pages
                },
                {
                    path: "/page/:slug",
                    name: "page",
                    component: Page
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isAuthenticated) {
            return next({
                path: "/",
                params: {
                    nextUrl: to.fullPath
                }
            });
        }
    }
    return next();
});

export default router;