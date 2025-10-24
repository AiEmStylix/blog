import { PostApi } from '@/api/posts';
import type { Post } from '@/types/Post.type';
import type { BadgeProps } from '@nuxt/ui';
import { da } from '@nuxt/ui/runtime/locale/index.js';
import { ref } from 'vue';

export function usePosts() {
  const posts = ref<Post[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchPosts = async () => {
    // Reset state
    loading.value = true;
    error.value = null;
    try {
      const { data } = await PostApi.getAll();
      posts.value = data.posts;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return { posts, loading, error, fetchPosts };
}
