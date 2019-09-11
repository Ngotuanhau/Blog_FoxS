/* eslint-disable */

import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

let router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
        path: "/",
        component: {
            render: h => h("router-view")
        },
        children: [{
            path: "/",
            name: "home",
            component: Home
        }]
    }]
});

export default router;