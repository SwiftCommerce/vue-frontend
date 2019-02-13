<template>
  <div class="form-group" :id="name">
    <label :for="name"><slot></slot></label>

    <div v-if="this.required" class="input-group">
      <input v-if="this.required" class="form-control" :type="type" :name="name" :id="name" required>
      <div class="invalid-feedback">
        <p>The given value is not valid</p>
      </div>
    </div>
    <div v-else class="input-group">
      <input class="form-control" :type="type" :name="name" :id="name">
    </div>
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
};
</script>
