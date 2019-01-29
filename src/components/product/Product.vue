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
        <img :src="imgaeURL()" />
      </div>
      <div id="product-modifications" class="col-6">
        <div id="product-info" class="row">
          <h5 id="price" class="col-6">{{ price || 'Not for Sale' }}</h5>
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

          <span>
            <button v-if="price && productCount > 0" id="add-to-cart" type="button" class="btn btn-primary" @click="addToCart()">Add to Cart</button>
            <button v-else type="button" class="btn btn-primary" disabled>Add to Cart</button>

            <font-awesome id="added-to-cart" class="text-success" style="display: none;" icon="check" />
          </span>
        </div>
      </div>
    </div>
    <div v-else></div>
  </page>
</template>

<script>
import Page from '@/components/page/Page'
import CategoryNav from '@/components/page/CategoryNav'

import currency from '@/currency'

export default {
  components: { Page, CategoryNav },
  data: function () {
    return {
      product: this.$store.state.product,
      error: null,
      loading: true,
      productCount: 1,

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
      this.loading = false
      if (error.response && error.response.data) {
        this.error = new Error(error.response.data.reason)
      } else {
        this.error = error
      }
    })
  },
  methods: {
    populate: function () {
      this.price = this.getPrice()

      let manufacturer = this.product.attributes.filter((attr) => attr.name === 'manufacturer')[0]
      if (manufacturer) {
        this.manufacturer = manufacturer.value
      }
    },
    imgaeURL: function () {
      return this.product.attributes.filter((attr) => attr.name === 'image')[0] || require('@/assets/fa-image.png')
    },
    getPrice: function () {
      if (!this.product) { return }

      let price = currency.getPrice(this.product.prices)
      if (!price) { return undefined }

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
      /* eslint-disable no-undef */
      $('#add-to-cart').hide()
      $('#added-to-cart').show()

      let cartProduct = {
        count: parseInt(this.productCount),
        product: this.product
      }

      this.$store.commit('cart/add', cartProduct)

      window.setTimeout(() => {
        $('#add-to-cart').show()
        $('#added-to-cart').hide()
      }, 450)
    }
  }
}
</script>

<style>
#loading-spinner {
  height: 3em;
  width: 3em;
}

#added-to-cart {
  height: 2em;
  width: 2em;
  padding: 0.5 1em;
}
</style>
