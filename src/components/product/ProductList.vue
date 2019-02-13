<template>
  <div id="products">
    <div id="sort">
      <div id="sortBy" class="d-inline">
        Sort By:
        <div class="btn-group btn-group-sm" role="group" aria-label="Sort by">
          <button type="button" class="btn btn-outline-secondary sort-action" value="name">Name</button>
          <button type="button" class="btn btn-outline-secondary sort-action" value="price">Price</button>
          <button type="button" class="btn btn-outline-secondary sort-action" value="category">Category</button>
        </div>
      </div>
      <div id="sortDirection" class="d-inline">
        Sort Direction:
        <div class="btn-group btn-group-sm" role="group" aria-label="Sort by">
          <button type="button" class="btn btn-outline-secondary sort-action" value="ascending">Ascending</button>
          <button type="button" class="btn btn-outline-secondary sort-action" value="descending">Descending</button>
        </div>
      </div>
      <div id="pageSize" class="d-inline">
        Products per Page:
        <div class="btn-group btn-group-sm" role="group" aria-label="Sort by">
          <button type="button" class="btn btn-outline-secondary sort-action" value=10>10</button>
          <button type="button" class="btn btn-outline-secondary sort-action" value=25>25</button>
          <button type="button" class="btn btn-outline-secondary sort-action" value=50>50</button>
          <button type="button" class="btn btn-outline-secondary sort-action" value=100>100</button>
        </div>
      </div>
    </div>

    <error-alert :watch="error"></error-alert>

    <div v-if="loading">
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    <div v-else-if="products.length === 0 && !loading" id="no-products">
      <div class="alert alert-warning" role="alert">
        <p>No products found in category '{{ $route.params.category }}'</p>
      </div>
    </div>

    <div v-if="products" class="list-group list-group-flush">
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

    <div v-if="pageCount > 1" id="pagination" class="row">
      <nav aria-label="Product page navigation" class="mx-auto text-primary">
        <ul class="pagination">
          <li :class="{'disabled': page === 1}" class="page-item"><a @click="page = 1" class="page-link"><font-awesome icon="angle-double-left"/></a></li>
          <li :class="{'disabled': page === 1}" class="page-item"><a @click="page = page - 1" class="page-link"><font-awesome icon="angle-left"/></a></li>
          <li v-for="id in this.paginationNumbers" :key="id" :class="{'active': id === page}" class="page-item"><a @click="page = id" class="page-link">{{ id }}</a></li>
          <li :class="{'disabled': page === pageCount}" class="page-item"><a @click="page = page + 1" class="page-link"><font-awesome icon="angle-right"/></a></li>
          <li :class="{'disabled': page === pageCount}" class="page-item"><a @click="page = pageCount" class="page-link"><font-awesome icon="angle-double-right"/></a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import query from '@/query'
import ErrorAlert from '@/components/utilities/Error.vue'

export default {
  components: { ErrorAlert },
  props: {
    filters: {
      type: String
    }
  },
  mounted: function () {
    this.loadProducts()

    /* eslint-disable no-undef */
    $('button.sort-action').click((event) => {
      var button = $(event.target)
      window.button = button
      this[button.parents().eq(1)[0].id] = button[0].value

      button.siblings().removeClass('active')
      button.addClass('active')
    })
  },
  data: function () {
    return {
      sortDirection: this.$route.query.sortDirection || 'ascending',
      sortBy: this.$route.query.sortBy || 'name',
      page: parseInt(this.$route.query.page) || 1,
      pageSize: parseInt(query.pageSize) || 25,

      products: [],
      productCount: 0,
      defaultImage: require('@/assets/fa-image.png'),

      loading: true,
      error: null
    }
  },
  watch: {
    'filters': 'loadProducts',
    'sortDirection': function (value) { this.watch('sortDirection', value) },
    'sortBy': function (value) { this.watch('sortBy', value) },
    'page': function (value) { this.watch('page', value) },
    'pageSize': function (value) {
      // If the page number we are on is greater than the page number possible with the new amount
      // of products per page, we move the to last possible page.
      var maxPage = Math.ceil(this.productCount / this.pageSize)
      if (this.page > maxPage) {
        this.page = maxPage
      }

      this.watch('pageSize', value)
    }
  },
  computed: {
    pageCount: function () {
      if (this.productCount % this.pageSize === 0) {
        return Math.floor(this.productCount / this.pageSize)
      } else {
        return Math.floor(this.productCount / this.pageSize) + 1
      }
    },
    paginationNumbers: function () {
      if (this.page === 1) {
        return this.pageCount > this.page ? [1, 2] : [1]
      } else if (this.page === this.pageCount) {
        return this.pageCount > 1 ? [this.pageCount - 1, this.pageCount] : [1]
      } else {
        return [this.page - 1, this.page, this.page + 1]
      }
    }
  },
  methods: {
    imageURL: function (product) {
      return product.attributes.filter((attr) => attr.name === 'image')[0] || this.defaultImage
    },
    watch: function (property, value) {
      query[property] = value
      this.loadProducts()
    },

    setProduct: function (product) {
      this.$store.commit('product', product)
    },
    loadProducts: function () {
      this.loading = true
      this.error = null

      var query = new URLSearchParams({pageSize: this.pageSize, page: this.page - 1, sortBy: this.sortBy, sortDirection: this.sortDirection}).toString()
      if (this.filters) {
        query = query.concat('&', this.filters)
      }

      this.$api.products(`?${query}`).then((response) => {
        this.products = response.data.products
        this.productCount = response.data.count

        this.loading = false
      }).catch((error) => {
        this.loading = false
        this.error = error
      })
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

#sort {
  margin-bottom: 1em;
}

#sort > div {
  padding-right: 1em;
}

#pagination {
  margin-top: 2rem;
}
</style>
