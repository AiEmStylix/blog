<script setup lang="ts">
import BlogPosts from '@/components/BlogPosts.vue';
import Footer from '@/components/Footer.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import { usePosts } from '@/composables/usePost';
import { computed, onMounted } from 'vue';
const { posts, loading, error, fetchPosts } = usePosts();

onMounted(async () => {
  await fetchPosts();
  console.log(posts.value);
});
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-1 flex flex-col justify-center items-center m-4">
      <ProfileCard class="p-16 rounded-2xl mb-4" />
      <USeparator class="max-w-[75%] mb-16" />
      <BlogPosts v-bind:posts="posts" class="mt-3" />
      <section></section>
    </main>

    <!-- Footer  -->
    <Footer />
  </div>
</template>
