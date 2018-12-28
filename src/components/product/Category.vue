<template>
  <page :name="pageName">

    <div v-if="error" id="error">
      <div class="alert alert-danger" role="alert">
        <p>{{ error }}</p>
      </div>
    </div>

    <div v-else-if="products.length === 0" id="no-products">
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

  </page>
</template>

<script>
import Page from '@/components/page/Page.vue'

function uppercasedName (vue) {
  var name = vue.$route.params.category
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export default {
  components: { Page },
  data: function () {
    return {
      pageName: uppercasedName(this),
      products: [],
      error: null,
      loading: true,
      page: 1
    }
  },
  created: function () {
    this.getProducts()
  },
  methods: {
    getProducts: function () {
      this.error = null
      this.loading = true

      this.$api.products.get(`?categories[]=${this.$route.params.category}&page=${this.page}&pageSize=3`).then((response) => {
        Array.prototype.push.apply(this.products, response.data.products)
        this.page += 1

        // We force update because Vue does not make the prototype functions reactive.
        this.$forceUpdate()
      }).catch((error) => {
        this.error = error
      })
    }
  }
}
</script>
