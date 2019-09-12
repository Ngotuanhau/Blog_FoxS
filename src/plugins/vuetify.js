/* eslint-disable */

import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: "mdi",
        values: {
            heart: "mdi-heart",
            eye: "mdi-eye",
            eye_off: "mdi-eye-off"
        }
    }
});