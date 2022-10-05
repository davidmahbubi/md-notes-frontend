<script setup>
const props = defineProps({
  htmlText: String,
});
</script>

<template>
  <main class="px-3">
    <h3 class="my-2">Preview</h3>
    <section v-html="htmlText"></section>
  </main>
</template>

<style scoped>
</style>