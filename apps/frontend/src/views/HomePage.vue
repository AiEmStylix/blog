<script setup lang="ts">
import { fetchPosts } from '@/api/posts';
import PostCard from '@/components/PostCard.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import { usePosts } from '@/composables/usePosts';

import type { Post } from '@/types/Post';
import { onMounted, ref } from 'vue';

const { paginatedPosts, currentPage, pageSize } = usePosts();

const posts = ref<Post[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await fetchPosts();

    posts.value = response;
  } catch (err) {
    console.error('API Error:', err);
    error.value = 'Failed to load posts';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="max-w-6xl mx-auto p-8 pt-16">
    <ProfileCard class="p-8" />
    <USeparator class="my-6" />
    <h1 class="text-2xl text-center font-bold mb-6">Latest Posts</h1>

    <!-- Grid of posts -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      <PostCard
        v-for="post in paginatedPosts"
        :key="post.id"
        :id="post.id"
        :title="post.title"
        :content="post.content"
        :category_id="post.category_id"
        :created_at="post.created_at"
        :image="post.image"
      ></PostCard>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-6">
      <UPagination v-model:page="currentPage" :itemsPerPage="pageSize" :total="posts.length" />
    </div>
  </div>
</template>
