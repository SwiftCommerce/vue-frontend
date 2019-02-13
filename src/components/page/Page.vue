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
import VueHeader from './VueHeader.vue'
import VueFooter from './VueFooter.vue'

export default {
  components: { VueHeader, VueFooter }
}
</script>
