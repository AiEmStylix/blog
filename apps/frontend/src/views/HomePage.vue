<script setup lang="ts">
import PostCard from '@/components/PostCard.vue';
import { usePosts } from '@/composables/usePosts';

const { paginatedPosts, posts, currentPage, pageSize } = usePosts();
</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Latest Posts</h1>

    <!-- Grid of posts -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      <RouterLink
        v-for="post in paginatedPosts"
        :key="post.id"
        :to="`/posts/${post.id}`"
        class="block"
      >
        <PostCard v-bind="post" />
      </RouterLink>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-6">
      <UPagination v-model:page="currentPage" :itemsPerPage="pageSize" :total="posts.length" />
    </div>
  </div>
</template>
