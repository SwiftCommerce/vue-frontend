<template>
    <div>
        <div :class="name">
            <label :for="name"><slot></slot></label>

            <input v-if="this.required" :type="type" :name="name" :id="name" required>
            <input v-else :type="type" :name="name" :id="name">
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
}
</script>
