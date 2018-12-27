<template>
  <div>
    <vue-header>Order</vue-header>
    <div class="row">
      <div id="payment" class="col-6">
        Payment
      </div>
      <div id="cart" class="col-6">
        Cart
      </div>
    </div>
    <vue-footer></vue-footer>
  </div>
</template>

<script>
import VueHeader from '@/components/utilities/VueHeader.vue'
import VueFooter from '@/components/utilities/VueFooter.vue'

export default {
  components: { VueHeader, VueFooter }
}
</script>

<style>
#cart {
  background-color: rgb(233, 233, 233);
}
</style>
