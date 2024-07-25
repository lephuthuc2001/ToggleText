<template>
  <div>
    <slot name="toolBar" :updateQuery="updateQuery"></slot>
    <v-progress-linear
      v-if="isLoading"
      class="mb-4"
      color="primary"
      indeterminate
    ></v-progress-linear>

    <slot name="table" :items="items" :columns="columns" :sortState="sortState">
      <Table :items="items" :columns="columns" :sortState="sortState" />
    </slot>

    <slot
      name="pagination"
      :totalItems="totalItems"
      :itemsPerPage="itemsPerPage"
      :internalPage="internalPage"
    >
      <Pagination v-if="items.length > 0" @update-page="updatePage" />
    </slot>
  </div>
</template>

<script setup>
import { provide, ref, watch } from "vue";
import Pagination from "./components/Pagination.vue";
import Table from "./base/Table.vue";
import useSort from "./composables/useSort";

const { columns, callQuery } = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  callQuery: {
    type: Function,
    required: true,
  },
});

const queryUpdatedAt = ref(0);
const internalPage = ref(1);
const totalItems = ref(0);
const items = ref([]);
const isLoading = ref(false);
const itemsPerPage = 20;

const sortableColumns = columns.filter((column) => column.sortable);
const sortState = useSort(sortableColumns);

function updateQuery() {
  queryUpdatedAt.value = Date.now();
}

function updatePage(newPage) {
  internalPage.value = newPage;
}

async function fetchData() {
  isLoading.value = true;
  try {
    const result = await callQuery(internalPage.value, sortState.sortState);
    items.value = result.items;
    totalItems.value = result.totalItems;
    itemsPerPage.value = result.itemsPerPage;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
}

watch([internalPage, sortState.sortState, queryUpdatedAt], fetchData, {
  immediate: true,
  deep: true,
});

watch(queryUpdatedAt, () => {
  internalPage.value = 1;
});

provide("paginationData", { internalPage, totalItems, itemsPerPage });
</script>
