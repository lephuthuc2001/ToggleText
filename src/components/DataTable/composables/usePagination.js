import { ref, computed, watch, unref } from "vue";

function usePagination(
  page,
  itemsPerPage,
  itemsPerPageOptions,
  itemsLength,
  searchQuery,
  emitCallback
) {
  const internalPage = ref(unref(page));

  const start = computed(() => {
    return (internalPage.value - 1) * itemsPerPage.value;
  });

  const startFromEntry = computed(() => {
    return start.value + 1;
  });

  const end = computed(() => {
    return start.value + itemsPerPage.value;
  });

  const endAtEntry = computed(() => {
    return Math.min(end.value, itemsLength.value);
  });

  const isPrevDisabled = computed(() => {
    return internalPage.value === 1;
  });

  const isNextDisabled = computed(() => {
    return end.value >= itemsLength;
  });

  watch(internalPage, (newPage) => {
    emitCallback(newPage);
  });

  watch(searchQuery, (newSearchQuery) => {
    internalPage.value = 1;
  });

  function nextPage() {
    if (!isNextDisabled.value) {
      internalPage.value++;
    }
  }

  function prevPage() {
    if (!isPrevDisabled.value) {
      internalPage.value = Math.max(internalPage.value - 1, 1);
    }
  }

  return {
    startFromEntry,
    endAtEntry,
    nextPage,
    prevPage,
    isPrevDisabled,
    isNextDisabled,
  };
}

export default usePagination;
