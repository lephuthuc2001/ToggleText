<script setup>
import { defineProps, defineModel, watch, defineEmits } from "vue";
import usePagination from "../composables/usePagination";

const { page, itemsPerPage } = defineProps({
  page: Number,
  itemsPerPage: Number,
});

const totalItems = defineModel("totalItems");

const emit = defineEmits(["update-page"]);

const {
  startFromEntry,
  endAtEntry,
  isPrevDisabled,
  isNextDisabled,
  prevPage,
  nextPage,
  currentPage,
} = usePagination(page, itemsPerPage, totalItems);

watch(currentPage, (newPage) => {
  emit("update-page", newPage);
});
</script>

<template>
  <slot
    :startFromEntry="startFromEntry"
    :endAtEntry="endAtEntry"
    :isPrevDisabled="isPrevDisabled"
    :isNextDisabled="isNextDisabled"
    :prevPage="prevPage"
    :nextPage="nextPage"
    :totalItems="totalItems"
  >
    <div class="flex flex-col items-center">
      <!-- Help text -->
      <span class="text-sm text-gray-70">
        Showing
        <span class="font-semibold text-gray-900">{{ startFromEntry }}</span> to
        <span class="font-semibold text-gray-900">{{ endAtEntry }}</span> of
        <span class="font-semibold text-gray-900">{{ totalItems }}</span>
        Entries
      </span>
      <div class="inline-flex mt-2 xs:mt-0">
        <!-- Buttons -->
        <button
          @click="prevPage"
          :disabled="isPrevDisabled"
          class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900"
        >
          <svg
            class="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Prev
        </button>
        <button
          @click="nextPage"
          :disabled="isNextDisabled"
          class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900"
        >
          Next
          <svg
            class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  </slot>
</template>
