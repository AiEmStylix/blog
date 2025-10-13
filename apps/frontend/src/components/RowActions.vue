<script setup lang="ts">
import { usePostActions } from '@/composables/usePostActions';
import type { Post } from '@/types/Post';
import type { TableRow } from '@nuxt/ui';

const props = defineProps<{
  row: TableRow<Post>;
}>();

const emit = defineEmits<{
  (e: 'view', post: Post): void;
  (e: 'edit', post: Post): void;
  (e: 'delete', post: Post): void;
}>();

const { getRowItems } = usePostActions({
  onEdit: (post) => emit('edit', post),
  onView: (post) => emit('view', post),
  onDelete: (post) => emit('delete', post),
});
</script>

<template>
  <div class="text-right">
    <UDropdownMenu :items="getRowItems(props.row)" :content="{ align: 'end' }">
      <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" class="ml-auto" />
    </UDropdownMenu>
  </div>
</template>
