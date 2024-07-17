import { ref } from "vue";

function useSort(sortableColumns, isMultiSort = false) {
  const initialSortState = isMultiSort ? [] : { key: null, order: null };
  const sortState = ref(initialSortState);

  const isSortActive = (column) => {
    if (isMultiSort) {
      return sortState.value.some((sort) => sort.key === column);
    }
    return sortState.value.key === column;
  };

  const getSortOrder = (column) => {
    if (!isSortActive(column)) return null;

    if (isMultiSort) {
      const sort = sortState.value.find((sort) => sort.key === column);
      return sort ? sort.order : null;
    }
    return sortState.value.order;
  };

  const isInSortableColumns = (column) =>
    sortableColumns.find((col) => col.key === column);

  const handleSort = (column) => {
    if (!isInSortableColumns(column)) return;

    if (!isSortActive(column)) {
      sortState.value = isMultiSort
        ? [...sortState.value, { key: column, order: "asc" }]
        : { key: column, order: "asc" };
    } else {
      if (isMultiSort) {
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

  return {
    isSortActive,
    getSortOrder,
    handleSort,
    sortState,
  };
}

export default useSort;
