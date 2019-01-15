<template>
  <page id="order-page" name="Order">

    <div v-if="showLoader" id="loader">
      <div class="centered text-center">
        <div id="spinner" class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    <div v-if="error" class="row">
      <div class="col-12">
        <error-alert :watch="error"></error-alert>
      </div>
    </div>

    <div class="row">
      <div id="order-info" class="col-6">
        <div id="payment">
          <payment ref="payment"></payment>
        </div>
        <div id="address-form">
          <hr />

          <input v-model="useShippingAddress" type="checkbox" name="hide-address-form"/>
          <label for="hide-address-form">Use shipping address as billing address</label>

          <address-form v-if="!useShippingAddress" state-mutation="billingAddress"></address-form>
        </div>
        <div id="order-comment">
          <hr />
          <label for="comment">Leave any comments about the order here:</label>
          <textarea v-model="orderComment" class="form-control" name="comment" id="comment"/>
        </div>
        <div id="place-order">
          <hr />
          <button type="submit" class="btn btn-primary" @click="createOrder()">Place Order</button>
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
import ErrorAlert from '@/components/utilities/Error.vue'
import AddressForm from '@/components/order/AddressForm.vue'

export default {
  components: { Page, Payment, ErrorAlert, AddressForm },
  data: function () {
    return {
      useShippingAddress: true,
      orderComment: null,
      defaultImage: require('@/assets/fa-image.png'),

      error: null,
      showLoader: this.$route.query.loading === 'true'
    }
  },
  methods: {
    imageURL: function (product) {
      let attribute = product.attributes.filter((attr) => attr.name === 'image')[0]
      return attribute ? attribute.value || this.defaultImage : this.defaultImage
    },

    billingAddress: function () {
      if (this.useShippingAddress) {
        return this.$store.state.address.shipping
      } else {
        var address = {}

        /* eslint-disable no-undef */
        Array.from($('form#address-form')[0]).forEach(function (input) {
          data[input.name] = input.value
        })
        return address
      }
    },
    createOrder: function () {
      this.showLoader = true

      var items = this.$store.state.cart.map(function (item) {
        return {
          productID: item.product.id,
          quantity: item.count
        }
      })

      var storedShipping = this.$store.state.address.shipping
      var shipping = {
        street: storedShipping.address_1,
        street2: storedShipping.address_2,
        zip: storedShipping.zip,
        city: storedShipping.city,
        state: storedShipping.state,
        country: storedShipping.county
      }

      var formBilling = this.billingAddress()
      var billing = {
        street: formBilling.address_1,
        street2: formBilling.address_2,
        zip: formBilling.zip,
        city: formBilling.city,
        state: formBilling.state,
        country: formBilling.county
      }

      var body = {
        firstname: formBilling.firstname,
        lastname: formBilling.lastname,
        company: formBilling.company,
        phone: formBilling.phone_number,
        comment: this.orderComment,
        addresses: {
          shipping: shipping,
          billing: billing
        },
        items: items
      }

      this.$api.orders.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.authToken}`
      this.$api.orders.post('', body).then((response) => {
        this.$store.commit('authToken', response.data.authToken)
        this.$api.orders.defaults.headers.common['Authorization'] = `Bearer ${response.data.authToken}`

        return this.$refs.payment.createPayment(response.data.id)
      }).then(() => {
        this.error = null
        this.showLoader = false

        this.$store.commit('emptyCard')
        this.$router.push({ name: 'OrderSuccess' })
      }).catch((error) => {
        this.error = error
        this.showLoader = false
      })
    }
  }
}
</script>

<style>
#loader {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  opacity: 0.8;
  background-color: white;
  z-index: 1;
}

.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

#spinner {
  height: 5em;
  width: 5em;
}

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
