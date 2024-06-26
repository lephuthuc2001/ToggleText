<script setup>
import { defineProps, inject } from "vue";
import Pagination from "../components/Pagination.vue";
import useSort from "../composables/useSort";

const { items, columns } = defineProps({
  items: Array,
  columns: Array,
});

const baseStyle = {
  table: "table-fixed border-collapse caption-bottom h-96",
  column: {
    header:
      "p-4 border border-slate-200 text-left text-sm font-bold text-gray-700",
    cell: "p-4 text-sm text-gray-700 border border-slate-200",
  },
};

const { sortableColumns, isMultiSort, emitCallback } = inject("sort");

const { handleSort, getSortIcon, getSortOrder } = useSort(
  sortableColumns,
  isMultiSort,
  emitCallback
);
</script>

<template>
  <div class="max-h-[500px] overflow-y-auto">
    <table :class="baseStyle.table">
      <thead class="sticky-top">
        <tr>
          <th
            :class="baseStyle.column.header"
            v-for="column in columns"
            :key="column.key"
          >
            <button @click="handleSort(column.key)" v-if="column.sortable">
              <slot :name="'header-' + column.key" :value="column.label">
                {{ column.label }}
              </slot>

              <slot
                v-if="column.sortable"
                :name="'sort-' + column.key"
                :sortOrder="getSortOrder(column.key)"
              >
                {{ getSortIcon(column.key) }}
              </slot>
            </button>
            <slot
              v-if="!column.sortable"
              :name="'header-' + column.key"
              :value="column.label"
            >
              {{ column.label }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td
            :class="baseStyle.column.cell"
            v-for="column in columns"
            :key="column.key"
          >
            <slot :name="'body-' + column.key" :value="column.getValue(item)">
              {{ column.getValue(item) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="mt-4">
    <Pagination>
      <template #default="paginationProps">
        <slot name="pagination" v-bind="paginationProps" />
      </template>
    </Pagination>
  </div>
</template>
