<template>
  <div>
    <hr style="margin-block: 2rem" />

    <ServerSideDataTable :columns="columns" :callQuery="callQuery">
      <template #toolBar> </template>

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

          <template #header-release_date="{ value, sortState }"> </template>
        </Table>
      </template>

      <template #pagination="paginationData"> </template>
    </ServerSideDataTable>
  </div>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";
import MovieService from "../services/MovieService";
import Table from "./DataTable/base/Table.vue";
import ServerSideDataTable from "./DataTable/ServerSideDataTable.vue";
import { computed, toValue, watch } from "vue";

function callQuery(page = 1, query = "thuc", sortBy) {
  const { data, isFetching } = useQuery({
    queryKey: ["movies", query, page, sortBy],
    queryFn: ({ queryKey }) => {
      const sort_by = queryKey[3]?.key
        ? queryKey[3]?.key + "." + queryKey[3].order
        : null;

      let queryParams = {
        query: queryKey[1],
        page: queryKey[2],
      };

      if (sort_by) {
        queryParams = { ...queryParams, sort_by };
      }
      return MovieService.searchMovies(queryParams);
    },
    placeholderData: (previousData, previousQuery) => previousData,
  });

  const items = computed(() => data.value?.results ?? []);
  const totalItems = computed(() => data.value?.total_results ?? 0);

  return { isLoading: isFetching, items, totalItems, itemsPerPage: 20 };
}

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
</script>

<style scoped></style>
