<script setup>
import { ref } from "vue";
import { onMounted, watch } from "@vue/runtime-core";
import * as monaco from "monaco-editor";
import showdown from "showdown";
import PreviewPane from "./../components/PreviewPane.vue";

const rawText = ref();
const htmlText = ref();

const converter = new showdown.Converter();

onMounted(() => {
  const editor = monaco.editor.create(document.querySelector(".editor"), {
    language: "markdown",
    minimap: {
      enabled: true,
      autohide: true,
    },
  });
  editor.onKeyUp(() => {
    rawText.value = editor.getValue();
  });
});

watch(rawText, (val) => {
  htmlText.value = converter.makeHtml(val);
});
</script>

<template>
  <main class="grid grid-cols-2 h-full px-4">
    <div class="left editor-pane">
      <h3 class="my-2">Editor</h3>
      <div class="editor h-full"></div>
    </div>
    <div class="right">
      <PreviewPane :html-text="htmlText" />
    </div>
  </main>
</template>

<style lang="postcss">
.editor-pane {
  height: 100vh;
  overflow: hidden;
}
</style>