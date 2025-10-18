<script setup lang="ts">
import { reactive, ref } from 'vue';
import * as v from 'valibot';
import { useToast } from '@nuxt/ui/runtime/composables/useToast.js';
import type { FormSubmitEvent } from '@nuxt/ui';
import { createCategory } from '@/api/categories';

const emit = defineEmits<{
  (e: 'created'): void;
}>();

const schema = v.object({
  name: v.pipe(v.string()),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: undefined,
});

const toast = useToast();
const open = ref(false);

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    const newCategory = await createCategory({
      name: state.name ?? '',
    });
    toast.add({
      title: 'Success',
      description: `New category ${event.data.name} added`,
      color: 'success',
    });
    emit('created');
  } catch (error) {
    console.error(error);
  } finally {
    open.value = false;
  }
};
</script>
<template>
  <UModal v-model:open="open" title="New Category" description="Add a new category to the database">
    <UButton label="New Category" icon="i-mdi:plus" />
    <template #body>
      <UForm @submit="onSubmit" :schema="schema" :state="state" class="space-y-4">
        <UFormField label="Name" placeholder="I miss her">
          <UInput class="w-full" v-model="state.name" />
        </UFormField>
        <div class="flex justify-end gap-2">
          <UButton label="Cancel" color="neutral" variant="subtle" @click="open = false" />
          <UButton label="Create" color="primary" variant="solid" type="submit" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
