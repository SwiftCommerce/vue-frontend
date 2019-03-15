<template>
  <div class="form-group" :id="name">
    <label :for="name"><slot></slot></label>

    <div v-if="this.required" class="input-group">
      <input
        v-if="this.required"
        v-model="value"
        class="form-control"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :pattern="pattern"
        :autocomplete="autocomplete"
        :id="name"
        required
      >
      <div class="invalid-feedback">
        <p>The given value is not valid</p>
      </div>
    </div>
    <div v-else class="input-group">
      <input v-model="value" class="form-control" :type="type" :name="name" :placeholder="placeholder" :pattern="pattern" :autocomplete="autocomplete" :id="name">
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
    placeholder: {
      type: String
    },
    pattern: {
      type: String
    },
    autocomplete: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      value: null
    };
  }
};
</script>
