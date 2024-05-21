<template>
  <footer class="mt-auto pt-4">
    <p class="text-center">{{ time }}</p>
  </footer>
</template>

<script setup>
import useClock from "../composables/useClock";

const { time } = useClock();
</script>

<style scoped></style>
