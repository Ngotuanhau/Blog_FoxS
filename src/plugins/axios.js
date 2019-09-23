/* eslint-disable */
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
    install(Vue, options) {
        window.axios = axios;
        axios.defaults.baseURL =
            "https://api.cosmicjs.com/v1/7537c940-d2b3-11e9-a438-415a35e01047/";
        axios.interceptors.request.use(
            config => {
                const token = VueCookies.get("token");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            function(error) {
                return Promise.reject(error);
            }
        );
    }
};