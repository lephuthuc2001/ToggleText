<template>
  <Suspense>
    <template #default>
      <App />
    </template>
    <template #fallback>
      <v-progress-circular indeterminate color="primary" />
    </template>
  </Suspense>
</template>
<script setup>
import App from "../App.vue";
</script>
