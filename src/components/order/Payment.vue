<template>
  <div id="payment" class="accordion">

    <div class="card" id="paypal">
      <div class="card-header" id="paypal-heading">
        <h2 class="mb-0">
        <button @click="hideAll()" class="btn collapsed" type="button" data-toggle="collapse" data-target="#collapse-paypal" aria-expanded="false" aria-controls="collapse-paypal">
          Paypal
        </button>
      </h2>
      </div>

      <div id="collapse-paypal" class="collapse" aria-labelledby="paypal-heading" data-parent="#payment">
        <div class="card-body">
          Payment inputs here.
        </div>
      </div>
    </div>

    <div class="card" id="stripe">
      <div class="card-header" id="stripe-heading">
        <h2 class="mb-0">
          <button @click="hideAll()" class="btn collapsed" type="button" data-toggle="collapse" data-target="#collapse-stripe" aria-expanded="false" aria-controls="collapse-stripe">
            Stripe
         </button>
        </h2>
      </div>

      <div id="collapse-stripe" class="collapse" aria-labelledby="stripe-heading" data-parent="#stripe">
        <div class="card-body">
          <form action="/charge" method="post" id="payment-form">
            <div class="form-row">
              <label for="card-element">
                Credit or debit card
              </label>
              <div id="stripe-card-element">
                <!-- A Stripe Element will be inserted here. -->
              </div>

              <!-- Used to display Element errors. -->
              <div id="card-errors" role="alert"></div>
            </div>

            <button class="btn">Submit Payment</button>
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
  methods: {
    configureStripe: function () {
      /* eslint-disable no-undef */
      var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx')
      var elements = stripe.elements()

      var style = {
        base: {
          fontSize: '16px',
          color: '#32325d'
        }
      }

      var card = elements.create('card', { style: style })
      card.mount('#stripe-card-element')
    },

    hideAll: function () {
      let cards = document.getElementsByClassName('collapse')
      Array.from(cards).forEach(function (card) {
        card.classList.remove('show')
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
