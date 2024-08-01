<template>
  <header class="pb-4">
    <h1 class="text-3xl mb-4">
      {{ $t("websiteTitle", { ns: "general", lng: "en" }) }}
    </h1>
    <hr />
  </header>
  {{}}
  <v-app-bar :elevation="2">
    <v-app-bar-title> {{ $t("websiteTitle") }}</v-app-bar-title>

    <template v-slot:append>
      <v-btn
        :variant="i18next.language === 'en' ? 'flat' : 'plain'"
        @click="i18next.changeLanguage('en')"
        >EN</v-btn
      >
      <v-btn
        :variant="i18next.language === 'vi-VN' ? 'flat' : 'plain'"
        @click="i18next.changeLanguage('vi-VN')"
        >VI</v-btn
      >
    </template>
  </v-app-bar>
</template>

<script setup>
import { useTranslation } from "i18next-vue";
const { t, i18next } = useTranslation();
</script>

<style scoped></style>
