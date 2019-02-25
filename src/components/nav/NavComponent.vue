<template>
  <sub-menu v-if="(data.subs || []).length > 0" :title="data.name" :href="`/#/categories/${data.name}`">
    <nav-component v-for="sub in data.subs" :key="sub.name" :data="sub"></nav-component>
  </sub-menu>

  <nav-icon v-else-if="data.icon" :link="data.link" :icon="data.icon" :badge="data.badge" :popover="data.popover"></nav-icon>

  <router-link v-else :to="{name: 'Category', params: {category: data.name}}" class="menu-item">
    {{ data.name }}
  </router-link>
</template>

<script>
import NavIcon from '@/components/utilities/NavIcon';
import SubMenu from '@/components/nav/SubMenu';

export default {
  name: 'nav-component',
  components: { NavIcon, SubMenu },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>
