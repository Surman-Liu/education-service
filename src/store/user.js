const state = {
    isLogin: false,
    user: {},
}

const getters = {

}

const mutations = {
    setIsLogin(state, isLogin) {
        state.isLogin = isLogin;
    },
    setUser(state, user) {
        state.user = user;
    }
}

const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};

