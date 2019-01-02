<template>
  <page name="Cart">
    <category-nav></category-nav>

    <div v-if="$store.state.cart.length > 0" id="checkout" class="row">
      <div class="col-12">
        <button type="button" class="btn btn-primary">Checkout</button>
      </div>
    </div>
    <div v-else class="row">
      <div class="alert alert-warning" role="alert">
        <p>You have not items in your cart. Go to our store to continue shopping!</p>
      </div>
    </div>

    <div class="list-group list-group-flush">
      <div v-for="item in $store.state.cart" :key="item.product.sku" class="list-group-item row">
        <div class="col-4">
          <h5>{{ item.product.name }}</h5>
        </div>
        <div class="col-4">
          <input v-model="item.count" type="number" class="form-control" aria-label="Quantity" aria-describedby="basic-addon1">
        </div>
        <div class="col-4">
          <font-awesome class="trash" icon="trash-alt" @click="deleteItem(item.product.sku)"/>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from '@/components/page/Page'
import CategoryNav from '@/components/page/CategoryNav'

export default {
  components: { Page, CategoryNav },
  methods: {
    deleteItem: function (sku) {
      this.$store.commit('removeFromCart', sku)
    }
  }
}
</script>

<style>
#checkout {
  margin-bottom: 1em;
}

.trash {
  font-size: 1em;
}
</style>
