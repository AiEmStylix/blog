<script setup lang="ts">
import type { NavigationMenuChildItem, NavigationMenuItem } from '@nuxt/ui';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

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
    type: 'trigger',
    defaultOpen: true,
    children: [
      {
        label: 'All Posts',
        icon: 'i-mdi:book-open-blank-variant-outline',
        to: '/admin/posts',
      },
      {
        label: 'New Post',
        icon: 'i-mdi:typewriter',
        to: '/admin/posts/create',
      },
    ],
  },
  {
    label: 'Categories',
    icon: 'i-mdi:tag',
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
  <UDashboardGroup unit="rem">
    <UDashboardSidebar>
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
