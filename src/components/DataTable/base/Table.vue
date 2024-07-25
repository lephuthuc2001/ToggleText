<script setup>
const { items, columns, sortState } = defineProps({
  items: Array,
  columns: Array,
  sortState: Object,
});
</script>

<template>
  <div class="overflow-y-auto">
    <table
      class="min-w-full leading-normal shadow-lg rounded-lg overflow-hidden"
    >
      <thead class="bg-gray-900 text-white">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-4 border-b-2 border-gray-300 text-left text-sm uppercase tracking-wider"
          >
            <template v-if="!column.sortable || sortState === undefined">
              <slot :name="'header-' + column.key" :value="column.label">
                {{ column.label }}
              </slot>
            </template>
            <template v-else-if="column.sortable && sortState !== undefined">
              <button
                @click="sortState.handleSort(column.key)"
                class="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <slot
                  :name="'header-' + column.key"
                  :value="column.label"
                  :sortState="{
                    isSortActive: sortState.isSortActive(column.key),
                    sortOrder: sortState.getSortOrder(column.key),
                  }"
                >
                  <span class="font-semibold"> {{ column.label }} </span>
                  <span
                    v-if="sortState.getSortOrder(column.key) === 'asc'"
                    class="text-green-400"
                    >↑</span
                  >
                  <span
                    v-else-if="sortState.getSortOrder(column.key) === 'desc'"
                    class="text-red-400"
                    >↓</span
                  >
                  <span v-else class="text-gray-400">↕</span>
                </slot>
              </button>
            </template>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <template v-if="items.length > 0">
          <tr
            v-for="item in items"
            :key="item.id"
            class="transition duration-150 ease-in-out hover:bg-gray-50"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-3 text-sm"
            >
              <slot :name="'body-' + column.key" :value="column.getValue(item)">
                {{ column.getValue(item) }}
              </slot>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td
              :colspan="columns.length"
              class="px-6 py-4 text-center text-sm text-gray-500"
            >
              No data available
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
