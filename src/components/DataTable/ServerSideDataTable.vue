<template>
  <div>
    <slot name="toolBar"></slot>
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
      <Pagination @update-page="updatePage" />
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

const internalPage = ref(1);
const updatePage = (newPage) => {
  internalPage.value = newPage;
};

const sortableColumns = columns.filter((column) => column.sortable);
const sortState = useSort(sortableColumns);

const { items, totalItems, itemsPerPage, isLoading } = callQuery(
  internalPage,
  "love",
  sortState.sortState
);

provide("paginationData", { internalPage, totalItems, itemsPerPage });
</script>
