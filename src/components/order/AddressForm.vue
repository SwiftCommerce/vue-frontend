<template>
  <form id="address-form" class="needs-validation" novalidate>
      <form-element name="email" type="email" required>Email Address:</form-element>
      <form-element name="firstname" required>First Name:</form-element>
      <form-element name="lastname" required>Last Name:</form-element>
      <form-element name="company">Company:</form-element>
      <form-element name="address_1" required>1st Street Address:</form-element>
      <form-element name="address_2">2nd Street Address:</form-element>
      <form-element name="city" required>City:</form-element>
      <form-element name="state" required>State/Province:</form-element>
      <form-element name="zip" required>Zip/Postal Code:</form-element>
      <form-element name="country" required>Country:</form-element>
      <form-element name="phone_number" type="tel">Phone Number:</form-element>

      <button v-if="next" type="submit" class="btn btn-primary" @click.prevent="submit()" onsubmit="return false">Next</button>
    </form>
</template>

<script>
import FormElement from '@/components/utilities/FormElement.vue'

export default {
  components: { FormElement },
  props: {
    next: { type: String },
    stateMutation: { type: String }
  },
  methods: {
    submit: function (event) {
      this.$router.replace('/shipping')
      if (!this.validateFields()) { return }
      if (this.next) {
        if (this.stateMutation) {
          var data = {}

          Array.from($('form#address-form')[0]).forEach(function (input) {
            data[input.name] = input.value
          })
          this.$store.commit(this.stateMutation, data)
        }

        this.$router.push({name: this.next})
      }
    },
    validateFields: function () {
      var form = document.getElementById('address-form')

      form.classList.add('was-validated')
      return form.checkValidity()
    }
  }
}
</script>
