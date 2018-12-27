<template>
  <div id="page" class="container">
    <vue-header>{{ name }}</vue-header>
    <slot></slot>
    <vue-footer></vue-footer>
  </div>
</template>

<script>
import VueHeader from './VueHeader.vue'
import VueFooter from './VueFooter.vue'

export default {
  components: { VueHeader, VueFooter },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
