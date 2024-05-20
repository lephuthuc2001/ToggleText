<script setup>
import useFetch from "../composables/useFetch";
import { ref, computed, onUpdated } from "vue";

const name = ref("");

const { data, error } = useFetch(
  () => `https://api.agify.io?name=${name.value}`
);

function handleSubmit(event) {
  const formData = new FormData(event.target);

  name.value = formData.get("name");
}
</script>

<template>
  <div>
    <h2 class="mb-4 text-xl">useFetch Example</h2>
    <form v-on:submit.prevent="handleSubmit">
      <label for="name" class="block mb-2">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight"
      />
    </form>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div v-else-if="data" class="mt-4">
      <p>{{ data }}</p>
    </div>
    <div v-else class="mt-4">
      <p>Loading...</p>
    </div>
  </div>
</template>

<style scoped></style>
