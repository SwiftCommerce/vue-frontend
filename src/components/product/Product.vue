<template>
  <page :name="product.name ? product.name : ''">

  </page>
</template>

<script>
import Page from '@/components/page/Page'

export default {
  components: { Page },
  data: function () {
    return {
      product: this.$store.state.product,
      error: null,
      loading: true
    }
  },
  created: function () {
    let sku = this.$route.params.product
    if (this.product.sku === sku) {
      this.loading = false
      return
    }

    this.$api.products.get(`?sku=${sku}`).then((response) => {
      this.product = response.data.products[0]
      this.loading = false
    }).catch((error) => {
      this.error = error
      this.loading = false
    })
  }
}
</script>
