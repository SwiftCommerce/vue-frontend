<template>
  <div id="paypal-button-container">
    PayPal payment selected
  </div>
</template>

<script>
import currency from '@/currency'

export default {
  mounted: function () {
    if (this.$route.query.PayerID && this.$route.query.paymentId) {
      this.executePayment()
    }
  },
  methods: {
    createPayment: function (orderID) {
      this.$api.orders.post(`/${orderID}/payment/paypal/create`, {
        currency: currency.currenctCurrency()
      }).then((response) => {
        this.$store.commit('orderID', orderID)
        location.assign(response.data.href)
      })
    },
    executePayment: function () {
      let payerID = this.$route.query.PayerID
      let paymentID = this.$route.query.paymentId

      this.$api.orders.post(
        `/${this.$store.state.orderID}/payment/paypal/execute`,
        { payerID: payerID, paymentID: paymentID },
        { headers: {
          'Authorization': `Bearer ${this.$store.state.auth.token}`
        }}
      ).then((response) => {
        this.$emit('payment-succeeded')
      }).catch((error) => {
        this.$emit('payment-failed', error)
      })
    }
  }
}
</script>
