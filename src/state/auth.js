export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('auth/token'),
    refresh: localStorage.getItem('auth/refresh'),
    isAuthenticated: false
  },
  mutations: {
    token (_, token) {
      localStorage.setItem('auth/token', token)
    },
    refresh (_, refresh) {
      localStorage.setItem('auth/refresh', refresh)
    },
    isAuthenticated: function (state, is) {
      state.isAuthenticated = is
    }
  }
}
