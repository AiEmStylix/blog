// composables/usePosts.ts
import { generateFakePosts } from '@/mock/posts';
import { ref, computed } from 'vue';

export const usePosts = () => {
  const posts = ref(generateFakePosts(20));
  const currentPage = ref(1);
  const pageSize = 6;

  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return posts.value.slice(start, start + pageSize);
  });

  return {
    posts,
    paginatedPosts,
    currentPage,
    pageSize,
  };
};
