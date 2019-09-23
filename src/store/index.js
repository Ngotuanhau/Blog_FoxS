/* eslint-disable */
import Vuex from "vuex";
import Vue from "vue";

import Snackbar from "./modules/Snackbar";
import Auth from "./modules/Auth";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Snackbar,
        Auth
    }
});