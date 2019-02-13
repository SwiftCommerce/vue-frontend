export default {
  namespaced: true,
  state: {
    billing: null,
    shipping: null
  },
  mutations: {
    billing (state, address) {
      state.billing = address;
    },
    shipping (state, address) {
      state.shipping = address;
    }
  }
};
