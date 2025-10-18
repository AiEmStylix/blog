<script setup lang="ts">
import type { NavigationMenuChildItem, NavigationMenuItem } from '@nuxt/ui';
import { ref } from 'vue';

const open = ref(false);

const links = [
  {
    label: 'Home',
    icon: 'i-mdi:home',
    to: '/admin',
    onSelect: () => {
      open.value = false;
    },
    exact: true,
  },
  {
    label: 'Posts',
    icon: 'i-mdi:book-open-outline',
    onSelect: () => {
      open.value = false;
    },
    to: '/admin/posts',
  },
  {
    label: 'Categories',
    icon: 'i-mdi:tag',
    to: '/admin/categories',
    onSelect: () => {
      open.value = false;
    },
  },
  {
    label: 'Settings',
    icon: 'i-mdi:settings',
    type: 'trigger',
  },
] satisfies NavigationMenuItem[];
</script>
<template>
  <UDashboardGroup unit="rem" storage="local">
    <UDashboardSidebar collapsible resizable>
      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links"
          orientation="vertical"
          tooltip
          popover
        />
      </template>
    </UDashboardSidebar>

    <RouterView />
    <UDashboardSearch />
  </UDashboardGroup>
</template>
