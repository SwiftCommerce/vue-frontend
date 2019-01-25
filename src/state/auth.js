export default {
  namespaced: true,
  state: {
    token: null,
    isAuthenticated: false
  },
  mutations: {
    token (state, token) {
      state.token = token
    },
    isAuthenticated: function (state, is) {
      state.isAuthenticated = is
    }
  }
}
