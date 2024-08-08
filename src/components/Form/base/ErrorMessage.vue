<template>
  <div class="error-message">
    {{ errorMessage }}
  </div>
</template>

<script setup>
const props = defineProps({
  errorMessage: {
    type: String,
  },
});
</script>

<style lang="css" scoped>
.error-message {
  color: #b00020;
  line-height: 12px;
  word-break: break-word;
  overflow-wrap: break-word;
  word-wrap: break-word;
  -webkit-hyphens: auto;
  hyphens: auto;
  transition-duration: 150ms;
  font-size: 12px;
}
</style>
