<template>
  <page name="Home">
    <h1 id="greeting">{{ msg }}</h1>
  </page>
</template>

<script>
import Page from '@/components/page/Page.vue'

export default {
  name: 'HelloWorld',
  components: { Page },
  data () {
    return {
      msg: 'Welcome to SwiftCommerce'
    }
  }
}
</script>

<style>
#greeting {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
