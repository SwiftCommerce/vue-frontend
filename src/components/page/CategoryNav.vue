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
      <div id="actions" class="text-right">
        <nav-icon link="Cart" icon="shopping-cart" :badge="cartProductCount"/>

        <span v-if="!authenticated" id="unauth-icons">
          <nav-icon link="SignIn" icon="sign-in-alt" popover="Sign In"/>
        </span>
        <span v-else id="auth-icons">
          <nav-icon link="HelloWorld" icon="sign-out-alt" popover="Sign Out" @click.native="signOut"/>
          <nav-icon link="OrderHistory" icon="history" popover="Order History"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import NavIcon from '@/components/utilities/NavIcon'

export default {
  components: { NavIcon },
  data: function () {
    return {
      loading: true,
      categories: null,
      error: null,

      cartProductCount: this.$store.state.cart.length,
      authenticated: this.$store.getters['auth/authenticated']
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
    },
    signOut: function () {
      console.log('Sign Out')
      this.$store.commit('auth/token', null)
      this.$store.commit('auth/refresh', null)
      this.authenticated = this.$store.getters['auth/authenticated']
      console.log(this.authenticated)
    }
  }
}
</script>

<style>
ul {
  float: left;
}

.nav {
  margin-top: 0.5em;
}

#category-nav {
  background-color: rgb(235, 233, 233);
  margin-bottom: 1em;
}

#actions {
  float: right;
  margin: 1em 0 0.5em;
}

#actions > span > .nav-icon {
  margin-right: 0.5em;
}
</style>
