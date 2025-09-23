<script setup lang="ts">
import { usePosts } from '@/composables/usePosts';
import { RouterLink, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

const { getPostsByUuid } = usePosts();
const props = defineProps<{ id: string }>();
const post = getPostsByUuid(props.id);

const content = DOMPurify.sanitize(marked.parse(post?.content || '') as string);

console.log(content);
</script>

<template>
  <main>
    <header class="flex items-center w-1/2 px-3">
      <UButton icon="i-mdi-arrow-left" variant="ghost" to="/" class="p-4">Home</UButton>
    </header>
    <div class="mt-3 flex justify-center items-center flex-col">
      <article class="flex justify-center flex-col gap-3 p-8">
        <h1 class="text-bold text-2xl">{{ post?.title }}</h1>
        <div class="space-y-3">
          <p>{{ post?.createdAt }}</p>
          <UBadge>{{ post?.category }}</UBadge>
        </div>
        <USeparator class="mb-4" />

        <div v-html="content" class="prose max-w-full dark:prose-invert"></div>
        {{ post }}
      </article>
    </div>
  </main>
</template>
