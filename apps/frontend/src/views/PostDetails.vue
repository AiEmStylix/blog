<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import { fetchPosts, getPostsById } from '@/api/posts';
import type { Post } from '@/types/Post';

marked.use({
  gfm: true,
  breaks: true,
});

const props = defineProps<{ id: string }>();

const post = ref<Post>();

const content = ref('');

onMounted(async () => {
  post.value = await getPostsById(props.id);
  content.value = DOMPurify.sanitize(marked.parse(post.value.content || '') as string);
});
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
          <p>{{ post?.created_at }}</p>
          <UBadge>{{ post?.category_name }}</UBadge>
        </div>
        <USeparator class="mb-4" />

        <div v-html="content" class="prose max-w-full dark:prose-invert"></div>
      </article>
    </div>
  </main>
</template>
