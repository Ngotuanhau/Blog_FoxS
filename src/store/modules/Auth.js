/* eslint-disable */
import VueCookies from "vue-cookies";

const state = {
    token: VueCookies.get("token") || ""
};

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
};

const actions = {
    login({ commit }, user) {
        return new Promise((resolve, reject) => {
            axios
                .post("https://api.cosmicjs.com/v1/authenticate", user)
                .then(response => {
                    const token = response.data.token;
                    VueCookies.set("token", token);
                    commit("setToken", token);
                    resolve(response);
                })
                .catch(error => {
                    commit("setError", error.message);
                    VueCookies.remove("token");
                    reject(error);
                });
        });
    },

    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit("setLogout");
            VueCookies.remove("token");
            resolve();
        });
    }
};

const mutations = {
    setToken(state, token) {
        state.token = token;
    },

    setError(state, error) {
        state.error = error;
    },

    setLogout(state) {
        state.status = "";
        state.token = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};