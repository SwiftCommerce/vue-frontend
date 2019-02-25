<template>
  <page>
    <category-nav></category-nav>

    <bootstrap-model title="Remove Item" accept-title="Confirm" @accepted="deleteItem()">
      <p>Are you sure you want to remove {{ deleteProduct.name }} from your cart?</p>
    </bootstrap-model>

    <div v-if="$store.state.cart.length > 0" id="checkout" class="row">
      <div class="col-12">
        <router-link :to="{ name: 'Shipping' }">
          <button type="button" class="btn btn-primary">Checkout</button>
        </router-link>
      </div>
    </div>
    <div v-else class="row">
      <div class="alert alert-warning" role="alert">
        <p>You have not items in your cart. Go to our store to continue shopping!</p>
      </div>
    </div>

    <div class="list-group list-group-flush">
      <div v-for="item in $store.state.cart" :key="item.product.sku" class="list-group-item row">
        <div class="col-3 product-image-container">
            <img :src="product.create(item.product).imageURL" class="product-image">
          </div>
        <div class="col-6 product-description">
          <h5>{{ item.product.name }}</h5>
        </div>
        <div class="col-3 product-actions">
          <ul class="actions">
            <li>
              <input v-model="item.count" @change="updateProductCount(item, item.count)" type="number" size='1' class="form-control quantity" aria-label="Quantity" aria-describedby="basic-addon1">
            </li>
            <li>
              <div class="delete-item">
                <font-awesome class="trash" data-toggle="modal" data-target="#bootstrapModel" @click="setDelete(item)" icon="trash-alt"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from '@/components/page/Page';
import CategoryNav from '@/components/nav/CategoryNav';
import BootstrapModel from '@/components/utilities/BootstrapModel';

export default {
  components: { Page, CategoryNav, BootstrapModel },
  data: function () {
    return {
      deleteProduct: { name: null },
      product: require('@/objects/Product').default
    };
  },
  methods: {
    updateProductCount: function (item, count) {
      item.count = parseInt(count);
      this.$store.commit('cart/itemCount', item);
    },
    setDelete: function (item) {
      this.deleteProduct = item.product;
    },
    deleteItem: function () {
      this.$store.commit('cart/remove', this.deleteProduct.sku);
    }
  }
};
</script>

<style>
#checkout {
  margin-bottom: 1em;
  color: white;
}

.product-image-container {
  float: left;
}

.product-description {
  float: left;
  padding-top: 1em;
}

.product-actions {
  float: right;
  padding-top: 1em;
}

.product-actions > ul > li {
  padding: 0.2em;
}

.product-image {
  width: 10em;
  height: 10em;
}

.actions {
  list-style: none;
}

.actions > li {
  display: inline-block;
}

.quantity {
  width: 2.5em;
  padding: 0;
  text-align: center;
}

.trash {
  font-size: 1em;
}

.trash:hover {
  color: rgb(196, 0, 0);
}
</style>
