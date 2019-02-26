<template>
  <page title="Sign In">
    <error-alert :watch="error" />

    <form id="signin-form" class="needs-validation mt-3" novalidate>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required/>
        <div class="invalid-feedback">
          Enter a valid email address
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" class="form-control" id="password" placeholder="Password" required/>
        <div class="invalid-feedback">
          Password is required
        </div>
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="signin()">
        <span v-if="submiting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Submit
      </button>
    </form>

    <div class="mt-3 text-center">
      <p>Don't have an account? <router-link :to="{ name: 'SignUp'}">Sign Up!</router-link></p>
    </div>
  </page>
</template>

<script>
import Page from '@/components/page/Page';
import ErrorAlert from '@/components/utilities/Error';

export default {
  components: { Page, ErrorAlert },
  data: function () {
    return {
      error: null,
      submiting: false
    };
  },
  methods: {
    signin: function () {
      if (!this.validateFields()) { return; }
      this.submiting = true;

      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      this.$api.users.post('/login', { email: email, password: password }).then((response) => {
        this.$store.commit('auth/token', response.data.accessToken);
        this.$store.commit('auth/refresh', response.data.refreshToken);
        this.$store.commit('auth/authenticated', true);

        this.$router.push({ name: 'HelloWorld' });
      }).catch((error) => {
        this.submiting = false;
        if (error.response.data) {
          this.error = new Error(error.response.data.error);
        } else {
          this.error = new Error('Authentication failed with unknown error');
        }
      });
    },
    validateFields: function () {
      var form = document.getElementById('signin-form');

      form.classList.add('was-validated');
      return form.checkValidity();
    }
  }
};
</script>
