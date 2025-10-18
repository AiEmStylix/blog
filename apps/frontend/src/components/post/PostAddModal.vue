<script setup lang="ts">
import { computed, onMounted, reactive, ref, useTemplateRef } from 'vue';
import * as v from 'valibot';
import { useToast } from '@nuxt/ui/runtime/composables/useToast.js';
import type { FormSubmitEvent } from '@nuxt/ui';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import { createPost } from '@/api/posts';
import type { SelectMenuItem } from '@nuxt/ui';
import { fetchCategories } from '@/api/categories';
import { watch } from 'vue';

const toast = useToast();

const form = useTemplateRef('form');

const schema = v.object({
  title: v.pipe(v.string()),
  content: v.pipe(v.string()),
  category_id: v.pipe(v.string()),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive<Partial<Schema>>({
  title: undefined,
});

const selectItems = ref<SelectMenuItem[]>([]);

const fetchSelectItems = async () => {
  const categories = await fetchCategories();

  selectItems.value = categories.map((c) => ({
    label: c.name,
    value: c.id,
  }));
};

const open = ref(false);

const markdown = computed(() => {
  if (!state.content) return '';
  return DOMPurify.sanitize(marked.parse(state.content) as string);
});

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    const data = event.data;

    const newPost = {
      title: data.title,
      content: data.content,
      category_id: Number(data.category_id),
    };
    const response = await createPost(newPost);
    toast.add({
      title: 'Success',
      description: `New post ${response.id} added`,
      color: 'success',
    });
  } catch (error) {
    console.error(error);
  } finally {
    open.value = false;
  }
};

onMounted(async () => {
  await fetchSelectItems();
});

watch(
  () => state.category_id,
  (val) => {
    console.log('category_id changed:', val, typeof val);
  },
);
</script>
<template>
  <UModal
    fullscreen
    v-model:open="open"
    title="New posts"
    description="Add a new posts to the database"
    :ui="{ footer: 'justify-end' }"
  >
    <UButton label="New Posts" icon="i-mdi:plus" />
    <template #body>
      <UForm ref="form" @submit="onSubmit" :schema="schema" :state="state" class="space-y-4">
        <UFormField label="Title">
          <UInput class="w-full" v-model="state.title" />
        </UFormField>

        <UFormField label="Category" required>
          <USelectMenu
            class="w-1/3"
            value-key="value"
            v-model="state.category_id"
            :items="selectItems"
          />
        </UFormField>

        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Content">
            <UTextarea class="w-full" v-model="state.content" autoresize />
          </UFormField>

          <!-- Preview -->
          <UFormField label="Preview">
            <div
              class="break-normal md:break-all w-full h-[33rem] rounded-md border border-gray-300 bg-gray-50 text-gray-900 p-2 overflow-auto font-sans prose max-w-none"
              v-html="markdown"
            ></div>
          </UFormField>
        </div>
      </UForm>
    </template>
    <template #footer="{ close }">
      <UButton label="Cancel" color="neutral" variant="subtle" @click="close" />
      <UButton label="Create" color="primary" variant="solid" @click="form?.submit()" />
    </template>
  </UModal>
</template>
