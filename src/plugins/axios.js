/* eslint-disable */
import axios from "axios";

export default {
    install(Vue, options) {
        window.axios = axios;
        axios.defaults.baseURL =
            "https://api.cosmicjs.com/v1/7537c940-d2b3-11e9-a438-415a35e01047/";
    }
};