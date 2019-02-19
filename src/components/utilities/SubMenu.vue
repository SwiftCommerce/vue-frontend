<template>
  <div class="sub-menu-wrapper">
    <div class="menu-item">
      <a :href="href">{{ title }}</a>
      <font-awesome class="parent-icon" icon="angle-right" @click="toggle"/>
    </div>
    <div class="sub-menu">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    href: {
      type: String
    }
  },
  mounted: function () {
    $(window).resize(function () {
      $('.sub-menu').removeAttr('style');
    });
  },
  methods: {
    toggle: function (event) {
      $(event.target).parents('.menu-item').first().siblings('.sub-menu').toggle();
      event.stopImmediatePropagation();
    }
  }
};
</script>

<style>
.sub-menu {
  display: none;
}

@media (min-width: 992px) {
  .sub-menu-wrapper {
    position: relative;
  }

  .sub-menu-wrapper:hover > .sub-menu {
    display: block;
  }

  .sub-menu {
    position: absolute;
    z-index: 1000;
    border: solid #f8f9fa;
    border-top: 0;
    background-color: white;
    top: 0;
    left: 100%;
    width: max-content;
  }

  .menu-item:hover > .sub-menu {
    display: block;
  }
}

@media (max-width: 991px) {
  .sub-menu-wrapper > .menu-item > .parent-icon {
    font-size: 1.2em;
  }

  .sub-menu-wrapper > .sub-menu {
    padding-left: 1.5em;
  }
}
</style>
