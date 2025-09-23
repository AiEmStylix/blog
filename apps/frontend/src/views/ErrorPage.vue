<script setup lang="ts"></script>
<template>
  <UError
    class="border"
    :error="{
      statusCode: 404,
      statusMessage: 'Page not found',
      message: 'The page you are looking for does not exist.',
    }"
  ></UError>
</template>
