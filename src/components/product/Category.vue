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
      <ul class="list-unstyled">
        <li v-for="product in products" :key="product.sku" class="media">
          <!-- <img src="..." class="mr-3" alt="..."> -->
          <div class="media-body">
            <h5 class="mt-0">{{ product.name }}</h5>
            <p>{{ product.description }}</p>
          </div>
        </li>
      </ul>
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
      products: [],
      error: null,
      loading: true,
      page: 1
    }
  },
  created: function () {
    this.setTitle()
    this.getProducts()
  },
  watch: {
    '$route': ['setTitle', 'getProducts']
  },
  methods: {
    setTitle: function () {
      var name = this.$route.params.category
      this.pageName = name.charAt(0).toUpperCase() + name.slice(1)
    },
    getProducts: function () {
      this.error = null
      this.loading = true
      this.page = 1

      this.$api.products.get(`?categories[]=${this.$route.params.category}&page=${this.page}&pageSize=25`).then((response) => {
        this.products = response.data.products
        this.page += 1

        this.loading = false
      }).catch((error) => {
        this.error = error
        this.loading = false
      })
    },
    updateProducts: function () {
      this.loading = true

      this.$api.products.get(`?categories[]=${this.$route.params.category}&page=${this.page}&pageSize=3`).then((response) => {
        response.data.products.forEach(product => this.products.push(product))
        this.page += 1

        this.loading = false
      }).catch((error) => {
        this.error = error
        this.loading = false
      })
    }
  }
}
</script>
