<template>
  <page name="Shipping">
    <address-form next="Order" state-mutation="shippingAddress"></address-form>
  </page>
</template>

<script>
import Page from '@/components/page/Page.vue'
import AddressForm from '@/components/order/AddressForm.vue'

export default {
  components: { Page, AddressForm }
}
</script>
