<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

// Function that calculate the number of lines of the toggleable paragraph
function calculateParagraphLines() {
  const customParagraph = document.querySelector(".custom-paragraph");

  if (customParagraph) {
    // Get the height of each line of the paragraph
    const lineHeight = parseInt(
      window.getComputedStyle(customParagraph).lineHeight
    );

    // Get the full height of the paragraph (not just the visible part - (clientHeight))
    const height = customParagraph.scrollHeight;

    return Math.round(height / lineHeight);
  }
}

const hasMoreThanTwoLines = ref(false);
const isOverflowingTextHidden = ref(true);

// Clamp the paragraph to 2 lines if
// 1. The paragraph has more than 2 lines
// 2. The overflow is not hidden
const classObject = computed(() => {
  return {
    "line-clamp-2": hasMoreThanTwoLines.value && isOverflowingTextHidden.value,
  };
});

const checkParagraphLines = () => {
  const oldValue = hasMoreThanTwoLines.value;
  const nextValue = calculateParagraphLines() > 2;

  hasMoreThanTwoLines.value = nextValue;

  // Reset the overflow state if the paragraph has less than 2 lines after resizing
  if (oldValue && !nextValue) {
    isOverflowingTextHidden.value = true;
  }
};

const toggleOverflowingText = () => {
  isOverflowingTextHidden.value = !isOverflowingTextHidden.value;
};

// Update the hasMoreThanTwoLines value when the component is mounted
onMounted(() => {
  checkParagraphLines();

  // Update the hasMoreThanTwoLines value when the window is resized
  window.addEventListener("resize", checkParagraphLines);
});

// Remove the event listener when the component is unmounted
onUnmounted(() => {
  window.removeEventListener("resize", checkParagraphLines);
});
</script>

<template>
  <div>
    <p class="custom-paragraph" :class="classObject">
      <slot />
    </p>
    <div>
      <button v-if="hasMoreThanTwoLines" @click="toggleOverflowingText">
        Toggle
      </button>
    </div>
  </div>
</template>

<style scoped>
.custom-paragraph {
  line-height: 1.5;
  text-wrap: pretty;
  outline: dashed red;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
