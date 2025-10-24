<script setup lang="ts">
import { PostApi } from '@/api/posts';
import { usePost } from '@/composables/usePost';
import { marked } from 'marked';
import { computed, onMounted } from 'vue';
const { post, loading, error, fetchPost } = usePost();
import DOMPurify from 'isomorphic-dompurify';

const { id } = defineProps({
  id: String,
});

onMounted(async () => {
  await fetchPost(Number(id));
  console.log(post.value);
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
};

const markdownContent = computed(() => {
  const html = marked.parse(post.value?.content || '') as string;
  return DOMPurify.sanitize(html);
});
</script>
<template>
  <div>
    <header class="container mx-auto sm:px-8 lg:px-16">
      <div class="px-4 py-8 max-w-4xl mx-auto">
        <UButton
          to="/"
          color="neutral"
          variant="ghost"
          icon="i-lucide-move-left"
          size="sm"
          label="Home"
          class="-ml-2"
        />
      </div>
    </header>
    <main class="container mx-auto sm:px-8 lg:px-16">
      <article class="px-4 py-8 max-w-4xl mx-auto">
        <h1 class="font-bold text-3xl">{{ post?.title }}</h1>
        <div class="my-4">
          <div>
            <time :datetime="post?.created_at">
              {{ formatDate(post?.created_at || '') }}
            </time>
          </div>
          <div class="mt-4 flex gap-2 flex-wrap">
            <UBadge
              variant="soft"
              color="neutral"
              v-for="category in post?.categories"
              :key="category.id"
              :label="category.name"
            />
          </div>
        </div>
        <USeparator class="my-4" />
        <div v-html="markdownContent" class="prose prose-lg"></div>
      </article>
    </main>
  </div>
</template>
