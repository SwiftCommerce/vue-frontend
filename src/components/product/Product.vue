<template>
  <page :title="product.name">
    <category-nav></category-nav>

    <div v-if="loading">
      <div class="d-flex justify-content-center">
        <div id="loading-spinner" class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    <div v-if="error && !loading" class="alert alert-danger" role="alert">
      <p>{{ error }}</p>
    </div>
    <div v-if="product && !loading" class="row">
      <div id="image" class="col-12 col-lg-6">
        <img :src="product.imageURL" />
      </div>
      <div id="product-modifications" class="col-12 col-lg-6">
        <div id="product-info" class="row">
          <h5 id="name" class="col-8">{{ product.name }}</h5>
          <h5 id="price" class="col-4 text-right">{{ product.price || 'Not for Sale' }}</h5>
          <p v-if="product.manufacturer" class="col-12"> by {{ product.manufacturer }}</p>
          <hr class="col-12"/>
          <p class="col-12">{{ product.description }}</p>
        </div>
        <div id="order" class="row">
          <div class="input-group mb-3 col-12">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Quantity</span>
            </div>
            <input v-model="productCount" type="number" class="form-control" placeholder="Qty" aria-label="Quantity" aria-describedby="basic-addon1">
          </div>
          <div class="col-12">
            <span>
              <button v-if="product.price && productCount > 0" id="add-to-cart" type="button" class="btn btn-primary" @click="addToCart()">Add to Cart</button>
              <button v-else type="button" class="btn btn-primary" disabled>Add to Cart</button>

              <font-awesome id="added-to-cart" class="text-success" style="display: none;" icon="check" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else></div>
  </page>
</template>

<script>
import Page from '@/components/page/Page';
import CategoryNav from '@/components/nav/CategoryNav';

import Product from '@/objects/Product';

export default {
  components: { Page, CategoryNav },
  data: function () {
    return {
      error: null,
      loading: true,
      productCount: 1,
      product: this.$store.state.product
    };
  },
  created: function () {
    if (this.product) {
      this.loading = false;
      this.product = Product.create(this.$store.state.product);
      return;
    }

    this.$api.products.get(`?sku=${this.$route.params.product}`).then((response) => {
      this.product = Product.create(response.data.products[0]);
      this.loading = false;
    }).catch((error) => {
      this.loading = false;
      if (error.response && error.response.data) {
        this.error = new Error(error.response.data.reason);
      } else {
        this.error = error;
      }
    });
  },
  methods: {
    addToCart: function () {
      $('#add-to-cart').hide();
      $('#added-to-cart').show();

      let cartProduct = {
        count: parseInt(this.productCount),
        product: this.product.raw
      };

      this.$store.commit('cart/add', cartProduct);

      window.setTimeout(() => {
        $('#add-to-cart').show();
        $('#added-to-cart').hide();
      }, 450);
    }
  }
};
</script>

<style>
#loading-spinner {
  height: 3em;
  width: 3em;
}

#added-to-cart {
  height: 2em;
  width: 2em;
  padding: 0.5 1em;
}

#image > img {
  width: 95%
}
</style>
