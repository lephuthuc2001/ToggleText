<template>
  <div>
    <v-progress-linear
      v-if="isLoading"
      class="mb-4"
      color="primary"
      indeterminate
    ></v-progress-linear>
    <Table :items="items" :columns="columns">
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}" />
      </template>
    </Table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, provide } from "vue";
import Table from "./base/Table.vue";

const {
  items,
  columns,
  page,
  itemsPerPage,
  itemsPerPageOptions,
  itemsLength,
  isLoading,
  isMultiSort,
} = defineProps({
  items: Array,
  columns: Array,
  page: {
    type: Number,
    default: 1,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
  itemsPerPageOptions: {
    type: Array,
    default: [5, 10, 20, 50],
  },
  itemsLength: {
    type: Number,
    default: undefined,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isMultiSort: {
    type: Boolean,
    default: false,
  },
  searchQuery: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update-page", "update-sort", "update-search"]);

provide("pagination", {
  page,
  itemsPerPage,
  itemsPerPageOptions,
  itemsLength,
  emitCallback: (page) => {
    emit("update-page", page);
  },
});

provide("sort", {
  sortableColumns: columns.filter((col) => col.sortable).map((col) => col.key),
  isMultiSort,
  emitCallback: (sortState) => {
    emit("update-sort", sortState);
  },
});
</script>
