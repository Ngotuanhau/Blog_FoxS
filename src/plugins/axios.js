/* eslint-disable */
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
    install(Vue, options) {
        window.axios = axios;
        axios.defaults.baseURL = "http://localhost:1337/";
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