<template>
  <v-row>
    <v-col>
      <v-alert
        v-if="errorMessage"
        :text="errorMessage"
        type="error"
        variant="outlined"
        density="compact"
      ></v-alert>
    </v-col>
  </v-row>
  <v-row v-for="(field, idx) in fields" :key="field.key">
    <v-col cols="6">
      <v-text-field
        v-model="field.value.name"
        :label="$t('skill', { ns: 'applicationForm', count: 1 })"
        outlined
      ></v-text-field>
    </v-col>
    <v-col cols="5">
      <v-autocomplete
        v-model="field.value.level"
        :label="$t('level', { ns: 'applicationForm', count: 1 })"
        :items="levelsOptions"
        item-title="title"
        item-value="value"
        outlined
      ></v-autocomplete>
    </v-col>
    <v-col cols="1">
      <v-btn aria-label="Remove" @click="remove(idx)" color="red" size="small">
        <v-icon icon="fa-solid fa-trash" />
      </v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-btn aria-label="Add" @click="push({ name: '', level: 'Beginner' })">
        <v-icon icon="fa-solid fa-plus"
      /></v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { defineModel, computed } from "vue";
import { useTranslation } from "i18next-vue";
const { t } = useTranslation();
const model = defineModel({
  type: Object,
});

const { fields, push, remove } = model.value;

const { errorMessage } = defineProps({
  errorMessage: {
    type: String,
    default: "",
  },
});

const levelsOptions = computed(function () {
  return [
    {
      title: t("beginner", {
        ns: "applicationForm",
      }),
      value: "Beginner",
    },
    {
      title: t("intermediate", {
        ns: "applicationForm",
      }),
      value: "Intermediate",
    },
    {
      title: t("advanced", {
        ns: "applicationForm",
      }),
      value: "Advanced",
    },
  ];
});
</script>

<style lang="scss" scoped></style>
