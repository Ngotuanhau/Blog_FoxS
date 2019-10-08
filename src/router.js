/* eslint-disable */

import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Login from "./views/Auth/Login";
import Categories from "./views/Pages/ContainerPages";
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
                    path: "/categories/:id",
                    name: "categories",
                    component: Categories
                },
                {
                    path: "/page/:id",
                    name: "page",
                    component: Page
                }
            ]
        }
    ],

    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve, reject) => {
            if (to.hash) {
                return {
                    selector: to.hash
                };
            }
            setTimeout(() => {
                resolve({ x: 0, y: 0 });
            }, 500);
        });
    }
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