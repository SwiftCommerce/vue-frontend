<template>
  <page>
    <address-form address-key="shippingAddress" next="Order" state-mutation="address/shipping"></address-form>
  </page>
</template>

<script>
import Page from '@/components/page/Page.vue';
import AddressForm from '@/components/order/AddressForm.vue';

export default {
  components: { Page, AddressForm }
};
</script>
