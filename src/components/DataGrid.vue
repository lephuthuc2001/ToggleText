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
            v-for="item in header"
            :key="item"
            class="border border-slate-700 p-4"
          >
            {{ item }}
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
import { ref, onUpdated, unref, toValue } from "vue";
import useSearch from "../composables/useSearch";
import debounce from "lodash/debounce";

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

const { search } = useSearch(dataSource, header);

const searchTerm = ref("");

function handleSearchTermChange(event) {
  searchTerm.value = event.target.value;

  if (!event.target.value) {
    content.value = dataSource;
    return;
  } else {
    content.value = search(event.target.value).map((item) => {
      return item.item;
    });
  }
}

const debouncedHandleSearchTerm = debounce(handleSearchTermChange, 200);
</script>

<style lang="css" scoped></style>
