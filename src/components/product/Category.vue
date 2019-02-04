<template>
  <page :name="pageName">
    <category-nav></category-nav>

    <div v-if="error" id="error">
      <div class="alert alert-danger" role="alert">
        <p>{{ error }}</p>
      </div>
    </div>

    <div v-else-if="products.length === 0 && !loading" id="no-products">
      <div class="alert alert-warning" role="alert">
        <p>No products found in category '{{ $route.params.category }}'</p>
      </div>
    </div>

    <div v-else-if="products" id="products">
      <div class="list-group list-group-flush">
        <router-link
          v-for="product in products"
          :key="product.sku"
          :to="{ name: 'Product', params: { product: product.sku}}"
          @click.native="setProduct(product)"
          class="product list-group-item list-group-item-action"
        >
          <div class="col-3 product-image-container">
            <img :src="imageURL(product)" class="product-image">
          </div>
          <div class="col-9 product-description">
            <h5>{{ product.name }}</h5>
            <p>{{ product.description }}</p>
          </div>
        </router-link>
      </div>
    </div>

    <div v-if="loading">
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

  </page>
</template>

<script>
import Page from '@/components/page/Page.vue'
import CategoryNav from '@/components/page/CategoryNav.vue'

export default {
  components: { Page, CategoryNav },
  data: function () {
    return {
      pageName: null,
      error: null,
      loading: true,

      products: [],
      allProductsFetched: false,
      page: 0,

      defaultImage: require('@/assets/fa-image.png')
    }
  },
  created: function () {
    this.setTitle()
    this.getProducts()

    window.addEventListener('scroll', this.onScroll)
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.onScroll)
  },
  watch: {
    '$route': ['setTitle', 'getProducts']
  },
  methods: {
    setTitle: function () {
      var name = this.$route.params.category
      this.pageName = name.charAt(0).toUpperCase() + name.slice(1)
    },
    imageURL: function (product) {
      return product.attributes.filter((attr) => attr.name === 'image')[0] || this.defaultImage
    },

    getProducts: function () {
      this.error = null
      this.loading = true
      this.page = 0

      this.$api.products.get(`?categories[]=${this.$route.params.category}&page=${this.page}&pageSize=25`).then((response) => {
        this.products = response.data.products
        this.page += 1

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
    updateProducts: function () {
      if (this.allProductsFetched || this.loading) { return }

      this.loading = true
      this.$api.products.get(`?categories[]=${this.$route.params.category}&page=${this.page}&pageSize=25`).then((response) => {
        if (response.data.products.length === 0) {
          this.allProductsFetched = true
        } else {
          response.data.products.forEach((product) => this.products.push(product))
          this.page += 1
        }

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
    setProduct: function (product) {
      this.$store.commit('product', product)
    },

    onScroll: function () {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight

      if (bottomOfWindow) {
        this.updateProducts()
      }
    }
  }
}
</script>

<style>
.product-image-container {
  float: left;
}

.product-description {
  float: right;
  padding: 1em 0 0;
}

.product-image {
  width: 10em;
  height: 10em;
}
</style>
