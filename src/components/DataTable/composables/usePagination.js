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

  const end = computed(() => {
    return start.value + itemsPerPage;
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
    start: start,
    end: end,
    nextPage,
    prevPage,
    isPrevDisabled: isPrevDisabled,
    isNextDisabled: isNextDisabled,
  };
}

export default usePagination;
