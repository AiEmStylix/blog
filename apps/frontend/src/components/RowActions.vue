<script setup lang="ts" generic="T">
import { useRowActions } from '@/composables/useRowActions';
import type { Post } from '@/types/Post';
import type { TableRow } from '@nuxt/ui';

const props = defineProps<{
  row: TableRow<T>;
}>();

const emit = defineEmits<{
  (e: 'view', item: T): void;
  (e: 'edit', item: T): void;
  (e: 'delete', item: T): void;
}>();

const { getRowItems } = useRowActions<T>({
  onEdit: (item) => emit('edit', item),
  onView: (item) => emit('view', item),
  onDelete: (item) => emit('delete', item),
});
</script>

<template>
  <div class="text-right">
    <UDropdownMenu :items="getRowItems(props.row)" :content="{ align: 'end' }">
      <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" class="ml-auto" />
    </UDropdownMenu>
  </div>
</template>
