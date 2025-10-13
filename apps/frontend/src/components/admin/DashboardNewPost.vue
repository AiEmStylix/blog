<script setup lang="ts">
import { fetchCategories } from '@/api/categories';
import { createPost } from '@/api/posts';
import type { SelectMenuItem } from '@nuxt/ui';
import { useToast } from '@nuxt/ui/runtime/composables/useToast.js';
import { marked } from 'marked';
import { computed, onMounted, reactive, ref } from 'vue';
import DOMPurify from 'isomorphic-dompurify';

const formState = reactive<{
  title: string;
  content: string;
  category_id?: string | number;
}>({
  title: '',
  content: '',
  category_id: undefined,
});
const toast = useToast();

const items = ref<SelectMenuItem[]>([]);

const fetchSelectItems = async () => {
  const categories = await fetchCategories();

  items.value = categories.map((c) => ({
    label: c.name,
    value: c.id,
  }));
};

onMounted(async () => {
  await fetchSelectItems();
});

const html = computed(() => DOMPurify.sanitize(marked.parse(formState.content) as string));

const handleSubmit = async () => {
  try {
    if (!formState.title || !formState.content || !formState.category_id) {
      toast.add({ title: 'Please fill in all required fields' });
      return;
    }

    const newPost = {
      title: formState.title,
      content: formState.content,
      category_id: Number(formState.category_id),
    };

    await createPost(newPost);

    toast.add({ title: 'Post created successfully!' });

    //Reset form
    formState.title = '';
    formState.content = '';
    formState.category_id = undefined;
  } catch (error) {
    console.error(error);
    toast.add({ title: 'Failed to create post', color: 'error' });
  }
};
</script>

<template>
  <UDashboardPanel id="create-posts">
    <template #header>
      <UDashboardNavbar title="Create Posts">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UForm @submit.prevent="handleSubmit" :state="formState" class="space-y-4">
        <UFormField label="Title" required>
          <UInput class="w-full" v-model="formState.title" />
        </UFormField>
        <UFormField label="Category" required>
          <USelectMenu
            class="w-1/3"
            value-key="value"
            v-model="formState.category_id"
            :items="items"
          />
        </UFormField>

        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Content" required>
            <UTextarea :rows="26" class="w-full" autoresize v-model="formState.content" />
          </UFormField>

          <!-- Preview -->
          <UFormField label="Preview">
            <div
              class="break-normal md:break-all w-full h-[33rem] rounded-md border border-gray-300 bg-gray-50 text-gray-900 p-2 overflow-auto font-sans prose max-w-none"
              v-html="html"
            ></div>
          </UFormField>
        </div>

        <div class="flex justify-end">
          <UButton type="submit" class="px-6">Submit</UButton>
        </div>
      </UForm>
    </template>
  </UDashboardPanel>
</template>
