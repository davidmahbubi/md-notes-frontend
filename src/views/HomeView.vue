<script setup>
import { onMounted, ref, watch } from "vue";
import { mdToHtml } from "./../core/markdown-processor";
import interact from 'interactjs';

// Components
import ThePreviewPane from "./../components/ThePreviewPane.vue";
import TheEditorPane from "./../components/TheEditorPane.vue";

const rawText = ref();
const htmlText = ref();

onMounted(() => {
  interact('.resizable-right').resizable({
    edges: { right: true },
    listeners: {
      move(evt) {
        let { x, y } = evt.target.dataset;

        x = (parseFloat(x) || 0) + evt.deltaRect.left
        y = (parseFloat(y) || 0) + evt.deltaRect.top

        Object.assign(evt.target.style, {
          width: `${evt.rect.width}px`,
          height: `${evt.rect.height}px`,
          transform: `translate(${x}px, ${y}px)`
        });

        updatePreviewWindowSize(evt.rect.width);

        Object.assign(evt.target.dataset, { x, y })
      }
    }
  });
});

function updatePreviewWindowSize(width) {
  const previewPaneWindow = document.querySelector('.preview-pane-window');   
  Object.assign(previewPaneWindow.style, {
    width: `${window.innerWidth - width}px`,
  });
}

function fillRawText(text) {
  rawText.value = text;
}

watch(rawText, async (currentText) => {
  htmlText.value = String(await mdToHtml(currentText));
});

</script>

<template>
  <main class="h-full px-4" style="display: flex;">
    <div class="left resizable-right">
      <TheEditorPane @editor-key-up="fillRawText" />
    </div>
    <div class="right preview-pane-window">
      <ThePreviewPane :html-text="htmlText" />
    </div>
  </main>
</template>

<style scoped>
.resizable-right {
  min-width: 200px;
  width: 50vw;
}

.preview-pane-window {
  border-left: 2px solid black;
}
</style>