<template>
  <div class="overflow-auto">
    <div class="flex gap-2 justify-end items-baseline mb-4">
      <form @submit.prevent>
        <input
          id="search"
          name="search"
          type="text"
          class="border border-slate-600 p-2 rounded"
          placeholder="Search..."
          :value="searchTerm"
          @input="debouncedHandleSearchTerm"
        />
      </form>
    </div>
    <table
      role="grid"
      class="border-collapse border-spacing-4 border border-black w-full"
    >
      <caption v-if="caption" class="caption-bottom">
        {{
          caption
        }}
      </caption>
      <thead>
        <tr class="hover:bg-slate-200">
          <th class="border border-slate-700 px-4 h-12"></th>
          <th
            scope="col"
            v-for="label in header"
            :key="label"
            class="border border-slate-700 px-4 h-12"
          >
            <button
              class="w-full text-left text-slate-600 font-medium"
              v-if="!find(sortCondition, { column: label })"
              @click="
                (event) => {
                  sortCondition.push({
                    column: label,
                    order: 'asc',
                  });
                }
              "
            >
              {{ label }}
            </button>

            <button
              v-if="find(sortCondition, { column: label, order: 'asc' })"
              class="w-full text-left"
              @click="
                (event) => {
                  const index = sortCondition.findIndex(
                    (condition) =>
                      condition.column === label && condition.order === 'asc'
                  );
                  sortCondition[index].order = 'desc';
                }
              "
            >
              {{ label }} asc
            </button>

            <button
              v-if="find(sortCondition, { column: label, order: 'desc' })"
              class="w-full text-left"
              @click="
                (event) => {
                  sortCondition = sortCondition.filter(
                    (condition) => condition.column !== label
                  );
                }
              "
            >
              {{ label }} desc
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="hover:bg-slate-200"
          v-for="(row, index) in visibleContent"
          :key="Object.values(row).join('-')"
        >
          <td class="border border-slate-700 p-4">{{ index + 1 }}</td>
          <td v-for="column in header" class="border border-slate-700 p-4">
            {{ row[column] }}
          </td>
        </tr>
      </tbody>
      <tfoot v-if="content.length > paginationState.pageSize">
        <tr>
          <td class="border border-slate-700 p-4" :colspan="header.length + 1">
            <div class="flex gap-2">
              <span class="flex-grow"
                >Page {{ paginationState.pageIndex + 1 }}</span
              >
              <div class="flex gap-2">
                <button
                  :disabled="paginationState.pageIndex === 0"
                  class="rounded border border-black py-1 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  @click="previousPage"
                >
                  Previous
                </button>
                <button
                  :disabled="
                    content.length <
                    paginationState.pageSize * (paginationState.pageIndex + 1)
                  "
                  class="rounded border border-black py-1 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  @click="nextPage"
                >
                  Next
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import {
  ref,
  onUpdated,
  unref,
  toValue,
  watchEffect,
  watch,
  computed,
} from "vue";
import useSearch from "../composables/useSearch";
import debounce from "lodash/debounce";
import find from "lodash/find";
import orderBy from "lodash/orderBy";

const { dataSource, caption } = defineProps({
  dataSource: {
    required: true,
    type: Array,
  },
  caption: {
    type: String,
  },
});

const header = Object.keys(dataSource[0]);
const content = ref(JSON.parse(JSON.stringify(dataSource)));

// Handle Search
const { search } = useSearch(dataSource, header);
const searchTerm = ref("");

// Refactored search term change handler
function handleSearchTermChange(event) {
  searchTerm.value = event.target.value;

  // Reset pagination
  paginationState.value.pageIndex = 0;
}

const debouncedHandleSearchTerm = debounce(handleSearchTermChange, 200);

// Handle Sort
const sortCondition = ref([]);

function sortData(data) {
  if (sortCondition.value.length === 0) {
    return data;
  }

  return orderBy(
    data,
    sortCondition.value.map((condition) => condition.column),
    sortCondition.value.map((condition) => condition.order)
  );
}

watchEffect(function () {
  const data = searchTerm.value
    ? search(searchTerm.value).map((item) => item.item)
    : dataSource;

  content.value = sortData(data);
});

// Pagination
// Page Size
// Page Index (state)

const paginationState = ref({
  pageSize: 10,
  pageIndex: 0,
});

// Next page

function nextPage() {
  paginationState.value.pageIndex++;
}

// Previous page

function previousPage() {
  paginationState.value.pageIndex--;
}

const visibleContent = computed(() => {
  return content.value.slice(
    paginationState.value.pageIndex * paginationState.value.pageSize,
    (paginationState.value.pageIndex + 1) * paginationState.value.pageSize
  );
});

// Last Page
// First page
// Last page

// How many rows to show per page
</script>

<style lang="css" scoped></style>
