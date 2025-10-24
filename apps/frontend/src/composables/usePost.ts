import { PostApi } from '@/api/posts';
import type { Post } from '@/types/Post.type';
import { ref } from 'vue';

// composables/usePosts.ts
export function usePosts() {
  const posts = ref<Post[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchPosts = async () => {
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

// composables/usePost.ts
export function usePost() {
  const post = ref<Post | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchPost = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await PostApi.getById(id);
      post.value = data.post;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return { post, loading, error, fetchPost };
}
