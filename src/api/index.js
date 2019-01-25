import Vue from 'vue'
import axios from 'axios'

const products = axios.create({
  baseURL: 'http://localhost:8080/v1/products'
})
const orders = axios.create({
  baseURL: 'http://localhost:8082/v1/orders'
})
const users = axios.create({
  baseURL: 'http://localhost:8083/v1/users'
})

const api = {
  products: products,
  orders: orders,
  users: users
}

Vue.use(function (Vue, options) {
  Vue.prototype.$api = api
})

export default api
