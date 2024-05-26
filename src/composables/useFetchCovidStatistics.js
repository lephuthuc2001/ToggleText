import { ref } from "vue";

export default function useFetchCovidStatistics() {
  const data = ref(null);
  const error = ref(null);
  const isLoading = ref(false);

  async function fetchCovidData() {
    const url = "https://covid-193.p.rapidapi.com/statistics";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "75e97ec3acmshc14320dbf38257dp1fe523jsne19d5579fb86",
        "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
      },
    };

    try {
      data.value = null;
      error.value = null;
      isLoading.value = true;

      const response = await fetch(url, options);
      const result = await response.json();

      data.value = result.response;
    } catch (error) {
      error.value = error;
    } finally {
      isLoading.value = false;
    }
  }

  fetchCovidData();

  return { data, error, isLoading };
}
