<template>
  <main class="flex flex-col gap-4">
    <h1 class="text-2xl font-bold">Covid-19 Statistics</h1>

    <DataGrid />
    <p v-if="isLoading">Loading data ...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else-if="data">{{ data[0] }}</p>
  </main>
</template>

<script setup>
import useFetchCovidStatistics from "../composables/useFetchCovidStatistics";
import DataGrid from "./DataGrid.vue";

const { data, error, isLoading } = useFetchCovidStatistics();
</script>

<style scoped></style>
