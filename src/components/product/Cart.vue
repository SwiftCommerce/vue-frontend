<template>
  <page name="Cart">
    <category-nav></category-nav>

    <bootstrap-model title="Remove Item" accept-title="Confirm" @accepted="deleteItem()">
      <p>Are you sure you want to remove `item` from your cart?</p>
    </bootstrap-model>

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
          <div class="delete-item">
            <font-awesome class="trash" data-toggle="modal" data-target="#bootstrapModel" @click="setDelete(item)" icon="trash-alt"/>
          </div>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from '@/components/page/Page'
import CategoryNav from '@/components/page/CategoryNav'
import BootstrapModel from '@/components/utilities/BootstrapModel'

export default {
  components: { Page, CategoryNav, BootstrapModel },
  data: function () {
    return {
      deleteSKU: null
    }
  },
  methods: {
    setDelete: function (item) {
      this.deleteSKU = item.product.sku
    },
    deleteItem: function () {
      this.$store.commit('removeFromCart', this.deleteSKU)
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

.trash:hover {
  color: rgb(196, 0, 0);
}
</style>
