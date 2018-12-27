<template>
  <page name="Order">
    <div class="row">
        <div id="payment" class="col-6">
          Payment
        </div>
        <div id="cart" class="col-6">
          Cart
        </div>
      </div>
  </page>
</template>

<script>
import Page from '@/components/page/Page.vue'

export default {
  components: { Page }
}
</script>

<style>
#cart {
  background-color: rgb(233, 233, 233);
}
</style>
