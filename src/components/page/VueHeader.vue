<template>
  <header>
    <div class="row">
      <div id="logo" class="col">
        <router-link :to="{ name: 'HelloWorld' }"><img :src="logo" /></router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data: function () {
    return {
      logo: require('@/assets/swift_commerce_text.svg')
    };
  }
};
</script>

<style>
header {
  padding: 1em 3em;
  color: white;
  background-color: #264568;
}

#logo > a {
  height: 3em;
  width: 14.41em;
}

#logo > a > img {
  height: 3em;
  width: 14.41em;
}

@media (max-width: 992px) {
  #logo {
    text-align: center;
  }
}
</style>
