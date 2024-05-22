<template>
  <main class="flex flex-col gap-4">
    <section>
      <h2 class="mb-4 text-xl">Toggle Text component</h2>
      <ToggleText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
        obcaecati quis quae. Quaerat saepe, reiciendis ut rerum corrupti
        distinctio amet cupiditate ratione voluptatem est asperiores sint vero
        eius, maxime iste?
      </ToggleText>
    </section>

    <hr />
    <ComposableExample />
    <hr />
    <h2 class="text-xl">Test SLOTS</h2>
    <section class="flex gap-4 flex-wrap">
      <Banner />
      <Banner>
        <template #header>
          <h2 class="text-2xl">Welcome to Our Summer Sale!</h2>
        </template>
        <template #content>
          <p>Enjoy up to 50% off on all items.</p>
        </template>
        <template #footer>
          <button
            class="mx-auto w-fit border border-gray-300 rounded-md px-2 py-1 bg-orange-600 text-white"
          >
            Learn more
          </button>
        </template>
      </Banner>
      <Banner>
        <template #header>
          <h2 class="text-2xl">Welcome to Our Summer Sale!</h2>
        </template>
        <template #content="{ discount }">
          <p>
            Enjoy up to
            <strong class="text-orange-600">{{ discount }}%</strong> off on all
            items.
          </p>
        </template>
      </Banner>
      <Banner>
        <template #header>
          <h2 class="text-2xl">Welcome to Our Summer Sale!</h2>
        </template>

        <template #content="{ discount }" :discount="discount">
          <strong class="text-orange-600">{{ discount }}%</strong> off is NICE
        </template>
      </Banner>
    </section>
    <hr />
    <AnimationTechniquesExample />
  </main>
</template>

<script setup>
import ToggleText from "./ToggleText.vue";
import ComposableExample from "./ComposableExample.vue";
import Banner from "./Banner.vue";
import AnimationTechniquesExample from "./AnimationTechniquesExample.vue";

import { ref, computed } from "vue";

const discountPercent = 50;
const discount = computed(() => `-${discountPercent}%`);
</script>

<style scoped></style>
