<template>
  <main>
    <div class="xl:max-w-screen-lg mx-auto">
      <ServerSideDataTable
        :isLoading="isFetching"
        :columns="columns"
        :items="data?.results || []"
        :itemsPerPage="5"
        @update-sort="handleSortChange"
      >
        <template #toolBar>
          <form @submit.prevent class="max-w-md mx-auto mb-4">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only"
              >Search</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
              >
                <svg
                  class="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="movieSearch"
                name="movieSearch"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for movies..."
                required
                @input="handleQueryChange"
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </template>

        <template #body-vote_average="{ value }">
          <span
            v-if="value >= 7"
            class="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full"
            >{{ value }}</span
          >
          <span
            v-else-if="value >= 5"
            class="px-2 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full"
            >{{ value }}</span
          >
          <span
            v-else
            class="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full"
            >{{ value }}</span
          >
        </template>

        <template #body-overview="{ value }">
          <ToggleText>
            {{ value }}
          </ToggleText>
        </template>
      </ServerSideDataTable>
    </div>
  </main>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";
import { ref } from "vue";
import MovieService from "../services/MovieService";
import ServerSideDataTable from "./DataTable/ServerSideDataTable.vue";
import { debounce } from "lodash";
import ToggleText from "./ToggleText.vue";

const query = ref("");
const sortBy = ref("");

const handleQueryChange = debounce(function handleQueryChange(event) {
  query.value = event.target.value;
}, 500);

const handleSortChange = (activeSort) => {
  sortBy.value = activeSort.columnKey + "." + activeSort.direction;
};

const { data, isFetching } = useQuery({
  queryKey: ["movies", query, sortBy],
  queryFn: ({ queryKey }) => {
    const queryParams = {
      query: queryKey[1],
    };

    if (queryKey[2]) {
      queryParams.sort_by = queryKey[2];
    }

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
</script>

<style scoped></style>
