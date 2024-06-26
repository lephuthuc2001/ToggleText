<template>
  <ServerSideDataTable
    v-if="items"
    :columns="columns"
    :items="items"
    :totalItems="data?.total_results || 0"
    :isLoading="isFetching"
    :itemsPerPage="items.length || 10"
    :itemsPerPageOptions="[]"
    :itemsLength="totalItems"
    :page="page"
    @update-page="handlePageUpdate"
    @update-sort="handleSortUpdate"
  >
    <template #body-overview="{ value }">
      <ToggleText>
        {{ value }}
      </ToggleText>
    </template>
  </ServerSideDataTable>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";
import { computed, ref, watch } from "vue";
import MovieService from "../services/MovieService";
import { debounce } from "lodash";
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
</script>

<style scoped></style>
