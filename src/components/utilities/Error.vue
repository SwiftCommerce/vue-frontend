<template>
  <div v-if="error" id="error-alert" class="alert alert-danger" role="alert">
    {{ error.message }}
    <button @click="hide()" type="button" class="close" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    watch: {
      type: Error
    }
  },
  watch: {
    'watch': 'show'
  },
  data: function () {
    return {
      error: this.watch
    }
  },
  methods: {
    hide: function () {
      this.error = null
    },
    show: function (value, old) {
      this.error = value
    }
  }
}
</script>
