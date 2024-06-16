<template>
  <main>
    <!-- {{ isLoading ? "..." : movies }} -->
  </main>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";
import MovieService from "../services/MovieService";

// const { data: movies, isLoading } = useQuery({
//   queryKey: ["movies"],
//   queryFn: MovieService.getMovies,
// });

// console.log(movies);
</script>

<style scoped></style>
