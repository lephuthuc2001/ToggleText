<template>
  <div>
    <slot name="toolBar"></slot>
    <v-progress-linear
      v-if="isLoading"
      class="mb-4"
      color="primary"
      indeterminate
    ></v-progress-linear>
    <slot
      name="table"
      :items="items"
      :columns="columns"
      :sortState="{ isSortActive, handleSort, getSortOrder }"
    ></slot>

    <Pagination
      :page="props.page"
      :searchQuery="props.searchQuery"
      v-model:totalItems="totalItems"
      :itemsPerPage="props.itemsPerPage"
      @update-page="
        (newPage) => {
          $emit('update-page', newPage);
        }
      "
    >
      <template #default="paginationData">
        <slot name="pagination" v-bind="paginationData"></slot>
      </template>
    </Pagination>
  </div>
</template>

<script setup>
import {
  defineProps,
  defineModel,
  defineEmits,
  watch,
  computed,
  provide,
} from "vue";
import Pagination from "./components/Pagination.vue";
import useSort from "./composables/useSort.js";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  isLoading: Boolean,
  page: {
    type: Number,
    default: 1,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
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

const totalItems = defineModel("totalItems", {
  type: Number,
});

const emit = defineEmits(["update-page", "update-sort", "update-search"]);

const { isSortActive, handleSort, getSortOrder, sortState } = useSort(
  props.columns.filter((column) => column.sortable),
  props.isMultiSort
);

const internalSearchQuery = computed(() => props.searchQuery);

provide("searchQuery", internalSearchQuery);

watch(
  sortState,
  (newSortState) => {
    emit("update-sort", newSortState);
  },
  {
    deep: true,
  }
);
</script>
