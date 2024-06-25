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
import { defineProps, computed, defineEmits, ref, watch, provide } from "vue";
import usePagination from "./composables/usePagination";
import Table from "./Table.vue";
const baseStyle = {
  table: "table-fixed border-collapse caption-bottom",
  column: {
    header:
      "p-4 border border-slate-200 text-left text-sm font-bold text-gray-700",
    cell: "p-4 text-sm text-gray-700 border border-slate-200",
  },
};

const {
  items,
  columns,
  page,
  itemsPerPage,
  itemsPerPageOptions,
  itemsLength,
  isLoading,
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
});

const emit = defineEmits(["update-page"]);

provide("pagination", {
  page,
  itemsPerPage,
  itemsPerPageOptions,
  itemsLength,
  emitCallback: (page) => {
    emit("update-page", page);
  },
});
</script>
