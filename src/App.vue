<template>
  <h1>Week 4 - Mentorship Program</h1>
  <hr />
  <h2>Toggle Text component</h2>
  <ToggleText>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore obcaecati
    quis quae. Quaerat saepe, reiciendis ut rerum corrupti distinctio amet
    cupiditate ratione voluptatem est asperiores sint vero eius, maxime iste?
  </ToggleText>
</template>

<script setup>
import ToggleText from "./components/ToggleText.vue";
</script>

<style scoped>
label[for="paragraph"] {
  display: block;
  margin-bottom: 0.5rem;
}

#paragraph {
  width: 100%;
  margin-bottom: 1rem;
}
</style>
