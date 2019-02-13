export default {
  namespaced: true,
  state: [],
  mutations: {
    add (state, item) {
      var index = state.findIndex((i) => i.product.sku === item.product.sku);
      if (index >= 0) {
        state[index].count += item.count;
      } else {
        state.push(item);
      }
    },
    remove (state, sku) {
      var index = state.findIndex((item) => item.product.sku === sku);
      state.splice(index, 1);
    },
    itemCount (state, item) {
      var index = state.findIndex((i) => i.product.sku === item.product.sku);
      state[index].count = item.count;
    },
    empty (state) {
      state.length = 0;
    }
  }
};
