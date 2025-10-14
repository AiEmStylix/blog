<script setup lang="ts">
import type { Post } from '@/types/Post';
import type { TableColumn } from '@nuxt/ui';
import { useToast } from '@nuxt/ui/runtime/composables/useToast.js';
import { computed, h, onMounted, reactive, ref, resolveComponent, watch } from 'vue';
import RowActions from '../RowActions.vue';
import * as v from 'valibot';
import { deletePost, fetchPosts } from '@/api/posts';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import { usePosts } from '@/composables/usePosts';

const toast = useToast();
const { posts, loadPosts } = usePosts();

const showModal = ref(false);
const selectedPost = ref<Post>();

const formSchema = v.object({
  id: v.optional(v.number()),
  title: v.pipe(v.string(), v.minLength(8)),
  content: v.pipe(v.string()),
  category: v.pipe(v.number()),
});

type Schema = v.InferOutput<typeof formSchema>;

const formState = reactive<Partial<Schema>>({});

const data = ref<Post[]>([]);

const columns: TableColumn<Post>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => `${row.original.id}`,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => `${row.original.title}`,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => `${row.original.category_name}`,
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => `${row.original.created_at}`,
  },
  {
    id: 'actions',
    cell: ({ row }) => h(RowActions, { row, onEdit: displayModal, onDelete: handleDelete }),
  },
];

watch(selectedPost, (post) => {
  if (post) {
    formState.id = post.id;
    formState.title = post.title;
    formState.content = post.content;
    formState.category = post.category_id;
  }
});

const handleSubmit = () => {
  if (!formState.id) return;

  const index = data.value.findIndex((p) => p.id === formState.id);

  //If post exists
  if (index !== -1) {
    data.value[index] = {
      ...data.value[index],
      title: formState.title ?? '',
      content: formState.content ?? '',
      category_id: formState.category ?? 0,
    };
    toast.add({
      title: 'Post updated!',
      description: `Successfully updated post #${formState.id}`,
    });
  }

  //Close the modal

  showModal.value = false;
};

const displayModal = (post: Post) => {
  showModal.value = true;
  selectedPost.value = post;
};

const handleDelete = (post: Post) => {
  const index = data.value.findIndex((p) => p.id === post.id);

  if (index !== -1) {
    deletePost(post.id);
    data.value.splice(index, 1);

    toast.add({
      title: 'Post deleted',
      description: `Successfully deleted post #${post.id}`,
    });
  }
};

onMounted(async () => {
  await loadPosts();
  data.value = posts.value;
});

const markdown = computed(() => {
  if (!formState.content) return '';
  return DOMPurify.sanitize(marked.parse(formState.content) as string);
});
</script>

<template>
  <UDashboardPanel id="posts">
    <template #header>
      <UDashboardNavbar title="Posts">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap flex-col items-center justify-between gap-1.5">
        <UTable class="w-full shrink-0" :data="data" :columns="columns" />
      </div>
    </template>
  </UDashboardPanel>

  <UModal fullscreen v-model:open="showModal" title="Edit post" :ui="{ footer: 'justify-end' }">
    <template #body>
      <UForm :schema="formSchema" :state="formState" class="space-y-4">
        <UFormField :label="`ID: ${formState.id}`" />
        <UFormField label="Title">
          <UInput class="w-full" v-model="formState.title" />
        </UFormField>

        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Content">
            <UTextarea class="w-full" v-model="formState.content" autoresize />
          </UFormField>

          <!-- Preview -->
          <UFormField label="Preview">
            <div
              class="break-normal md:break-all w-full h-[33rem] rounded-md border border-gray-300 bg-gray-50 text-gray-900 p-2 overflow-auto font-sans prose max-w-none"
              v-html="markdown"
            ></div>
          </UFormField>
        </div>
        <UFormField :label="`Created At: ${selectedPost?.created_at}`"></UFormField>
      </UForm>
    </template>

    <template #footer="{ close }">
      <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
      <UButton label="Submit" color="neutral" @click="handleSubmit" />
    </template>
  </UModal>
</template>
