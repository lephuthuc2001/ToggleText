<script setup>
import { defineProps } from "vue";

const { items, columns, sortState } = defineProps({
  items: Array,
  columns: Array,
  sortState: Object,
});
</script>

<template>
  <div class="overflow-y-auto">
    <table>
      <thead class="sticky-top">
        <tr>
          <th v-for="column in columns" :key="column.key">
            <template v-if="!column.sortable || sortState === undefined">
              <slot :name="'header-' + column.key" :value="column.label">
                {{ column.label }}
              </slot>
            </template>
            <template v-else-if="column.sortable && sortState !== undefined">
              <button @click="sortState.handleSort(column.key)">
                <slot
                  :name="'header-' + column.key"
                  :value="column.label"
                  :sortState="{
                    isSortActive: sortState.isSortActive(column.key),
                    sortOrder: sortState.getSortOrder(column.key),
                  }"
                >
                  <span> {{ column.label }} </span>

                  <span v-if="sortState.getSortOrder(column.key) === 'asc'"
                    >↑</span
                  >
                  <span
                    v-else-if="sortState.getSortOrder(column.key) === 'desc'"
                    >↓
                  </span>
                  <span v-else>↕</span>
                </slot>
              </button>
            </template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td v-for="column in columns" :key="column.key">
            <slot :name="'body-' + column.key" :value="column.getValue(item)">
              {{ column.getValue(item) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
