export default {
  namespaced: true,
  state: {
    token: null,
    refresh: null
  },
  mutations: {
    token (state, token) {
      state.token = token
    },
    refresh (state, refresh) {
      state.refresh = refresh
    }
  },
  getters: {
    authenticated (state) {
      return !(state.token == null)
    }
  }
}
