<template>
    <div>
        <div :class="name">
            <label :for="name"><slot></slot></label>

            <input v-if="this.required" :type="type" :name="name" :id="name" required>
            <input v-else :type="type" :name="name" :id="name" required>
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
      default: 'text',
      required: true
    },
    required: {
      type: Boolean
    }
  }
}
</script>
