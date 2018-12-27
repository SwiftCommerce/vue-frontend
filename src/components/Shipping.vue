<template>
  <div>
    <vue-header>Shipping</vue-header>
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

      <button type="submit" class="btn btn-info">
        <router-link :to="{ name: 'Order' }">Next</router-link>
      </button>
    </form>
    <vue-footer></vue-footer>
  </div>
</template>

<script>
import VueHeader from './utilities/VueHeader.vue'
import FormElement from './utilities/FormElement.vue'
import VueFooter from './utilities/VueFooter.vue'

export default {
  components: { VueHeader, FormElement, VueFooter }
}
</script>

<style>
button > a {
  color: white;
}
</style>
