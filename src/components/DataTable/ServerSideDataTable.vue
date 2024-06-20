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

    <table
      class="table-auto w-full text-sm text-left rtl:text-right text-gray-50"
    >
      <thead class="text-xs text-gray-700 bg-gray-50">
        <tr>
          <template v-for="column in columns" :key="column.key">
            <th scope="col" class="px-6 py-3">
              <button
                class="flex justify-center gap-1 items-center"
                v-if="column.sortable"
                @click="handleSort(column.key)"
              >
                <slot :name="'header-' + column.key" :label="column.label">
                  {{ column.label }}
                </slot>
                <slot :name="'sortIcon-' + column.key">
                  <v-icon
                    v-show="
                      isSortActive(column.key) &&
                      getSortDirectionForColumn(column.key) ===
                        SORT_DIRECTION.ASC
                    "
                    size="sm"
                    icon="fa:fas fa-arrow-up"
                  ></v-icon>
                  <v-icon
                    v-if="
                      isSortActive(column.key) &&
                      getSortDirectionForColumn(column.key) ===
                        SORT_DIRECTION.DESC
                    "
                    size="sm"
                    icon="fa:fas fa-arrow-down"
                  ></v-icon>
                </slot>
              </button>
              <div v-else>
                <slot :name="column.key" :label="column.label">
                  {{ column.label }}
                </slot>
              </div>
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
            <slot :name="'body-' + column.key" :value="column.getValue(row)">
              {{ column.getValue(row) }}
            </slot>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr></tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, unref, watch } from "vue";

const emit = defineEmits(["update-sort", "update-pagination"]);

const { items, columns, isLoading } = defineProps({
  items: Array,
  columns: Array,
  isLoading: Boolean,
  onSort: Function,
});

const activeSort = ref({
  columnKey: null,
  direction: null,
});

const SORT_DIRECTION = {
  ASC: "asc",
  DESC: "desc",
};

function handleSort(columnKey) {
  // If the column is not currently sorted or is sorted in DESC, reset to ASC.
  const oldSort = activeSort.value.columnKey;

  if (oldSort !== columnKey) {
    activeSort.value.columnKey = columnKey;
    activeSort.value.direction = SORT_DIRECTION.ASC;
  } else {
    if (activeSort.value.direction === SORT_DIRECTION.ASC) {
      activeSort.value.direction = SORT_DIRECTION.DESC;
    } else {
      activeSort.value.columnKey = null;
      activeSort.value.direction = null;
    }
  }
  emit("update-sort", unref(activeSort.value));
}

function isSortActive(columnKey) {
  return activeSort.value.columnKey === columnKey;
}

function getSortDirectionForColumn(columnKey) {
  return activeSort.value.direction;
}

const page = ref(1);
</script>
