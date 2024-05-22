<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from "vue";

// Refs
const paragraphRef = ref(null);
const hasMoreThanTwoLines = ref(false);
const isOverflowingTextHidden = ref(true);
const lineHeight = ref(0);

// Toggle the visibility of overflowing text
const toggleOverflowingText = () => {
  isOverflowingTextHidden.value = !isOverflowingTextHidden.value;
};

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.target !== paragraphRef.value) continue;

    // If total height <= 2 lines, do not show the toggle button
    if (paragraphRef.value.scrollHeight <= 2 * lineHeight.value) {
      hasMoreThanTwoLines.value = false;
      isOverflowingTextHidden.value = true;
    } else {
      hasMoreThanTwoLines.value = true;
    }

    break;
  }
});

onMounted(() => {
  // Get the line height of the paragraph
  lineHeight.value = parseInt(
    window.getComputedStyle(paragraphRef.value).lineHeight
  );

  // Check if the paragraph has more than 2 lines
  hasMoreThanTwoLines.value =
    paragraphRef.value.scrollHeight > 2 * lineHeight.value;

  resizeObserver.observe(paragraphRef.value);
});

onUnmounted(() => {
  resizeObserver.disconnect();
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <p
      ref="paragraphRef"
      class="outline-2 outline-offset-2 outline-red outline-dotted"
      :class="{ 'line-clamp-2': isOverflowingTextHidden }"
    >
      <slot />
    </p>

    <button
      class="block mx-auto w-fit border border-gray-300 rounded-md px-2 py-1 bg-orange-600 text-white"
      v-if="hasMoreThanTwoLines"
      @click="toggleOverflowingText"
    >
      {{ isOverflowingTextHidden ? "Expand" : "Show less" }}
    </button>
  </div>
</template>

<style scoped></style>
