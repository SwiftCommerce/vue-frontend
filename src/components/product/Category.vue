<template>
  <page :title="pageName">
    <category-nav></category-nav>
    <product-list :filters="`categories[]=${this.$route.params.category.toLowerCase()}`"></product-list>
  </page>
</template>

<script>
import Page from '@/components/page/Page.vue';
import CategoryNav from '@/components/nav/CategoryNav.vue';
import ProductList from '@/components/product/ProductList.vue';

export default {
  components: { Page, CategoryNav, ProductList },
  data: function () {
    return {
      pageName: null
    };
  },
  created: function () {
    this.setTitle();
  },
  watch: {
    '$route': ['setTitle']
  },
  methods: {
    setTitle: function () {
      var name = this.$route.params.category;
      this.pageName = name.charAt(0).toUpperCase() + name.slice(1);
    }
  }
};
</script>
