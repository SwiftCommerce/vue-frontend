<template>
  <footer class="border-top">
    <div class="row">
      <ul id="footer" class="col">
        <li class="footer-item">&copy; Skelpo 2018 - {{ new Date().getFullYear() }}</li>
      </ul>
    </div>
  </footer>
</template>

<style>
footer {
  margin-top: 1em;
  padding-bottom: 1em;
}

#footer {
  text-align: center;
  margin: 1em 0;
}

.footer-item {
  display: inline-block;
  appearance: none;
}
</style>
