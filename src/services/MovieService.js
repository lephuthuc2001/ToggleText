import qs from "qs";

const MOVIE_ACCESS_TOKEN = import.meta.env.VITE_MOVIE_ACCESS_TOKEN;
const MOVIE_API_URL = import.meta.env.VITE_MOVIE_API_URL;

const baseQueryParams = {
  query: "",
  include_adult: false,
  language: "en-US",
  page: 1,
  region: "US",
  // year: "",
  // primary_release_year: "",
};

async function getMovies(queryParams = {}) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MOVIE_ACCESS_TOKEN}`,
    },
  };

  const params = qs.stringify({ ...baseQueryParams, ...queryParams });

  const response = await fetch(MOVIE_API_URL + params, options);

  const data = await response.json();

  return data;
}

export default {
  getMovies,
};
