<script setup lang="ts"></script>
<template>
  <div class="flex justify-center items-center flex-col gap-2 l">
    <RouterLink to="/" class="flex flex-col items-center justify-center">
      <img src="/avatar.png" alt="" class="rounded-full w-[112px]" />
      <h1 class="font-bold text-2xl">Stylix</h1>
    </RouterLink>
    <p>Blog xàm xí về cuộc sống và công nghệ của tôi</p>

    <div class="flex gap-2">
      <UButton
        icon="i-mdi-at"
        to="mailto:anhduongfa@gmail.com"
        class="bg-gray-300 rounded-full text-gray-800 hover:text-white hover:bg-gray-800"
      ></UButton>
      <UButton
        icon="i-mdi-github"
        to="https://github.com/AiEmStylix"
        target="_blank"
        class="bg-gray-300 rounded-full text-gray-800 hover:text-white hover:bg-gray-800"
      ></UButton>
      <UButton
        icon="i-mdi-facebook"
        to="https://www.facebook.com/AiEmStylix"
        class="bg-gray-300 rounded-full text-gray-800 hover:text-white hover:bg-gray-800"
      ></UButton>
      <UButton
        icon="i-mdi-twitter"
        to="https://example.com/"
        class="bg-gray-300 rounded-full text-gray-800 hover:text-white hover:bg-gray-800"
      ></UButton>
    </div>
  </div>
</template>
