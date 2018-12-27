<template>
  <page name="Shipping">
    <form>
      <form-element name="email" required>Email Address:</form-element>
      <form-element name="firstname" required>First Name:</form-element>
      <form-element name="lastname" required>Last Name:</form-element>
      <form-element name="company">Company:</form-element>
      <form-element name="address_1" required>1st Street Address:</form-element>
      <form-element name="address_2">2nd Street Address:</form-element>
      <form-element name="city" required>City:</form-element>
      <form-element name="state" required>State/Province:</form-element>
      <form-element name="zip" required>Zip/Postal Code:</form-element>
      <form-element name="country" required>Country:</form-element>
      <form-element name="phone_number">Phone Number:</form-element>

      <button type="submit" class="btn btn-info" @click="submit()">Next</button>
    </form>
  </page>
</template>

<script>
import Page from '@/components/page/Page.vue'
import FormElement from '@/components/utilities/FormElement.vue'

export default {
  components: { Page, FormElement },
  methods: {
    submit: function () {
      window.router.push({name: 'Order'})
    }
  }
}
</script>
