<script setup lang="ts">
import type { Post } from '@/types/Post';
import { marked } from 'marked';

const props = defineProps<Post>();

const content = marked.parse(props.content);
</script>

<template>
  <RouterLink :to="`/posts/${props.id}`">
    <UCard class="mb-4 h-full flex flex-col">
      <!-- Header -->
      <template #header>
        <USkeleton v-if="!image" class="w-full h-48 object-cover rounded-t-lg"></USkeleton>
        <img v-else :src="image" alt="Post image" class="w-full h-48 object-cover rounded-t-lg" />
      </template>

      <!-- Body -->
      <template #default>
        <div class="flex-1 flex flex-col gap-3 h-50">
          <span
            class="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white w-fit"
          >
            {{ props.category_name }}
          </span>
          <h2 class="text-lg font-semibold leading-snug line-clamp-2">
            {{ props.title }}
          </h2>
          <!-- Content -->
          <p v-html="content" class="text-sm text-gray-700 line-clamp-3"></p>
        </div>
      </template>

      <!-- Footer -->
      <template #footer>
        <span class="text-xs text-gray-400">{{ props.created_at }}</span>
      </template>
    </UCard>
  </RouterLink>
</template>
