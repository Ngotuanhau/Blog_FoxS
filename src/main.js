/* eslint-disable */

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import axios from "./plugins/axios";
import "./vee-validate";
import VueMoment from "vue-moment";
import { createProvider } from "./vue-apollo";

Vue.use(VueMoment);
Vue.use(axios);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    apolloProvider: createProvider(),
    render: h => h(App)
}).$mount("#app");