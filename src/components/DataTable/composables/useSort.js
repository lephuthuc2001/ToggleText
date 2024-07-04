import { ref, watch } from "vue";

function useSort(sortableColumns, isMultiSort, emitCallback) {
  const initialSortState = isMultiSort ? [] : { key: null, order: null };
  const sortState = ref(initialSortState);

  const isSortActive = (column) => {
    if (isMultiSort.value) {
      return sortState.value.some((sort) => sort.key === column);
    }
    return sortState.value.key === column;
  };

  const getSortOrder = (column) => {
    if (!isSortActive(column)) return null;

    if (isMultiSort.value) {
      const sort = sortState.value.find((sort) => sort.key === column);
      return sort ? sort.order : null;
    }
    return sortState.value.order;
  };

  const getSortIcon = (column) => {
    const sortOrder = getSortOrder(column);
    return sortOrder === "asc" ? "🔼" : sortOrder === "desc" ? "🔽" : "🔃";
  };

  const isInSortableColumns = (column) => sortableColumns.includes(column);

  const handleSort = (column) => {
    if (!isInSortableColumns(column)) return;

    if (!isSortActive(column)) {
      sortState.value = isMultiSort.value
        ? [...sortState.value, { key: column, order: "asc" }]
        : { key: column, order: "asc" };
    } else {
      if (isMultiSort.value) {
        const sortIndex = sortState.value.findIndex(
          (sort) => sort.key === column
        );
        const currentSort = sortState.value[sortIndex];

        currentSort.order === "asc"
          ? (sortState.value[sortIndex].order = "desc")
          : sortState.value.splice(sortIndex, 1);
      } else {
        sortState.value.order === "asc"
          ? (sortState.value.order = "desc")
          : (sortState.value = initialSortState);
      }
    }
  };

  watch(sortState, (newSortState) => emitCallback(newSortState), {
    deep: true,
  });

  return {
    isSortActive,
    handleSort,
    getSortIcon,
    getSortOrder,
  };
}

export default useSort;