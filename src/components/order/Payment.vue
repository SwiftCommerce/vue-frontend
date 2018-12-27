<template>
  <div id="payment" class="accordion">

    <div class="card" id="paypal">
      <div class="card-header" id="paypal-heading">
        <h2 class="mb-0">
        <button class="btn collapsed" type="button" data-toggle="collapse" data-target="#collapse-paypal" aria-expanded="false" aria-controls="collapse-paypal">
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
          <button class="btn collapsed" type="button" data-toggle="collapse" data-target="#collapse-stripe" aria-expanded="false" aria-controls="collapse-stripe">
            Stripe
         </button>
        </h2>
      </div>

      <div id="collapse-stripe" class="collapse" aria-labelledby="stripe-heading" data-parent="#stripe">
        <div class="card-body">
          Payment inputs here.
        </div>
      </div>
    </div>

  </div>
</template>
