import Vue from 'vue'
import axios from 'axios'

const products = axios.create({
  baseURL: 'http://localhost:8080/v1/products'
})
const orders = axios.create({
  baseURL: 'http://localhost:8082/v1/orders'
})

const api = {
  products: products,
  orders: orders
}

Vue.use(function (Vue, options) {
  Vue.prototype.$api = api
})

export default api
