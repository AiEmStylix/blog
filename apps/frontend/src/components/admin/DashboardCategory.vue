<script setup lang="ts">
import { deleteCategory, fetchCategories } from '@/api/categories';
import type { Category } from '@/types/Category';
import type { TableColumn } from '@nuxt/ui';
import { h, onMounted, ref } from 'vue';
import RowActions from '../RowActions.vue';
import { useToast } from '@nuxt/ui/runtime/composables/useToast.js';

const toast = useToast();

const columns: TableColumn<Category>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
    cell: ({ row }) => `${row.original.id}`,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => `${row.original.name}`,
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
    cell: ({ row }) => `${row.original.slug}`,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => h(RowActions<Category>, { row, onEdit: handleEdit, onDelete: handleDelete }),
  },
];

const handleEdit = (category: Category) => {
  console.log(category);
};

const handleDelete = async (category: Category) => {
  const index = data.value.findIndex((c) => c.id === category.id);

  if (index !== -1) {
    await deleteCategory(category.id);
    data.value.splice(index, 1);

    toast.add({
      title: 'Category deleted',
      description: `Successfully deleted post #${category.id}`,
    });
  }
};

const data = ref<Category[]>([]);

onMounted(async () => {
  const fetchData = await fetchCategories();
  data.value = fetchData;
});
</script>

<template>
  <UDashboardPanel id="Category">
    <template #header>
      <UDashboardNavbar title="Category">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UTable :columns="columns" :data="data" />
    </template>
  </UDashboardPanel>
</template>
