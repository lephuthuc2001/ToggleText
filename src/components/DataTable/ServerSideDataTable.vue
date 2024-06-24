<template>
  <div>
    <v-progress-linear
      v-if="isLoading"
      class="mb-4"
      color="primary"
      indeterminate
    ></v-progress-linear>
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td v-for="column in columns" :key="column.key">
            {{ column.getValue(item) }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td :colspan="columns.length">
            <v-select
              v-if="itemsPerPageOptions.length > 0"
              class="w-32"
              label="Select"
              :itemsPerPageOptions="itemsPerPageOptions"
            ></v-select>
            <div class="flex flex-row items-center justify-center gap-2">
              <!-- Help text -->
              <div>
                <span class="text-sm text-gray-700">
                  Showing
                  <span class="font-semibold text-gray-900">
                    {{ start + 1 }}
                  </span>
                  to
                  <span class="font-semibold text-gray-900">
                    {{ end > itemsLength ? itemsLength : end }}
                  </span>
                  of
                  <span class="font-semibold text-gray-900">
                    {{ itemsLength }}
                  </span>
                  Entries
                </span>
              </div>
              <!-- Buttons -->
              <div class="inline-flex">
                <button
                  @click="prevPage"
                  :disabled="isPrevDisabled"
                  class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900"
                >
                  Prev
                </button>
                <button
                  @click="nextPage"
                  :disabled="isNextDisabled"
                  class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900"
                >
                  Next
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import { defineProps, computed, defineEmits, ref, watch } from "vue";

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

const internalPage = ref(page);

const start = computed(() => {
  return (internalPage.value - 1) * itemsPerPage;
});

const end = computed(() => {
  return start.value + itemsPerPage;
});

const nextPage = computed(() => {
  internalPage.value++;

  emit("update-page", internalPage.value);
});

const prevPage = computed(() => {
  internalPage.value = Math.max(internalPage.value - 1, 1);

  emit("update-page", internalPage.value);
});

const isPrevDisabled = computed(() => {
  return page === 1;
});

const isNextDisabled = computed(() => {
  return end.value >= itemsLength;
});

watch(internalPage, (newPage) => {
  console.log("Page changed to", newPage);
});
</script>
