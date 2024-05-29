<template>
  <main>
    <h1 class="text-2xl font-bold">Covid-19 Statistics</h1>

    <p v-if="isLoading">Loading data ...</p>
    <p v-else-if="error">{{ error }}</p>
    <section class="max-w-screen-lg mx-auto">
      <DataGrid v-if="data" :dataSource="dataSource" />
    </section>
  </main>
</template>

<script setup>
import { computed, onUpdated } from "vue";
import useFetchCovidStatistics from "../composables/useFetchCovidStatistics";
import DataGrid from "./DataGrid.vue";

const { data, error, isLoading } = useFetchCovidStatistics();

function transformData(data) {
  return data.map((item) => {
    return {
      continent: item.continent,
      country: item.country,
      population: item.population,
      cases: item.cases.total,
      deaths: item.deaths.total,
    };
  });
}

const dataSource = computed(() => {
  return transformData(data.value);
});
</script>

<style scoped></style>
