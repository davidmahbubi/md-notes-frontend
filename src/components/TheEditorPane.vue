<script setup>
import { onMounted } from "vue";
import * as monaco from "monaco-editor";

const emit = defineEmits(["editorKeyUp"]);

onMounted(() => {
  const editor = monaco.editor.create(document.querySelector(".editor"), {
    language: "markdown",
    minimap: {
      enabled: false,
    },
    scrollbar: {
      useShadows: true,
    },
  });
  editor.onKeyUp(() => {
    emit("editorKeyUp", editor.getValue());
  });
});
</script>

<template>
  <main class="editor-pane">
    <h3 class="my-2">Editor</h3>
    <div class="editor h-full"></div>
  </main>
</template>

<style scoped>
.editor-pane {
  height: 100vh;
  overflow: hidden;
}
</style>