<script setup lang="ts">
import type { Post } from '@/types/Post.type';
import { computed } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

const props = defineProps<{
  posts: Post[];
}>();

const descriptions = computed(() =>
  props.posts.map((post) => {
    const preview = (post.content || '').slice(0, 50);
    const html = marked.parse(preview);
    return DOMPurify.sanitize(html as string);
  }),
);

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
};
</script>

<template>
  <UBlogPosts orientation="vertical">
    <div
      class="grid grid-cols-[8rem_auto_1fr] items-center gap-8 w-full"
      v-for="(post, index) in posts"
      :key="index"
    >
      <!-- Category badges column - centered -->
      <div class="flex flex-col gap-2 items-center">
        <div class="text-sm text-gray-500">{{ formatDate(post.created_at) }}</div>
        <div class="flex flex-wrap gap-2 justify-center">
          <UBadge
            variant="subtle"
            color="neutral"
            v-for="category in post.categories"
            :key="category.name"
          >
            {{ category.name }}
          </UBadge>
        </div>
      </div>

      <!-- Separator column - full height of parent -->
      <USeparator orientation="vertical" class="h-full self-stretch" />

      <!-- Blog post column -->
      <UBlogPost
        class="md:w-xl"
        :title="post.title"
        :description="post.content"
        :to="`/posts/${post.id}`"
      >
        <template #description>
          <div v-html="descriptions[index]"></div>
        </template>
      </UBlogPost>
    </div>
  </UBlogPosts>
</template>
