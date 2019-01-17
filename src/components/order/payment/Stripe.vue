<template>
  <form id="payment-form">
    <div class="form-row">
      <div id="stripe-card-element"><!-- A Stripe Element will be inserted here. --></div>
    </div>
  </form>
</template>

<script>
import currency from '@/currency'

export default {
  mounted: function () {
    this.configure()
  },
  data: function () {
    return {
      stripe: null,
      stripeCard: null
    }
  },
  methods: {
    configure: function () {
      /* eslint-disable no-undef */
      this.stripe = Stripe('pk_test_lP7CFJuMosSPBAYnriguznB9')
      var elements = this.stripe.elements()

      var style = {
        base: {
          fontSize: '16px',
          color: '#32325d'
        }
      }

      this.stripeCard = elements.create('card', { style: style })
      this.stripeCard.mount('#stripe-card-element')
    },

    createPayment: function (orderID) {
      this.stripe.createToken(this.stripeCard).then((result) => {
        if (result.error) {
          reject(result.error)
        } else {
          return this.$api.orders.post(`/${orderID}/payment/stripe-cc`, {
            stripeToken: result.token.id,
            currency: currency.currenctCurrency()
          })
        }
      }).then((response) => {
        this.$emit('payment-succeeded')
      }).catch((error) => {
        this.$emit('payment-failed', error)
      })
    }
  }
}
</script>

<style>
#stripe-card-element {
  width: 80%;
}
</style>
