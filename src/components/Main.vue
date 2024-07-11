<template>
  <div>
    <Table :items="items" :columns="columns"></Table>

    <hr style="margin-block: 2rem" />

    <ServerSideDataTable
      :items="items"
      :columns="columns"
      :isLoading="isFetching"
      :itemsPerPage="20"
      :search-query="query"
      v-model:totalItems="totalItems"
      @update-page="handlePageUpdate"
      @update-sort="handleSortUpdate"
    >
      <template #toolBar>
        <v-responsive class="ml-auto" max-width="344">
          <v-text-field
            clearable
            label="Search"
            prepend-icon="mdi-search"
            placeholder="Love"
            :modelValue="query"
            type="text"
            @update:modelValue="handleQueryUpdate"
          ></v-text-field>
        </v-responsive>
      </template>

      <template #table="{ items, columns, sortState }">
        <Table :items="items" :columns="columns" :sortState="sortState">
          <template #header-title="{ value }">
            <span style="color: red; text-align: left"> {{ value }}</span>
          </template>
          <template #body-vote_average="{ value }">
            <span
              class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-blue-400"
              >{{ value }}</span
            >
          </template>

          <template #header-release_date="{ value, sortState }">
            <span>{{ value }}</span>

            <span v-if="sortState.isSortActive">
              {{ sortState.sortOrder === "asc" ? "↑" : "↓" }}
            </span>
            <span v-else> ⇅ </span>
          </template>
        </Table>
      </template>

      <template #pagination="paginationData"> </template>
    </ServerSideDataTable>
  </div>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";
import { computed, ref, watch } from "vue";
import MovieService from "../services/MovieService";
import ToggleText from "./ToggleText.vue";
import Table from "./DataTable/base/Table.vue";

import ServerSideDataTable from "./DataTable/ServerSideDataTable.vue";

const query = ref("love");

const page = ref(1);
const handlePageUpdate = (newPage) => {
  page.value = newPage;
};

const handleQueryUpdate = (newQuery) => {
  query.value = newQuery;
};

const sortState = ref(null);
const handleSortUpdate = (newSortState) => {
  console.log({ newSortState });
  if (newSortState.key) {
    sortState.value = newSortState.key + "." + newSortState.order;
  } else {
    sortState.value = null;
  }
};

const { data, isFetching } = useQuery({
  queryKey: ["movies", query, page, sortState],
  queryFn: ({ queryKey }) => {
    const queryParams = {
      query: queryKey[1],
      page: queryKey[2],
      sort_by: queryKey[3],
    };

    return MovieService.searchMovies(queryParams);
  },
  placeholderData: (previousData, previousQuery) => previousData,
});

const columns = [
  {
    key: "title",
    label: "Title",
    getValue: (row) => row.original_title,
    width: "20%",
  },
  {
    key: "overview",
    label: "Overview",
    getValue: (row) => row.overview,
    width: "40%",
  },
  {
    key: "release_date",
    label: "Release Date",
    getValue: (row) => row.release_date,
    sortable: true,
    width: "20%",
  },
  {
    key: "vote_average",
    label: "Rating",
    getValue: (row) => row.vote_average,
    sortable: true,
    width: "20%",
  },
];

const items = computed(() => data.value?.results);

const totalItems = computed(() => data.value?.total_results);
</script>

<style scoped></style>
