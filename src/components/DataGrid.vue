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
        <tr>
          <th class="border border-slate-700 p-4"></th>
          <th
            scope="col"
            v-for="label in header"
            :key="label"
            class="border border-slate-700 p-4"
          >
            <button
              class="w-full"
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
              class="w-full"
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
              class="w-full"
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
        <tr v-for="(row, index) in content" :key="Object.values(row).join('-')">
          <td class="border border-slate-700 p-4">{{ index + 1 }}</td>
          <td v-for="column in header" class="border border-slate-700 p-4">
            {{ row[column] }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="border border-slate-700 p-4" :colspan="header.length + 1">
            Footer
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import { ref, onUpdated, unref, toValue, watchEffect } from "vue";
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
</script>

<style lang="css" scoped></style>
