<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
</script>

<template>
  <UApp>
    <RouterView />
  </UApp>
</template>
