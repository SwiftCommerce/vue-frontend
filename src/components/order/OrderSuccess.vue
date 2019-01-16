<template>
  <div class="container">
    <div class="row">
      <div class="center-screen d-flex text-center">
        <div>
          <font-awesome id="success-icon" class="text-success" icon="check" />
          <h1 class="title">Success!</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted: function () {
    this.redirect()
  },
  methods: {
    redirect: function () {
      window.setTimeout(() => {
        this.$router.push({ name: 'HelloWorld' })
      }, 1500)
    }
  }
}
</script>

<style>
.center-screen {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}

.title {
  margin: 1em 0 0;
}

#success-icon {
  height: 5em;
  width: 5em;
}
</style>
