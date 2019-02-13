<template>
  <div>
    <vue-header></vue-header>
    <div id="page" class="container">
      <slot></slot>
    </div>
    <vue-footer></vue-footer>
  </div>
</template>

<script>
import VueHeader from './VueHeader.vue';
import VueFooter from './VueFooter.vue';

export default {
  components: { VueHeader, VueFooter },
  props: {
    title: {
      type: String
    }
  },
  mounted: function () { this.setTitle(); },
  watch: {
    title: function () { this.setTitle(); }
  },
  methods: {
    setTitle: function () {
      if (this.title) {
        document.title = `SwiftCommerce | ${this.title}`;
      } else {
        document.title = 'SwiftCommerce';
      }
    }
  }
};
</script>

<style>
* {
  font-family: 'Montserrat', sans-serif;
}

h1 h2 h3 h4 h5 h6 {
  font-weight: 600;
}
</style>
