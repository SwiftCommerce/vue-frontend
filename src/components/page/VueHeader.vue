<template>
  <header>
    <div class="row">
      <h1 class="col"><slot></slot></h1>
    </div>

    <div v-if="loading" id="loading" class="row">
      <div class="nav column">
        <p>Loading...</p>
      </div>
    </div>

    <div v-if="error" id="error" class="row">
      <div class="nav column">
        <p>{{ error }}</p>
      </div>
    </div>

    <div v-if="categories" id="categories" class="row">
      <ul class="nav column">
        <li v-for="category in categories" :key="category.id" class="nav-item">
          <a class="nav-link" :href="'/categories/' + category.name">{{ category.name }}</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data: function () {
    return {
      loading: true,
      categories: null,
      error: null
    }
  },
  created () {
    this.getData()
  },
  watch: {
    '$route': 'getData'
  },
  methods: {
    getData: function () {
      if (this.$store.state.categories) {
        this.loading = false
        this.categories = this.$store.state.categories
      }

      this.$api.products.get('/categories').then((response) => {
        this.loading = false
        this.categories = response.data

        this.$store.commit('categories', response.data)
      }).catch((error) => {
        this.loading = false
        this.error = error
      })
    }
  }
}
</script>

<style>
header {
  padding-top: 1em;
}
h1 {
  font: 2em;
  text-align: center;
}
</style>
