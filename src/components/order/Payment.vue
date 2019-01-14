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
          Payment inputs here.
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
          <form id="payment-form">
            <div class="form-row">
              <div id="stripe-card-element">
                <!-- A Stripe Element will be inserted here. -->
              </div>

              <!-- Used to display Element errors. -->
              <div id="card-errors" role="alert"></div>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  mounted: function () {
    this.configureStripe()
  },
  data: function () {
    return {
      stripe: null,
      stripeCard: null
    }
  },
  methods: {
    configureStripe: function () {
      /* eslint-disable no-undef */
      this.stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx')
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

    createStripePayment: function (orderID) {
      return new Promise((resolve, reject) => {
        this.stripe.createToken(this.stripeCard).then((result) => {
          if (result.error) {
            reject(result.error)
          } else {
            return this.$api.orders.post(`/${orderID}/payment/stripe-cc`, {
              stripeToken: result.token,
              currency: 'USD'
            })
          }
        }).then((response) => resolve()).catch(reject)
      })
    },
    createPayPalPayment: function (orderID) {

    },

    createPayment: function (orderID) {
      var paymentMethod = $('div.collapse.show').parents()[0].id
      var method
      var error
      switch (paymentMethod) {
        case 'paypal':
          method = this.createPayPalPayment
          break
        case 'stripe':
          method = this.createStripePayment
          break
        default: error = new Error('No valid payment method selected.')
      }

      return new Promise((resolve, reject) => {
        if (method) {
          method(orderID).then(resolve).catch(reject)
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

#stripe-card-element {
  width: 80%;
}
</style>
