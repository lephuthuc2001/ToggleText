<template>
  <main>
    <h1 class="text-2xl font-bold">Covid-19 Statistics</h1>

    <p v-if="isLoading">Loading data ...</p>
    <p v-else-if="error">{{ error }}</p>
    <section class="max-w-screen-lg mx-auto">
      <DataGrid
        v-if="data"
        :dataSource="data"
        :columns="columns"
        :caption="caption"
        :styles="styles"
      />
    </section>

    <hr class="my-8" />
    <!-- <section class="max-w-screen-lg mx-auto">
      <DataGrid v-if="todos" :dataSource="todos" />
    </section> -->
  </main>
</template>

<script setup>
import useFetchCovidStatistics from "../composables/useFetchCovidStatistics";
import DataGrid from "./DataGrid.vue";
import useFetch from "../composables/useFetch";

const { data, error, isLoading } = useFetchCovidStatistics();

const columns = [
  {
    label: "Continent",
    key: "continent",
    sortable: true,
    searchable: true,
    getValue(row) {
      return row.continent;
    },
  },
  {
    label: "Country",
    key: "country",
    searchable: true,
    getValue(row) {
      return row.country;
    },
  },
  {
    label: "Population",
    key: "population",
    sortable: true,
    getValue(row) {
      return row.population;
    },
  },
  {
    label: "Cases",
    key: "cases",
    sortable: true,
    getValue(row) {
      return row.cases.total;
    },
  },
  {
    label: "Deaths",
    key: "deaths",
    sortable: true,
    initialSort: "asc",
    getValue(row) {
      return row.deaths.total;
    },
  },
];

const styles = {
  table: "border-collapse w-full",
  header: {
    row: "bg-gray-200",
    cell: "p-2",
  },
  body: {
    row: "border-b",
    cell: "p-2",
  },
  caption: "text-lg font-bold caption-top text-slate-800 mb-2",
};

const caption = "Covid-19 Statistics";

const { data: todos, error: todosError } = useFetch(
  "https://jsonplaceholder.typicode.com/todos"
);
</script>

<style scoped></style>
