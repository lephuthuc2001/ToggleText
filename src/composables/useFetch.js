import { ref, toValue, watch } from "vue";

function useFetch(url) {
  const data = ref(null);
  const error = ref(null);

  async function fetchData() {
    // Reset data and error to null before fetching new data
    data.value = null;
    error.value = null;

    try {
      const response = await fetch(toValue(url));
      const responseData = await response.json();

      data.value = responseData;
    } catch (error) {
      error.value = error;
    }
  }

  watch(url, fetchData, { immediate: true });

  return { data, error };
}

export default useFetch;
