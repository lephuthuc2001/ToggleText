<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";

// Refs
const paragraphRef = ref(null);
const hasMoreThanTwoLines = ref(false);
const isOverflowingTextHidden = ref(true);
const maxHeightOfVisibleText = ref(0);

// Toggle the visibility of overflowing text
const toggleOverflowingText = () => {
  isOverflowingTextHidden.value = !isOverflowingTextHidden.value;
};

// Watch for changes in the visibility of overflowing text
watch(isOverflowingTextHidden, () => {
  paragraphRef.value.classList.toggle("line-clamp-2");
});

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.target !== paragraphRef.value) continue;

    // If total height <= 2 lines, do not show the toggle button
    if (paragraphRef.value.scrollHeight <= maxHeightOfVisibleText.value) {
      hasMoreThanTwoLines.value = false;
      isOverflowingTextHidden.value = true;
    } else {
      hasMoreThanTwoLines.value = true;
    }

    break;
  }
});

onMounted(function () {
  // Set the maximum visible height of the text
  maxHeightOfVisibleText.value = paragraphRef.value.clientHeight;

  hasMoreThanTwoLines.value =
    maxHeightOfVisibleText.value < paragraphRef.value.scrollHeight;

  resizeObserver.observe(paragraphRef.value);
});

onUnmounted(() => {
  resizeObserver.disconnect();
});
</script>

<template>
  <div>
    <p
      ref="paragraphRef"
      class="outline-2 outline-offset-2 outline-red outline-dotted line-clamp-2"
    >
      <slot />
    </p>

    <button
      class="block"
      v-if="hasMoreThanTwoLines"
      @click="toggleOverflowingText"
    >
      {{ isOverflowingTextHidden ? "Expand" : "Show less" }}
    </button>
  </div>
</template>

<style scoped></style>
