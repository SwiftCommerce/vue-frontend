<template>
  <div id="category-nav">
    <div v-if="loading" id="loading" class="row">
      <div class="column spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div v-if="error" id="error" class="row alert alert-danger" role="alert">
      <div class="column">
        <p>{{ error }}</p>
      </div>
    </div>

    <div v-if="categories" id="categories" class="row">
      <ul class="nav column">
        <li v-for="category in categories" :key="category.id" class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Category', params: { category: category.name }}">{{ category.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
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
