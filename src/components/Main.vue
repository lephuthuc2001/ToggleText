<template>
  <div>
    <Table :columns="studentsColumns" :items="students" />
    <hr style="margin-block: 2rem" />
    <ServerSideDataTable :columns="columns" :callQuery="callQuery">
      <template #toolBar="{ updateQuery }">
        <div class="w-80 ml-auto mb-4">
          <label
            for="search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >Search</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
              id="search"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search"
              required
              @input="updateSeach($event), updateQuery()"
              :value="search"
            />
            <button
              type="submit"
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </div>
      </template>
      <template #pagination="paginationData"> </template>
    </ServerSideDataTable>
  </div>
</template>

<script setup>
import MovieService from "../services/MovieService";
import Table from "./DataTable/base/Table.vue";
import ServerSideDataTable from "./DataTable/ServerSideDataTable.vue";
import { ref } from "vue";

const search = ref("thuc");
const updateSeach = (e) => {
  search.value = e.target.value;
};

async function callQuery(page = 1, sortBy) {
  try {
    const paramsObject = {
      page: page,
      query: search.value,
    };

    if (sortBy) {
      paramsObject.sortBy = `${sortBy.key}.${sortBy.order}`;
    }

    const response = await MovieService.searchMovies(paramsObject);

    return {
      items: response.results,
      totalItems: response.total_results,
      itemsPerPage: 20,
      page: response.page,
    };
  } catch (error) {
    console.error(error);
  }
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

const students = [
  {
    id: 1,
    name: "Alice Johnson",
    grade: "A",
  },
  {
    id: 2,
    name: "Bob Smith",
    grade: "B",
  },
  {
    id: 3,
    name: "Charlie Brown",
    grade: "C",
  },
  {
    id: 4,
    name: "Diana Prince",
    grade: "A",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    grade: "B",
  },
];

const studentsColumns = [
  {
    key: "id",
    label: "ID",
    getValue: (row) => row.id,
  },
  {
    key: "name",
    label: "Name",
    getValue: (row) => row.name,
  },
  {
    key: "grade",
    label: "Grade",
    getValue: (row) => row.grade,
  },
];
</script>

<style scoped></style>
