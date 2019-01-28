<template>
  <router-link
    class="nav-icon"
    :to="{ name: link }"
    :data-toggle="popover ? 'popover' : false"
    :data-placement="popover ? 'top': false"
    :data-content="popover"
    @mouseover.native="showPopover"
    @mouseout.native="hidePopover"
  >
    <font-awesome :icon="icon" class="action-icon"/>
    <span v-if="badge != null" class="action-badge badge badge-primary badge-pill">{{ badge }}</span>
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    badge: { },
    popover: {
      type: String
    }
  },
  methods: {
    /* eslint-disable no-undef */
    showPopover: function (event) {
      if (this.popover) {
        $(event.target).closest('.nav-icon').popover('show')
      }
    },
    hidePopover: function (event) {
      if (this.popover) {
        $(event.target).closest('.nav-icon').popover('hide')
      }
    }
  }
}
</script>

<style>
#actions > a:hover {
  text-decoration: none;
}

.action-icon {
  font-size: 2em;
  z-index: 0;
  color: rgb(34, 34, 34);
}

.action-badge {
  position: relative;
  z-index: 1;
  right: 1.5em;
  bottom: 1.5em;
}
</style>
