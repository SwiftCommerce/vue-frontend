import Vue from 'vue';
import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';

const products = axios.create({
  baseURL: isProduction ? '/api/products' : 'http://localhost:8080/v1/products'
});
const orders = axios.create({
  baseURL: isProduction ? '/api/orders' : 'http://localhost:8082/v1/orders'
});
const users = axios.create({
  baseURL: 'http://localhost:8083/v1/users'
});

orders.interceptors.response.use(null, function (error) {
  var config = error.config;
  var refresh = JSON.parse(localStorage.getItem('vuex')).auth.refresh;
  if (config && refresh && error.response && error.response.data && error.response.data.reason === 'Expiration claim failed') {
    return users.post('/accessToken', { refreshToken: refresh }).then((response) => {
      config.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
      return axios.request(config);
    });
  }

  return Promise.reject(error);
});

const api = {
  products: products,
  orders: orders,
  users: users
};

Vue.use(function (Vue, options) {
  Vue.prototype.$api = api;
});

export default api;
