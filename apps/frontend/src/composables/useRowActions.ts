import type { Post } from '@/types/Post';
import type { DropdownMenuItem, TableRow } from '@nuxt/ui';
import { useToast } from '@nuxt/ui/runtime/composables/useToast.js';

interface UseRowActionsOptions<T> {
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function useRowActions<T>(options: UseRowActionsOptions<T>) {
  const toast = useToast();

  function getRowItems(row: TableRow<T>): DropdownMenuItem[] {
    return [
      { type: 'label', label: 'Actions' },
      {
        label: 'Edit',
        icon: 'i-mdi:format-list-bulleted',
        onSelect: () => options?.onEdit?.(row.original),
      },
      {
        label: 'View',
        icon: 'i-mdi:eye-outline',
        onSelect: () => options?.onView?.(row.original),
      },
      { type: 'separator' },
      {
        label: 'Delete',
        icon: 'i-mdi:delete',
        color: 'error',
        onSelect: () => {
          options?.onDelete?.(row.original);
        },
      },
    ];
  }

  return { getRowItems };
}
