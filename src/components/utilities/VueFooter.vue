<template>
  <footer class="border-top">
    <div class="row">
      <ul class="col">
        <li>&copy; Skelpo {{ year }}</li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  data: function () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style>
footer {
  margin-top: 1em;
  padding-bottom: 1em;
}

ul {
  text-align: center;
  margin: 1em 0;
}

ul > li {
  display: inline-block;
  appearance: none;
}
</style>
