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
  ></ServerSideDataTable>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";
import { computed, ref, watch } from "vue";
import MovieService from "../services/MovieService";
import { debounce } from "lodash";
import ToggleText from "./ToggleText.vue";

import ServerSideDataTable from "./DataTable/ServerSideDataTable.vue";

const query = ref("love");

const handleQueryChange = debounce(function handleQueryChange(event) {
  query.value = event.target.value;
}, 500);

const page = ref(1);
const handlePageUpdate = (newPage) => {
  page.value = newPage;
};

const { data, isFetching } = useQuery({
  queryKey: ["movies", query, page],
  queryFn: ({ queryKey }) => {
    const queryParams = {
      query: queryKey[1],
      page: queryKey[2],
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
  },
  {
    key: "overview",
    label: "Overview",
    getValue: (row) => row.overview,
  },
  {
    key: "release_date",
    label: "Release Date",
    getValue: (row) => row.release_date,
    sortable: true,
  },
  {
    key: "vote_average",
    label: "Rating",
    getValue: (row) => row.vote_average,
    sortable: true,
  },
];

const items = computed(() => data.value?.results);

const totalItems = computed(() => data.value?.total_results);
watch(data, () => {
  console.log(data.value);
});
</script>

<style scoped></style>
