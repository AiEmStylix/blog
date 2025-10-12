import type { Post } from '@/types/Post';
import type { DropdownMenuItem, TableRow } from '@nuxt/ui';
import { useToast } from '@nuxt/ui/runtime/composables/useToast.js';

export function usePostActions(options?: {
  onView?: (post: Post) => void;
  onEdit?: (post: Post) => void;
  onDelete?: (post: Post) => void;
}) {
  const toast = useToast();

  function getRowItems(row: TableRow<Post>): DropdownMenuItem[] {
    return [
      { type: 'label', label: 'Actions' },
      {
        label: 'Copy post ID',
        icon: 'i-mdi:content-copy',
        onSelect() {
          navigator.clipboard.writeText(row.original.id.toString());
          toast.add({
            title: 'Copied to clipboard',
            description: 'Customer ID copied to clipboard',
          });
        },
      },
      { type: 'separator' },
      {
        label: 'Edit post',
        icon: 'i-mdi:format-list-bulleted',
        onSelect: () => options?.onEdit?.(row.original),
      },
      {
        label: 'View post',
        icon: 'i-mdi:eye-outline',
        onSelect: () => options?.onView?.(row.original),
      },
      { type: 'separator' },
      {
        label: 'Delete post',
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
