<template>
  <router-link :to="{ name: link }">
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
    badge: { }
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
