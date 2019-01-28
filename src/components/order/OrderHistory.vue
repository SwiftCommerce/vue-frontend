<template>
  <page name="Order History">
    <div v-if="$store.state.getters['auth/authenticated']"></div>
    <div v-else></div>
  </page>
</template>

<script>
import Page from '@/components/page/Page'

export default {
  components: { Page }
}
</script>
