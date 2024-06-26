import { ref, computed, watch, unref } from "vue";

function usePagination(
  page,
  itemsPerPage,
  itemsPerPageOptions,
  itemsLength,
  emitCallback
) {
  const internalPage = ref(page);

  const start = computed(() => {
    return (internalPage.value - 1) * itemsPerPage;
  });

  const startFromEntry = computed(() => {
    return start.value + 1;
  });

  const end = computed(() => {
    return start.value + itemsPerPage;
  });

  const endAtEntry = computed(() => {
    return Math.min(end.value, itemsLength);
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
