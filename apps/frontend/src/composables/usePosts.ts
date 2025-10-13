// composables/usePosts.ts
import { ref, computed } from 'vue';
import { fetchPosts } from '@/api/posts';
import type { Post } from '@/types/Post';

const posts = ref<Post[]>([]);
const loaded = ref(false);

export const usePosts = () => {
  const currentPage = ref(1);
  const pageSize = 6;

  const loadPosts = async () => {
    if (!loaded.value) {
      const data = await fetchPosts();
      console.log(data);
      posts.value = data.map((post) => ({
        ...post,
        created_at: new Date(post.created_at + 'Z').toLocaleString('en-GB', {
          timeZone: 'Asia/Ho_Chi_Minh',
        }),
      }));
      loaded.value = true;
    }
  };

  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return posts.value.slice(start, start + pageSize);
  });

  return {
    posts,
    paginatedPosts,
    currentPage,
    pageSize,
    loadPosts,
  };
};
