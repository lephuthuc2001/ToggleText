<template>
  <div>
    <!-- This slot is for Content -->
    <div>
      <slot name="toolBar"></slot>
    </div>
    <v-progress-linear
      v-if="isLoading"
      color="primary"
      indeterminate
      :height="11"
    ></v-progress-linear>

    <table class="w-full text-sm text-left rtl:text-right text-gray-50">
      <thead class="text-xs text-gray-700 bg-gray-50">
        <tr>
          <template v-for="column in columns" :key="column.key">
            <th scope="col" class="px-6 py-3">
              <slot :name="column.key" :label="column.label">
                {{ column.label }}
              </slot>
            </th>
          </template>
        </tr>
      </thead>

      <tbody>
        <tr
          class="bg-white border-b hover:bg-gray-50"
          v-for="row in items"
          :key="row.id"
        >
          <td
            class="px-6 py-4 text-gray-900"
            v-for="column in columns"
            :key="column.key"
          >
            <slot name="body" :value="column.getValue(row)">
              {{ column.getValue(row) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, provide } from "vue";

const { items, columns, isLoading } = defineProps({
  items: Array,
  columns: Array,
  isLoading: Boolean,
});
</script>
