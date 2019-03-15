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
  baseURL: isProduction ? '/api/users' : 'http://localhost:8083/v1/users'
});
const addresses = axios.create({
  baseURL: isProduction ? '/api/addresses' : 'http://localhost:8084/v1/addresses'
});

function tokenUpater (message, key) {
  return async function (error) {
    var config = error.config;
    var refresh = JSON.parse(localStorage.getItem('vuex')).auth.refresh;
    if (config && refresh && error.response && error.response.data && error.response.data[key] === message) {
      const response = await users.post('/current/accessToken', { refreshToken: refresh });
      config.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
      return axios.request(config);
    }

    return Promise.reject(error);
  };
}

orders.interceptors.response.use(null, tokenUpater('Expiration claim failed', 'reason'));
users.interceptors.response.use(null, tokenUpater('Expiration claim failed', 'error'));

const api = {
  products: products,
  orders: orders,
  users: users,
  addresses: addresses
};

Vue.use(function (Vue, _) {
  Vue.prototype.$api = api;
});

export default api;
