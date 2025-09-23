<script setup lang="ts">
import { RouterView } from 'vue-router';
import Footer from './components/Footer.vue';
</script>

<template>
  <UApp>
    <div class="flex flex-col min-h-screen">
      <RouterView class="flex-1" />
      <Footer class="shrink-0"></Footer>
    </div>
  </UApp>
</template>

<style scoped></style>
