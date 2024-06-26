<script setup>
import { inject } from "vue";
import usePagination from "../composables/usePagination";

const emit = defineEmits(["update-page"]);

const { page, itemsPerPage, itemsPerPageOptions, itemsLength, emitCallback } =
  inject("pagination");

const {
  startFromEntry,
  endAtEntry,
  isPrevDisabled,
  isNextDisabled,
  prevPage,
  nextPage,
} = usePagination(
  page,
  itemsPerPage,
  itemsPerPageOptions,
  itemsLength,
  emitCallback
);
</script>

<template>
  <slot
    :startFromEntry="startFromEntry"
    :endAtEntry="endAtEntry"
    :isPrevDisabled="isPrevDisabled"
    :isNextDisabled="isNextDisabled"
    :prevPage="prevPage"
    :nextPage="nextPage"
  >
    <v-select
      v-if="itemsPerPageOptions.length > 0"
      class="w-32"
      label="Select"
      :itemsPerPageOptions="itemsPerPageOptions"
    ></v-select>
    <div class="flex flex-row items-center justify-center gap-2">
      <div>
        <span class="text-sm text-gray-700">
          Showing
          <span class="font-semibold text-gray-900">
            {{ startFromEntry }}
          </span>
          to
          <span class="font-semibold text-gray-900">
            {{ endAtEntry }}
          </span>
          of
          <span class="font-semibold text-gray-900">
            {{ itemsLength }}
          </span>
          Entries
        </span>
      </div>
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
  </slot>
</template>
