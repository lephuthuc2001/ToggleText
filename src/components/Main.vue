<template>
  <ServerSideDataTable
    v-if="items"
    :columns="columns"
    :items="items"
    :totalItems="data?.total_results || 0"
    :isLoading="isFetching"
    :itemsPerPage="20"
    :itemsPerPageOptions="[]"
    :itemsLength="totalItems"
    :page="page"
    :searchQuery="query"
    @update-page="handlePageUpdate"
    @update-sort="handleSortUpdate"
  >
    <template #toolBar>
      <div>
        <v-text-field
          v-model="query"
          class="basis-48 w-40 ml-auto mb-4"
          density="compact"
          placeholder="Search movies"
          hide-details
        ></v-text-field>
      </div>
    </template>
    <template #body-overview="{ value }">
      <ToggleText>
        {{ value }}
      </ToggleText>
    </template>

    <template #sort-vote_average="{ sortOrder }">
      <span class="ml-1">
        {{ sortOrder === "asc" ? "⬆️" : sortOrder === "desc" ? "⬇️" : "♻️" }}
      </span>
    </template>

    <template
      #pagination="{
        startFromEntry,
        endAtEntry,
        isPrevDisabled,
        isNextDisabled,
        prevPage,
        nextPage,
      }"
    >
    </template>
  </ServerSideDataTable>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";
import { computed, ref, watch } from "vue";
import MovieService from "../services/MovieService";
import ToggleText from "./ToggleText.vue";

import ServerSideDataTable from "./DataTable/ServerSideDataTable.vue";

const query = ref("love");

const page = ref(1);
const handlePageUpdate = (newPage) => {
  page.value = newPage;
};

const sortState = ref(null);
const handleSortUpdate = (newSortState) => {
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

watch(query, (va) => {
  console.log("query", va);
});
</script>

<style scoped></style>
