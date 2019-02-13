<template>
  <header>
    <div class="row">
      <div id="logo" class="col-1">
        <router-link :to="{ name: 'HelloWorld' }"><img :src="logo" /></router-link>
      </div>
      <h1 class="col-auto mx-auto"><slot></slot></h1>
      <div class="col-1"></div>
    </div>
  </header>
</template>

<script>
export default {
  data: function () {
    return {
      logo: require('@/assets/swift_commerce_text.svg')
    }
  }
}
</script>

<style>
header {
  padding: 1em 3em 0.5em;
  color: white;
  background-color: #264568;
}

header > h1 {
  font: 2em;
  text-align: center;
}

#logo > a {
  height: 3em;
  width: 14.41em;

  transition: 0.4s;
  clip-path: inset(-100% 78% -100% -10%);
}

#logo > a > img {
  height: 3em;
  width: 14.41em;
}

@media (min-width: 992px) {
  #logo > a:hover {
    clip-path: inset(-100% -10% -100% -10%);
  }
}
</style>
