<template>
  <page>
    <div v-if="loading" class="d-flex justify-content-center">
      <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <error-alert :watch="error" />

    <div v-if="$store.state.auth.isAuthenticated">
      <div v-if="!loading && orders.length === 0">
        <div class="alert alert-info" role="alert">
          <p>Looks like you don't have any orders yet! Your future order will appear here so you can view their details any time you like.</p>
        </div>
      </div>

      <div class="list-group list-group-flush">
        <div v-for="order in orders" :key="order.id" class="list-group-item">
          <p>Order No. {{ order.id }}</p>
          <p>{{ totalPrice(order) }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="alert alert-danger" role="alert">
        <p>Authentication is required to access this page</p>
      </div>
      <router-link :to="{ name: 'HelloWorld' }">Go back to home</router-link>
    </div>
  </page>
</template>

<script>
import Page from '@/components/page/Page';
import ErrorAlert from '@/components/utilities/Error';

import currency from '@/currency';

export default {
  components: { Page, ErrorAlert },
  mounted: function () {
    this.loadOrders();
  },
  data: function () {
    return {
      orders: [],
      error: null,
      loading: false
    };
  },
  methods: {
    loadOrders: function () {
      this.loading = true;

      this.$api.orders.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.auth.token}`;
      this.$api.orders.get('').then((response) => {
        this.loading = false;
        this.orders = response.data.sort((first, second) => second.id - first.id);
      }).catch((error) => {
        this.loading = false;
        if (error.response && error.response.data) {
          this.error = new Error(error.response.data.reason);
        } else {
          this.error = new Error('Failed to fetch order history');
        }
      });
    },
    totalPrice: function (order) {
      var prices = this.orders.map((order) => currency.getPrice(order.prices));
      var cents = prices.reduce((result, price) => result + price.cents, 0);
      return currency.formatPrice({
        cents: cents,
        currency: prices[0].currency
      });
    }
  }
};
</script>
