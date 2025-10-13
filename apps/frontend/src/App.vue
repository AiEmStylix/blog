<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import Footer from './components/Footer.vue';
import { computed } from 'vue';

const route = useRoute();

const showFooter = computed(() => !route.path.startsWith('/admin'));
</script>

<template>
  <UApp>
    <UMain>
      <RouterView />
    </UMain>
    <UFooter v-if="showFooter">
      <template #default>
        <Footer />
      </template>
    </UFooter>
  </UApp>
</template>

<style scoped></style>
