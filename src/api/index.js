import axios from 'axios'

const products = axios.create({
  baseURL: 'http://localhost:8080/v1/products'
})

export default {
  products: products
}
