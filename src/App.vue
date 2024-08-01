<template>
  <v-app>
    <Header />
    <Main />
    <Footer />
  </v-app>
</template>

<script setup>
import Main from "./components/Main.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import { i18nextPromise } from "./i18n.js";

await i18nextPromise;
</script>

<style scoped></style>
