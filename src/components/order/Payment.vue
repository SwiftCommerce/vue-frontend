<template>
  <div id="payment" class="accordion">

    <div class="card" id="paypal">
      <div class="card-header" id="paypal-heading">
        <h2 class="mb-0 float-left">
          <button @click="select('paypal')" class="btn collapsed" type="button" data-toggle="collapse" data-target="#collapse-paypal" aria-expanded="false" aria-controls="collapse-paypal">
            PayPal
          </button>
        </h2>
        <span class="icon float-right text-success d-none"><font-awesome icon="check" /></span>
      </div>

      <div id="collapse-paypal" class="collapse" aria-labelledby="paypal-heading" data-parent="#payment">
        <div class="card-body">
          <pay-pal ref="paypal" @payment-succeeded="$emit('succeeded')" @payment-failed="$emit('failed')"></pay-pal>
        </div>
      </div>
    </div>

    <div class="card" id="stripe">
      <div class="card-header" id="stripe-heading">
        <h2 class="mb-0 float-left">
          <button @click="select('stripe')" class="btn collapsed" type="button" data-toggle="collapse" data-target="#collapse-stripe" aria-expanded="false" aria-controls="collapse-stripe">
            Stripe
         </button>
        </h2>
        <span class="icon float-right text-success d-none"><font-awesome icon="check" /></span>
      </div>

      <div id="collapse-stripe" class="collapse" aria-labelledby="stripe-heading" data-parent="#stripe">
        <div class="card-body">
          <stripe ref="stripe" @payment-succeeded="$emit('succeeded')" @payment-failed="$emit('failed')"></stripe>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import PayPal from '@/components/order/payment/PayPal.vue'
import Stripe from '@/components/order/payment/Stripe.vue'

export default {
  components: { PayPal, Stripe },
  methods: {
    createPayment: function (orderID) {
      var method
      var error

      var paymentDiv = $('div.collapse.show').parents()[0]
      if (paymentDiv) {
        method = this.$refs[paymentDiv.id].createPayment
      } else {
        error = new Error('No valid payment method selected.')
      }

      return new Promise((resolve, reject) => {
        if (method) {
          method(orderID)
          resolve()
        } else if (error) {
          reject(error)
        } else {
          reject(new Error('No valid payment method selected.'))
        }
      })
    },

    select: function (id) {
      $('.collapse').not(`#collapse-${id}`).collapse('hide')
      $('div.card-header>span.icon').addClass('d-none')

      // We check to see if the element does _not_ have the `show` class because it is delayed in being
      // added and removed, which means if it has the class, the card collapse is closing.
      if (!$(`#collapse-${id}`).hasClass('show')) {
        $(`#${id}-heading>span.icon`).removeClass('d-none')
      }
    }
  }
}
</script>

<style>
.icon {
  padding: 0.5em 1em;
}
</style>
