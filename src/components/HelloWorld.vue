<template>
  <page>
    <category-nav></category-nav>
    <h1 id="greeting">{{ msg }}</h1>
  </page>
</template>

<script>
import Page from '@/components/page/Page.vue';
import CategoryNav from '@/components/nav/CategoryNav.vue';

export default {
  name: 'HelloWorld',
  components: { Page, CategoryNav },
  data () {
    return {
      msg: 'Welcome to SwiftCommerce'
    };
  }
};
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
