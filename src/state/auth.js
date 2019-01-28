export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('auth/token'),
    refresh: localStorage.getItem('auth/refresh')
  },
  mutations: {
    token (_, token) {
      localStorage.setItem('auth/token', token)
    },
    refresh (_, refresh) {
      localStorage.setItem('auth/refresh', refresh)
    }
  },
  getters: {
    authenticated (state) {
      return !(state.token == null)
    }
  }
}
