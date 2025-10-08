<script setup lang="ts">
import type { Post } from '@/types/Post';
import type { TableColumn } from '@nuxt/ui';
import { useToast } from '@nuxt/ui/runtime/composables/useToast.js';
import { h, reactive, ref, resolveComponent, watch } from 'vue';
import RowActions from '../RowActions.vue';
import * as v from 'valibot';

const toast = useToast();

const showModal = ref(false);
const selectedPost = ref<Post>();

function displayModal(post: Post) {
  showModal.value = true;
  selectedPost.value = post;
}

const formSchema = v.object({
  id: v.optional(v.number()),
  title: v.pipe(v.string(), v.minLength(8)),
  content: v.pipe(v.string()),
  category: v.pipe(v.number()),
});

type Schema = v.InferOutput<typeof formSchema>;

const formState = reactive<Partial<Schema>>({});

const data = ref<Post[]>([
  {
    id: 1,
    title: 'Getting Started with Markdown',
    content: '# Markdown Feature Showcase...',
    category_id: 1,
    created_at: '2025-09-28 18:39:23',
  },
  {
    id: 2,
    title: 'Vue 3 Composition API Basics',
    content: 'Learn how to use Vue 3 Composition API...',
    category_id: 2,
    created_at: '2025-09-29 10:15:00',
  },
  {
    id: 3,
    title: 'Understanding REST APIs',
    content: 'A REST API (Representational State Transfer)...',
    category_id: 3,
    created_at: '2025-09-30 14:42:10',
  },
  {
    id: 4,
    title: 'JavaScript ES6 Features',
    content: 'ES6 introduced many features like...',
    category_id: 1,
    created_at: '2025-10-01 09:30:45',
  },
  {
    id: 5,
    title: 'Intro to Databases with SQL',
    content: 'SQL (Structured Query Language) is used to manage relational databases...',
    category_id: 4,
    created_at: '2025-10-01 16:22:05',
  },
  {
    id: 6,
    title: 'Getting Productive with Git',
    content: 'Git is a distributed version control system...',
    category_id: 5,
    created_at: '2025-10-02 08:55:12',
  },
]);

const columns: TableColumn<Post>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => `#${row.original.id}`,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => `${row.original.title}`,
  },
  {
    accessorKey: 'category_id',
    header: 'Category',
    cell: ({ row }) => `${row.getValue('category_id')}`,
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => `${row.getValue('created_at')}`,
  },
  {
    id: 'actions',
    cell: ({ row }) => h(RowActions, { row, onView: displayModal }),
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

function handleSubmit() {
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
}
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
        <UFormField label="Content">
          <UTextarea class="w-full" v-model="formState.content" autoresize />
        </UFormField>
        <UFormField :label="`Created At: ${selectedPost?.created_at}`"></UFormField>
      </UForm>
    </template>

    <template #footer="{ close }">
      <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
      <UButton label="Submit" color="neutral" @click="handleSubmit" />
    </template>
  </UModal>
</template>
