<template>
  <main class="flex flex-col gap-4">
    <ComposableExample />
    <hr />
    <div>
      <h2 class="mb-4">Toggle Text component</h2>
      <ToggleText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
        obcaecati quis quae. Quaerat saepe, reiciendis ut rerum corrupti
        distinctio amet cupiditate ratione voluptatem est asperiores sint vero
        eius, maxime iste?
      </ToggleText>
    </div>
  </main>
</template>

<script setup>
import ToggleText from "./ToggleText.vue";
import ComposableExample from "./ComposableExample.vue";
</script>

<style scoped></style>
