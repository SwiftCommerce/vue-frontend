<template>
  <page name="Sign In">
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}

      <button type="button" class="close" aria-label="Close" @click="dismissAlert()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <form id="signin-form" class="needs-validation" novalidate>
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
  </page>
</template>

<script>
import Page from '@/components/page/Page.vue'

export default {
  components: { Page },
  data: function () {
    return {
      error: null,
      submiting: false
    }
  },
  methods: {
    signin: function () {
      if (!this.validateFields()) { return }
      this.submiting = true

      var email = document.getElementById('email').value
      var password = document.getElementById('password').value
      this.$api.users.post('/login', { email: email, password: password }).then((response) => {
        this.$store.commit('auth/token', response.data.accessToken)
        this.$store.commit('auth/refresh', response.data.refreshToken)

        this.$router.push({ name: 'HelloWorld' })
      }).catch((error) => {
        this.submiting = false
        if (error.response.data) {
          this.error = error.response.data.error
        } else {
          this.error = 'Authentication failed with unknown error'
        }
      })
    },
    validateFields: function () {
      var form = document.getElementById('signin-form')

      form.classList.add('was-validated')
      return form.checkValidity()
    },
    dismissAlert: function () {
      this.error = null
    }
  }
}
</script>
