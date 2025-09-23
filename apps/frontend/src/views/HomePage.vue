<script setup lang="ts">
import PostCard from '@/components/PostCard.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import { usePosts } from '@/composables/usePosts';

const { paginatedPosts, posts, currentPage, pageSize } = usePosts();
</script>

<template>
  <div class="max-w-6xl mx-auto p-8 pt-16">
    <ProfileCard class="p-8" />
    <USeparator class="my-6" />
    <h1 class="text-2xl text-center font-bold mb-6">Latest Posts</h1>

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
