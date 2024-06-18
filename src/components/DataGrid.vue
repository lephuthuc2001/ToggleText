<template>
  <div class="p-5 relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="pb-4 bg-white ml-auto">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative mt-1">
        <input
          type="text"
          id="table-search"
          class="block py-2 ps-4 ml-auto text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search..."
          :value="searchTerm"
          @input="handleSearchTermChange"
        />
      </div>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-50">
      <caption class="text-lg font-bold caption-top">
        {{
          caption
        }}
      </caption>
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <template v-for="column in columns" :key="column.key">
            <th v-if="!column.sortable" scope="col" class="px-6 py-3">
              {{ column.label }}
            </th>

            <th v-else scope="col" class="px-6 py-3 h-12">
              <div class="flex items-center justify-start gap-2">
                {{ column.label }}
                <button
                  class="flex justify-center"
                  @click="() => handleSort(column)"
                >
                  <SwapOutlined
                    v-if="!isSortActive(column)"
                    :rotate="270"
                    :class="{
                      'text-gray-400': true,
                      'text-lg': true,
                    }"
                  />
                  <SortAscendingOutlined
                    v-else-if="isSortActive(column) && isSortAscending(column)"
                    :class="{
                      'text-blue-600': true,
                      'text-lg': true,
                    }"
                  />

                  <SortDescendingOutlined
                    v-else-if="isSortActive(column) && !isSortAscending(column)"
                    :class="{
                      'text-blue-600': true,
                      'text-lg': true,
                    }"
                  />
                </button>
              </div>
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b hover:bg-gray-50"
          v-for="row in visibleContent"
          :key="row.toString()"
        >
          <td
            class="px-6 py-4 text-gray-900"
            v-for="column in columns"
            :key="column.key"
          >
            {{ column.getValue(row) }}
          </td>
        </tr>
      </tbody>
    </table>
    <nav
      class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 w-full"
      aria-label="Table navigation"
    >
      <span
        class="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto"
        >Showing
        <span class="font-semibold text-gray-900">
          {{ (paginationState.currentPage - 1) * paginationState.pageSize + 1 }}
          -
          {{
            Math.min(
              paginationState.currentPage * paginationState.pageSize,
              processedContent.length
            )
          }}
        </span>
        of
        <span class="font-semibold text-gray-900">{{
          processedContent.length
        }}</span></span
      >
      <ul class="inline-flex -space-x-px gap-2 rtl:space-x-reverse text-sm h-8">
        <li>
          <button
            @click="previousPage"
            :disabled="isPreviousPageDisabled"
            href="#"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
        </li>

        <li>
          <button
            @click="nextPage"
            :disabled="isNextPageBtnDisabled"
            href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import useSearch from "../composables/useSearch";
import debounce from "lodash/debounce";
import orderBy from "lodash/orderBy";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  SwapOutlined,
} from "@ant-design/icons-vue";

const { columns, dataSource, caption, styles } = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  dataSource: {
    required: true,
    type: Array,
  },
  caption: {
    type: String,
  },
  styles: {
    type: Object,
  },
});

/*
-------------------- HANDLE SEARCH Functionality --------------------
*/
const searchTerm = ref("");

const handleSearchTermChange = debounce((event) => {
  searchTerm.value = event.target.value;
}, 300);

const { search } = useSearch(
  dataSource,
  columns.filter((column) => column.searchable).map((column) => column.key)
);

/*
-------------------- HANDLE SORT Functionality --------------------
*/

const sortableColumnsWithInitialSort = columns.filter(
  (column) => column.sortable && column.initialSort
);

const sortState = ref({
  columns: sortableColumnsWithInitialSort.map((column) => column.getValue),
  orders: sortableColumnsWithInitialSort.map((column) => column.initialSort),
});

const handleSort = (column) => {
  const index = sortState.value.columns.indexOf(column.getValue);

  // if column is not in the sort state, add it
  if (index === -1) {
    sortState.value.columns.push(column.getValue);
    sortState.value.orders.push("asc");
  } else {
    const order = sortState.value.orders[index];

    // if column is in the sort state and is ascending, change to descending
    if (order === "asc") {
      sortState.value.orders[index] = "desc";
    } else {
      // if column is in the sort state and is descending, remove it
      sortState.value.columns.splice(index, 1);
      sortState.value.orders.splice(index, 1);
    }
  }
};

const isSortActive = (column) => {
  const index = sortState.value.columns.indexOf(column.getValue);
  return index !== -1;
};

const isSortAscending = (column) => {
  const index = sortState.value.columns.indexOf(column.getValue);
  return sortState.value.orders[index] === "asc";
};
/*
-------------------- Content After being Processed --------------------
*/

const processedContent = computed(() => {
  let data = searchTerm.value
    ? search(searchTerm.value).map((searchItem) => searchItem.item)
    : dataSource;

  // if sort
  if (sortState.value.columns.length > 0) {
    data = orderBy(data, sortState.value.columns, sortState.value.orders);
  }

  return data;
});
/*
-------------------- HANDLE PAGINATION Functionality --------------------
*/

const paginationState = ref({
  currentPage: 1,
  pageSize: 10,
});

const nextPage = () => {
  paginationState.value.currentPage++;
};

const isNextPageBtnDisabled = computed(() => {
  const x = paginationState.value.currentPage * paginationState.value.pageSize;
  const y = processedContent.value.length;

  return x >= y && x - y >= 0;
});

const previousPage = () => {
  paginationState.value.currentPage--;
};

const isPreviousPageDisabled = computed(() => {
  return paginationState.value.currentPage === 1;
});

// Reset pagination when search term changes
watch(searchTerm, () => {
  paginationState.value.currentPage = 1;
});
/*
 *----------------- Content --------------------
 * What to show on the screen after applying search, sort, and pagination
 */

const visibleContent = computed(() => {
  const start =
    (paginationState.value.currentPage - 1) * paginationState.value.pageSize;
  const end = start + paginationState.value.pageSize;

  return processedContent.value.slice(start, end);
});
</script>

<style lang="css" scoped></style>
