// composables/usePosts.ts
import { fetchPosts } from '@/api/posts';
import { generateFakePosts } from '@/mock/posts';
import { ref, computed } from 'vue';

const posts = ref(await fetchPosts());

// export const useFakePosts = () => {
//   const currentPage = ref(1);
//   const pageSize = 6;

//   const paginatedPosts = computed(() => {
//     const start = (currentPage.value - 1) * pageSize;
//     return posts.value.slice(start, start + pageSize);
//   });

//   const getPostsByUuid = (uuid: string) => {
//     return posts.value.find((post) => post.id === uuid) || null;
//   };

// return {
//   posts,
//   paginatedPosts,
//   currentPage,
//   pageSize,
//   getPostsByUuid,
// };
// };

export const usePosts = () => {
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
