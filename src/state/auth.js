export default {
  namespaced: true,
  state: {
    token: null,
    refresh: null,
    isAuthenticated: false
  },
  mutations: {
    token (state, token) {
      state.token = token
    },
    refresh (state, refresh) {
      state.refresh = refresh
    },
    authenticated (state, authenticated) {
      state.isAuthenticated = authenticated
    }
  }
}
