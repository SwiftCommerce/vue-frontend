<template>
  <div class="menu col-lg-12">
    <button class="menu-button btn" @click="open = !open">
      <font-awesome :icon="openIcon || 'bars'" />
    </button>
    <div class="sidebar-menu" :class="{'open': open}">
      <div class="menu-button-container">
        <button class="menu-button btn" @click="open = false">
          <font-awesome icon="times" />
        </button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    openIcon: {
      type: String
    }
  },
  data: function () {
    return {
      open: false
    };
  }
};
</script>

<style>
.menu-section {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

.menu-item {
  display: block;
  padding: 0.5em 1em;
}

@media (min-width: 992px) {
  .primary {
    background-color: #80808033;
  }

  .menu {
    display: inline-block;
  }

  .menu-button {
    display: none;
  }

  .sidebar-menu {
    display: flex;
    flex-wrap: wrap;
  }

  .menu-section {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
  }

  .menu-section:nth-last-child(n+2) {
    justify-content: center;
  }

  .menu-section:last-child {
    justify-content: flex-end;
  }

  .menu-section:nth-child(2) {
    justify-content: flex-start;
  }
}

@media (max-width: 991px) {
  .menu {
    display: inline;
  }

  .menu > .menu-button {
    margin-top: 0.25em;
  }

  .right > .menu-button {
    float: right;
  }

  .sidebar-menu {
    top: 0;
    height: 100%;
    max-width: 0;
    z-index: 2000;
    display: inline-block;
    position: fixed;
    transition: max-width 0.5s ease-in;
    overflow-x: hidden;
    background-color: #ffffffb5;
  }

  .menu-button-container {
    height: 5em;
  }

  .menu-button {
    font-size: 1.75em;
    color: #264568;
  }

  .menu-section {
    padding-right: 1em;
    flex-direction: column;
    border-top: 1px solid #00000054;
  }

  .menu-item {
    font-size: 1.1em;
  }

  .sidebar-menu.open {
    max-width: 100%;
    transition: max-width 0.5s ease-out;
  }

  /* Modifiers */

  /* .right */
  .right > .sidebar-menu {
    right: 0;
  }

  .right > .sidebar-menu > .menu-button-container > .menu-button {
    float: left;
  }

  /* .left */
  .left > .sidebar-menu {
    left: 0;
  }

  .left > .sidebar-menu > .menu-button-container > .menu-button {
    float: right;
  }
}
</style>
