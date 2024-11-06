import { createStore } from 'vuex';

export default createStore({
    state: {
        isAuthenticated: false,
        token: null,
    },
    mutations: {
        setAuth(state, token) {
            state.token = token;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
        },
    },
    actions: {
        login({ commit }, token) {
            commit('setAuth', token);
            localStorage.setItem('token', token);
        },
        logout({ commit }) {
            commit('logout');
            localStorage.removeItem('token');
        },
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        token: (state) => state.token,
    },
});
