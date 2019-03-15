<template>
  <form id="address-form" class="needs-validation" novalidate>
      <form-element name="email" type="email" autocomplete="email" placeholder="my.email@example.com" required>Email Address:</form-element>
      <div class="form-row">
        <form-element class="col-12 col-md-6" autocomplete="given-name" name="firstname" required>First Name:</form-element>
        <form-element class="col-12 col-md-6" autocomplete="family-name" name="lastname" required>Last Name:</form-element>
      </div>
      <form-element name="company">Company:</form-element>
      <form-element type="tel" autocomplete="tel" name="phone-number">Phone Number:</form-element>

      <hr />

      <div class="form-row">
        <form-element type="number" class="col-md-4 col-xl-2" ref="streetNumber" name="street-number">Street Number:</form-element>
        <form-element class="col-md-4 col-xl-2" ref="streetNumberSuffix" autocomplete="off" name="street-number-suffix">Street Number Suffix:</form-element>
        <form-element class="col-md-4 col-xl-2" ref="direction" placeholder="N, E, S, W, etc." pattern="([NESW]|NE|NW|SE|SW|)" name="direction">Street Direction:</form-element>
        <form-element class="col-md-4 col-xl-2" ref="streetName" name="street-name">Street Name:</form-element>
        <form-element class="col-md-4 col-xl-2" ref="streetType" placeholder="Dr., St., Pkwy., etc." name="street-type">Street Type:</form-element>
        <form-element class="col-md-4 col-xl-2" ref="buildingName" name="building-name">Building Name:</form-element>
      </div>
      <div class="form-row">
        <form-element class="col-12 col-md-6" ref="type" placeholder="P.O. Box, Apartment, Floor, etc." name="type">Address Type:</form-element>
        <form-element class="col-12 col-md-6" ref="typeIdentifier" placeholder="P.O Box number, Apartment Number, etc." name="type-identifier">Type Identifier:</form-element>
      </div>
      <div class="form-row">
        <form-element class="col-lg-4" ref="municipality" autocomplete="address-level3" placeholder="Villiage, Hamlet, etc." name="municipality">Local Municipality:</form-element>
        <form-element class="col-lg-4" ref="city" autocomplete="address-level2" name="city">City:</form-element>
        <form-element class="col-lg-4" ref="district" autocomplete="address-level1" placeholder="State, Province, Government District, etc." name="district">Government Distirct:</form-element>
      </div>
      <form-element ref="postalArea" autocomplete="postal-code" placeholder="Zip Code, Postal Code, etc." name="postal-area">Postal Area:</form-element>
      <form-element ref="country" autocomplete="country-name" name="country">Country:</form-element>

      <div v-if="$store.state.auth.isAuthenticated" class="form-group form-check" id="save">
          <input v-model="shouldSave" class="form-check-input" type="checkbox" name="save">
          <label for="shouldSave" class="form-check-label">Save Address</label>
      </div>

      <error-alert :watch="error" />
      <button v-if="next" type="submit" class="btn btn-primary" @click.prevent="submit()" onsubmit="return false">
        <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Next
      </button>
    </form>
</template>

<script>
import FormElement from '@/components/utilities/FormElement.vue';
import ErrorAlert from '@/components/utilities/Error.vue';

export default {
  components: { FormElement, ErrorAlert },
  props: {
    next: { type: String },
    addressKey: { type: String },
    stateMutation: { type: String }
  },
  data: function () {
    return {
      loading: false,
      error: null,
      shouldSave: false
    };
  },
  methods: {
    submit: function (event) {
      this.$router.replace('/shipping');
      if (!this.validateFields()) { return; }

      this.loading = true;
      this.save().then((_) => {
        if (this.next) {
          if (this.stateMutation) {
            var data = Array.from($('form#address-form')[0]).reduce(function (data, input) {
              data[input.name] = input.value;
              return data;
            }, {});
            this.$store.commit(this.stateMutation, data);
          }
          this.$router.push({name: this.next});
        }

        this.loading = false;
      }).catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          this.error = new Error(error.response.data.error);
        } else {
          this.error = error;
        }
        this.loading = false;
      });
    },
    validateFields: function () {
      var form = document.getElementById('address-form');

      form.classList.add('was-validated');
      return form.checkValidity();
    },
    post: function (endpoint) {
      var street = {
        number: parseInt(this.$refs.streetNumber.value),
        numberSuffix: this.$refs.streetNumberSuffix.value,
        name: this.$refs.streetName.value,
        type: this.$refs.streetType.value,
        direction: this.$refs.direction.value
      };
      var address = {
        buildingName: this.$refs.buildingName.value,
        type: this.$refs.type.value,
        typeIdentifier: this.$refs.typeIdentifier.value,
        municipality: this.$refs.municipality.value,
        city: this.$refs.city.value,
        district: this.$refs.district.value,
        postalArea: this.$refs.postalArea.value,
        country: this.$refs.country.value,
        street: street
      };

      return this.$api.addresses.post(endpoint, address);
    },
    save: function () {
      return this.post('/validate').then((response) => {
        if (this.shouldSave) {
          return this.post('/');
        } else {
          return Promise.resolve(null);
        }
      }).then((response) => {
        if (this.shouldSave && this.$store.state.auth.isAuthenticated) {

          this.$api.users.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.auth.token}`;
          return this.$api.users.post('/current/attributes', {
            attributeText: `${response.data.id}`,
            attributeKey: this.addressKey || 'addressID'
          });
        } else {
          return Promise.resolve(null);
        }
      });
    }
  }
};
</script>
