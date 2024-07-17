import { ref, computed, toValue } from "vue";

function usePagination(page = 1, itemsPerPage = 10, totalItems) {
  const internalPage = ref(toValue(page));

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
    return Math.min(end.value, totalItems.value);
  });

  const isPrevDisabled = computed(() => {
    return internalPage.value === 1;
  });

  const isNextDisabled = computed(() => {
    return end.value >= totalItems.value;
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
    currentPage: internalPage,
  };
}

export default usePagination;
