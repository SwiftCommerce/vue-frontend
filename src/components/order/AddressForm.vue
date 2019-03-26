<template>
  <form id="address-form" class="needs-validation mt-3" novalidate>
    <button v-if="saved" @click="loadSaved" type="button" class="btn btn-secondary mb-2">Use saved address</button>

    <form-element name="email" type="email" autocomplete="email" placeholder="my.email@example.com" required>Email Address:</form-element>
    <div class="form-row">
      <form-element class="col-12 col-md-6" autocomplete="given-name" name="firstname" required>First Name:</form-element>
      <form-element class="col-12 col-md-6" autocomplete="family-name" name="lastname" required>Last Name:</form-element>
    </div>
    <form-element name="company">Company:</form-element>
    <form-element type="tel" autocomplete="tel" name="phone-number">Phone Number:</form-element>

    <hr />

    <div class="form-row">
      <form-element class="col-12" ref="address1" placeholder="314 West 42nd Street" name="type">Address:</form-element>
      <form-element class="col-12" ref="address2" placeholder="Apt #1970" name="type-identifier">Address 2:</form-element>
    </div>
    <div class="form-row">
      <form-element class="col-12 col-md-6" ref="city" autocomplete="address-level2" name="city">City:</form-element>
      <form-element class="col-12 col-md-6" ref="district" autocomplete="address-level1" placeholder="State, Province, Government District, etc." name="district">Government Distirct:</form-element>
    </div>
    <div class="form-row">
      <form-element class="col-12 col-md-6" ref="postalArea" autocomplete="postal-code" placeholder="Zip Code, Postal Code, etc." name="postal-area">Postal Area:</form-element>
      <form-element class="col-12 col-md-6" ref="country" autocomplete="country-name" name="country">Country:</form-element>
    </div>

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
  mounted: function () {
    this.$api.users.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.auth.token}`;
    this.$api.users.get('/current/attributes').then((response) => {
      let attribute = response.data.filter((element) => element.key === this.addressKey || element.key === 'addressID').pop();
      return this.$api.addresses.get(`/${attribute.text}`);
    }).then((response) => {
      this.saved = response.data;
    });
  },
  data: function () {
    return {
      loading: false,
      error: null,
      shouldSave: false,
      saved: null
    };
  },
  methods: {
    loadSaved: function () {
      this.$refs.city.value = this.saved.city;
      this.$refs.country.value = this.saved.country;
      this.$refs.district.value = this.saved.district;
      this.$refs.postalArea.value = this.saved.postalArea;

      if (this.saved.type) {
        this.$refs.address2.value = `${this.saved.type} ${this.saved.typeIdentifier}`;
      }

      var address1 = [
        this.saved.street.number,
        this.saved.street.numberSuffix,
        this.saved.street.direction,
        this.saved.street.name,
        this.saved.street.type
      ];
      this.$refs.address1.value = address1.filter((component) => component != null).join(' ');
    },
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
        if (error.response && error.response.data && error.response.data.message) {
          this.error = new Error(error.response.data.message);
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
    parse: function () {
      var data = {
        country: this.$refs.country.value,
        data: `${this.$refs.address1.value}${' ' + this.$refs.address2.value}, ${this.$refs.city.value} ${this.$refs.district.value}, ${this.$refs.postalArea.value} ${this.$refs.country.value}`
      };

      return this.$api.addresses.post('/parse', data).then((response) => response.data);
    },
    save: function () {
      return this.parse().then((address) => {
        return this.$api.addresses.post('/validate', address).then((_) => address);
      }).then((address) => {
        if (this.shouldSave) {
          return this.$api.addresses.post('/', address);
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
