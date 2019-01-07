<template>
  <page name="Order">
    <div class="row">
        <div id="order-info" class="col-6">
          <div id="payment">
            <payment></payment>
          </div>
          <div id="address-form">
            <hr />

            <input v-model="useShippingAddress" type="checkbox" name="hide-address-form"/>
            <label for="hide-address-form">Use shipping address as billing address</label>

            <address-form v-if="!useShippingAddress" state-mutation="billingAddress"></address-form>
          </div>
          <div id="place-order">
            <hr />
            <button type="submit" class="btn btn-primary">Place Order</button>
          </div>
        </div>
        <div id="cart" class="col-6">
          <ul class="list-group">
            <li v-for="item in $store.state.cart" :key="item.product.sku" class="order-cart-item row list-group-item">
              <div class="col-3 product-image-container">
                <img class="product-image" :src="imageURL(item.product)" />
              </div>
              <div class="col-9 product-information">
                <p class="produc-name">{{ item.product.name }}</p>
                <p>Quantity: {{ item.count }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
  </page>
</template>

<script>
import Page from '@/components/page/Page.vue'
import Payment from '@/components/order/Payment.vue'
import AddressForm from '@/components/order/AddressForm.vue'

export default {
  components: { Page, Payment, AddressForm },
  data: function () {
    return {
      useShippingAddress: true,
      defaultImage: require('@/assets/fa-image.png')
    }
  },
  methods: {
    imageURL: function (product) {
      return product.attributes.filter((attr) => attr.name === 'image')[0] || this.defaultImage
    }
  }
}
</script>

<style>
#cart-header {
  background-color: #f7f7f7;
}

.product-image-container {
  float: left;
}

.product-information {
  float: right;
}

.product-image {
  width: 5em;
  height: 5em;
}

.produc-name {
  font-size: 1.25em;
}

</style>
