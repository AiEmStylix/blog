<script setup lang="ts">
const props = defineProps<{
  title: string;
  content: string;
  category: string;
  author: string;
  avatar: string;
  createdAt: string;
  image: string;
}>();
</script>

<template>
  <UCard class="mb-4 h-full flex flex-col">
    <!-- Header -->
    <template #header>
      <img :src="image" alt="Post image" class="w-full h-48 object-cover rounded-t-lg" />
    </template>

    <!-- Body -->
    <template #default>
      <div class="flex-1 flex flex-col gap-3 h-50">
        <span
          class="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white w-fit"
        >
          {{ props.category }}
        </span>

        <h2 class="text-lg font-semibold leading-snug line-clamp-2">
          {{ props.title }}
        </h2>

        <!-- Content -->
        <p class="text-sm text-gray-700 line-clamp-3">
          {{ props.content }}
        </p>
      </div>
    </template>

    <!-- Footer -->
    <template #footer>
      <div class="flex items-center pt-3 text-sm text-gray-500">
        <UAvatar :src="props.avatar" size="sm" class="mr-2" />
        <div class="flex flex-col">
          <span class="font-medium">{{ props.author }}</span>
          <span class="text-xs text-gray-400">{{ props.createdAt }}</span>
        </div>
      </div>
    </template>
  </UCard>
</template>
