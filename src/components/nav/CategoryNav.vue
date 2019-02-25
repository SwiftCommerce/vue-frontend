<template>
  <div id="category-nav" class="row">
    <div v-if="loading" id="loading" class="col-12">
      <div class="column spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div v-if="error" id="error" class="col-12 alert alert-danger" role="alert">
      <p>{{ error }}</p>
    </div>

    <div v-if="categories" id="categories">
      <responsive-nav class="primary left">
        <div class="menu-section">
          <nav-component v-for="category in categories" :key="category.name" :data="category"></nav-component>
        </div>
        <div class="menu-section">
          <nav-component :data="{icon: 'shopping-cart', link: 'Cart', badge: cartProductCount}"></nav-component>

          <span v-if="!authenticated" id="unauth-icons">
            <nav-component :data="{icon: 'sign-in-alt', link: 'SignIn', popover: 'Sign In'}"></nav-component>
          </span>
          <span v-else id="auth-icons">
            <nav-component :data="{icon: 'sign-out-alt', link: 'HelloWorld', popover: 'Sign Out'}" @click.native="signOut"></nav-component>
            <nav-component :data="{icon: 'history', link: 'OrderHistory', popover: 'Order History'}"></nav-component>
          </span>
        </div>
      </responsive-nav>
    </div>
  </div>
</template>

<script>
import ResponsiveNav from '@/components/nav/ResponsiveNav';
import NavComponent from '@/components/nav/NavComponent.vue';
import Category from '@/objects/Category';

export default {
  components: { ResponsiveNav, NavComponent },
  data: function () {
    return {
      loading: true,
      categories: null,
      error: null,

      cartProductCount: this.$store.state.cart.length,
      authenticated: this.$store.state.auth.isAuthenticated
    };
  },
  created () {
    this.getData();
  },
  watch: {
    '$route': 'getData',
    '$store.state.cart': 'updateCartBadge'
  },
  methods: {
    getData: function () {
      if (this.$store.state.categories) {
        this.loading = false;
        this.categories = this.$store.state.categories.map(Category.create);
        return;
      }

      this.$api.products.get('/categories').then((response) => {
        this.loading = false;
        this.categories = response.data.map(Category.create);

        this.$store.commit('categories', response.data);
      }).catch((error) => {
        this.loading = false;
        this.error = error;
      });
    },
    updateCartBadge: function () {
      this.cartProductCount = this.$store.state.cart.length;
    },
    signOut: function () {
      this.$store.commit('auth/token', null);
      this.$store.commit('auth/refresh', null);
      this.$store.commit('auth/authenticated', false);
      this.authenticated = this.$store.state.auth.isAuthenticated;
    }
  }
};
</script>

<style>
.nav {
  margin-top: 0.5em;
}

.nav-list {
  float: left;
}

#categories {
  width: 100%;
}

#category-nav {
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
