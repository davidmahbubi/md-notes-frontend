<script setup>
import { ref, watch } from "vue";
import { mdToHtml } from "./../core/markdown-processor";

// Components
import ThePreviewPane from "./../components/ThePreviewPane.vue";
import TheEditorPane from "./../components/TheEditorPane.vue";

const rawText = ref();
const htmlText = ref();

function fillRawText(text) {
  rawText.value = text;
}

watch(rawText, (currentText) => {
  htmlText.value = mdToHtml(currentText);
});
</script>

<template>
  <main class="grid grid-cols-2 h-full px-4">
    <div class="left">
      <TheEditorPane @editor-key-up="fillRawText" />
    </div>
    <div class="right">
      <ThePreviewPane :html-text="htmlText" />
    </div>
  </main>
</template>