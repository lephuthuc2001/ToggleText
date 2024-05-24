<template>
  <section class="flex gap-4 flex-wrap">
    <fieldset class="basis-1/5 border border-black border-2 p-3">
      <div>
        {{ checkedFrameworks }}
      </div>
      <legend>Choose your JS Framework</legend>
      <div class="flex gap-2">
        <input
          type="checkbox"
          id="react"
          name="interest"
          value="react"
          v-model="checkedFrameworks"
        />
        <label for="react">React</label>
      </div>
      <div class="flex gap-2">
        <input
          type="checkbox"
          id="vue"
          name="framework"
          value="vue"
          v-model="checkedFrameworks"
        />
        <label for="vue">Vue</label>
      </div>
      <div class="flex gap-2">
        <input
          type="checkbox"
          id="solid"
          name="framework"
          value="solid"
          v-model="checkedFrameworks"
        />
        <label for="solid">Solid</label>
      </div>
    </fieldset>
    <fieldset class="basis-1/5 border border-black border-2 p-3">
      <div class="mb-2">{{ selectedPet }}</div>
      <legend>Choose your Pets</legend>
      <select name="pets" id="pet-select" v-model="selectedPet">
        <option value="">--Please choose an option--</option>
        <option v-for="pet in petOptions" :value="pet.value">
          {{ pet.label }}
        </option>
      </select>
    </fieldset>
    <fieldset class="basis-1/5 border border-black border-2 p-3">
      <div class="mb-2">{{ selectedPets }}</div>
      <legend>Choose your Pets</legend>
      <select
        name="pets"
        id="pet-select-multiple"
        multiple
        v-model="selectedPets"
      >
        <option value="">--Please choose an option--</option>
        <option v-for="pet in petOptions" :value="pet.value">
          {{ pet.label }}
        </option>
      </select>
    </fieldset>
    <fieldset class="basis-1/5 border border-black border-2 p-3">
      <div>{{ mostFavoriteGame }}</div>
      <legend>Choose your most favorite game</legend>
      <div class="flex gap-2">
        <input type="radio" id="lol" value="lol" v-model="mostFavoriteGame" />
        <label for="lol">League of Legends</label>
      </div>
      <div class="flex gap-2">
        <input type="radio" id="dota" value="dota" v-model="mostFavoriteGame" />
        <label for="dota">Dota</label>
      </div>

      <div class="flex gap-2">
        <input type="radio" id="pes" value="pes" v-model="mostFavoriteGame" />
        <label for="pes">Pes</label>
      </div>
    </fieldset>
  </section>
</template>

<script setup>
import { ref } from "vue";

const checkedFrameworks = ref(new Set([]));

const petOptions = ref([
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "hamster", label: "Hamster" },
  { value: "parrot", label: "Parrot" },
  { value: "spider", label: "Spider" },
  { value: "goldfish", label: "Goldfish" },
]);

const selectedPet = ref("");

const selectedPets = ref(new Set([]));

const mostFavoriteGame = ref("");
</script>

<style lang="scss" scoped></style>
