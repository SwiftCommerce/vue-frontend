<template>
  <div id="category-nav" class="rounded row">
    <div v-if="loading" id="loading" class="col-12">
      <div class="column spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div v-if="error" id="error" class="row alert alert-danger" role="alert">
      <div class="column">
        <p>{{ error }}</p>
      </div>
    </div>

    <div v-if="categories" id="categories" class="col-12">
      <ul class="nav">
        <li v-for="category in categories" :key="category.id" class="nav-item">
          <router-link class="nav-link text-capitalize" :to="{ name: 'Category', params: { category: category.name }}">{{ category.name }}</router-link>
        </li>
      </ul>
      <div id="cart" class="text-right">
        <router-link :to="{ name: 'Cart' }">
          <font-awesome icon="shopping-cart" id="cart-icon"/>
          <span id="cart-badge" class="badge badge-primary badge-pill">{{ cartProductCount }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      loading: true,
      categories: null,
      error: null,

      cartProductCount: this.$store.state.cart.length
    }
  },
  created () {
    this.getData()
  },
  watch: {
    '$route': 'getData',
    '$store.state.cart': 'updateCartBadge'
  },
  methods: {
    getData: function () {
      if (this.$store.state.categories) {
        this.loading = false
        this.categories = this.$store.state.categories
        return
      }

      this.$api.products.get('/categories').then((response) => {
        this.loading = false
        this.categories = response.data

        this.$store.commit('categories', response.data)
      }).catch((error) => {
        this.loading = false
        this.error = error
      })
    },
    updateCartBadge: function () {
      this.cartProductCount = this.$store.state.cart.length
    }
  }
}
</script>

<style>
ul {
  float: left;
}

#category-nav {
  background-color: rgb(235, 233, 233);
  margin-bottom: 1em;
}

#cart {
  float: right;
  margin: 1em 0 0;
}

#cart-icon {
  font-size: 2em;
  z-index: 0;
  color: rgb(34, 34, 34);
}

#cart-badge {
  position: relative;
  z-index: 1;
  right: 1.5em;
  bottom: 1.5em;
}
</style>
