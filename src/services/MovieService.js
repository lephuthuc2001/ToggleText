import qs from "qs";
import { orderBy } from "lodash";
const MOVIE_ACCESS_TOKEN = import.meta.env.VITE_MOVIE_ACCESS_TOKEN;
const MOVIE_API_URL = import.meta.env.VITE_MOVIE_API_URL;

const baseQueryParams = {
  include_adult: false,
  language: "en-US",
  page: 1,
  region: "US",
};

async function searchMovies(queryParams = {}) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MOVIE_ACCESS_TOKEN}`,
    },
  };

  const params = qs.stringify({ ...baseQueryParams, ...queryParams });

  const response = await fetch(MOVIE_API_URL + params, options);

  let sort_by = null;

  if (queryParams.sort_by) {
    sort_by = queryParams.sort_by.split(".");
  }

  const data = await response.json();

  if (sort_by) {
    data["results"] = orderBy(data["results"], [sort_by[0]], [sort_by[1]]);
  }

  return data;
}

async function discoverMovies(queryParams = {}) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MOVIE_ACCESS_TOKEN}`,
    },
  };
}

export default {
  searchMovies,
};
