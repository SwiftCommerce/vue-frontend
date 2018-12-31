<template>
  <footer class="border-top">
    <div class="row">
      <ul class="col">
        <li>&copy; Skelpo {{ new Date().getFullYear() }}</li>
      </ul>
    </div>
  </footer>
</template>

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
