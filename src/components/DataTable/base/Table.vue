<script setup>
import { defineProps } from "vue";

const { items, columns } = defineProps({
  items: Array,
  columns: Array,
  sortData: Object,
});
</script>

<template>
  <div class="overflow-y-auto">
    <table>
      <thead class="sticky-top">
        <tr>
          <th v-for="column in columns" :key="column.key">
            <slot :name="'header-' + column.key" :value="column.label">
              {{ column.label }}
            </slot>
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
