/* eslint-disable */
import Vuex from "vuex";
import Vue from "vue";

import Snackbar from "./modules/Snackbar";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Snackbar
    }
});