import Vue from 'vue'
import axios from 'axios'

const products = axios.create({
  baseURL: 'http://localhost:8080/v1/products'
})

const api = {
  products: products
}

Vue.use(function (Vue, options) {
  Vue.prototype.$api = api
})

export default api
