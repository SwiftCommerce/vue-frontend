<template>
    <div class="form-group" :id="name">
        <label :for="name"><slot></slot></label>

        <input v-if="this.required" class="form-control" :type="type" :name="name" :id="name" required>
        <input v-else class="form-control" :type="type" :name="name" :id="name">
    </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    }
  }
}
</script>
