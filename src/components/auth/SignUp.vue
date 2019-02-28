<template>
  <page title="Sign Up">
    <error-alert :watch="error"></error-alert>

    <form id="new-user" class="needs-validation mt-3" novalidate>
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email" required/>
        <div class="invalid-feedback">
          Enter a valid email address
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="password" type="password" class="form-control" id="password" placeholder="Password" required/>
        <div class="invalid-feedback">
          Password is required
        </div>
      </div>
      <div class="form-group">
        <label for="password-confirm">Re-enter Password:</label>
        <input v-model="passwordConfirm" type="password" class="form-control" id="password-confirm" placeholder="Password" required/>
        <div class="invalid-feedback">
          You must enter the same password again
        </div>
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="createUser">
        <span v-if="submitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        {{ submitText }}
      </button>
    </form>
  </page>
</template>

<script>
import ErrorAlert from '@/components/utilities/Error';
import Page from '@/components/page/Page';

export default {
  components: { Page, ErrorAlert },
  data: function () {
    return {
      error: null,
      submitting: false,
      submitText: 'Submit',

      email: null,
      password: null,
      passwordConfirm: null
    };
  },
  methods: {
    createUser: function () {
      if (!this.validateFields()) { return; }
      this.submitting = true;
      this.submitText = 'Submitting';

      var auth = {
        email: this.email,
        password: this.password
      };

      this.$api.users.post('/register', auth).then((response) => {
        this.submitText = 'Logging In';
        return this.$api.users.post('/login', auth);
      }).then((response) => {
        this.submitting = false;
        this.submitText = 'Success!';

        this.$store.commit('auth/token', response.data.accessToken);
        this.$store.commit('auth/refresh', response.data.refreshToken);
        this.$store.commit('auth/authenticated', true);

        this.$router.push({ path: this.$route.query.redirect || '/' });
      }).catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          this.error = new Error(error.response.data.error);
        } else {
          this.error = error;
        }

        this.submitText = 'Submit';
        this.submitting = false;
      });
    },
    validateFields: function () {
      var form = document.getElementById('new-user');
      form.classList.add('was-validated');

      if (this.password !== this.passwordConfirm) {
        document.getElementById('password-confirm').classList.add('is-invalid');
        return false;
      } else {
        document.getElementById('password-confirm').classList.remove('is-invalid');
      }

      return form.checkValidity();
    }
  }
};
</script>
