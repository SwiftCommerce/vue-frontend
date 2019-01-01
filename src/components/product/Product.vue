<template>
  <page :name="product.name ? product.name : ''">
    <category-nav></category-nav>

    <div v-if="loading">
      <div class="d-flex justify-content-center">
        <div id="loading-spinner" class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    <div v-if="error && !loading" class="alert alert-danger" role="alert">
      <p>{{ error }}</p>
    </div>
    <div v-if="product && !loading" class="row">
      <div id="image" class="col-6">
        <p class="text-center">Product Image Here</p>
      </div>
      <div id="product-modifications" class="col-6">
        <div id="product-info" class="row">
          <h5 id="price" class="col-6">{{ price }}</h5>
          <p v-if="manufacturer" class="col-6 text-right">By {{ manufacturer }}</p>
          <hr class="col-12"/>
          <p>{{ product.description }}</p>
        </div>
        <div id="order" class="row">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Quantity</span>
            </div>
            <input v-model="productCount" type="number" class="form-control" placeholder="Qty" aria-label="Quantity" aria-describedby="basic-addon1">
          </div>
          <button type="button" class="btn btn-primary" @click="addToCart()">Add to Cart</button>
        </div>
      </div>
    </div>
    <div v-else></div>
  </page>
</template>

<script>
import Page from '@/components/page/Page'
import CategoryNav from '@/components/page/CategoryNav'

export default {
  components: { Page, CategoryNav },
  data: function () {
    return {
      product: this.$store.state.product,
      error: null,
      loading: true,
      productCount: 0,

      price: null,
      manufacturer: null
    }
  },
  created: function () {
    let sku = this.$route.params.product
    if (this.product.sku === sku) {
      this.loading = false
      this.populate()

      return
    }

    this.$api.products.get(`?sku=${sku}`).then((response) => {
      this.product = response.data.products[0]
      this.populate()

      this.loading = false
    }).catch((error) => {
      this.error = error
      this.loading = false
    })
  },
  methods: {
    populate: function () {
      this.price = this.getPrice()

      this.manufacturer = this.product.attributes.filter((attr) => attr.name === 'manufacturer')[0].value
    },
    getPrice: function () {
      if (!this.product) { return }

      let price = this.product.prices.filter((price) => price.active)[0]
      return this.formattPrice(price)
    },
    formattPrice: function (price) {
      let string = price.cents.toString()

      let locale = window.navigator.language
      let symbol = price.cents.toLocaleString(locale, { style: 'currency', currency: price.currency }).replace(/(\d*[.,]*)+/g, '')

      let roundedString = string.slice(0, string.length - 2) + '.' + string.slice(string.length - 2)
      return symbol + roundedString
    },
    addToCart: function () {
      if (this.productCount < 1) {
        this.error = 'You must have a product count of 1 or more to add it to the cart'
        return
      }

      let cartProduct = {
        count: parseInt(this.productCount),
        product: this.product
      }

      this.$store.commit('addToCart', cartProduct)
    }
  }
}
</script>

<style>
#loading-spinner {
  height: 3em;
  width: 3em;
}
</style>
