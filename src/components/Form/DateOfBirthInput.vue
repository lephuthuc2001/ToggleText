<template>
  <v-row>
    <v-col>
      <v-autocomplete
        v-model="model.day"
        :label="$t('day', { ns: 'applicationForm' })"
        :items="dayRange"
        name="day"
      ></v-autocomplete
    ></v-col>
    <v-col>
      <v-autocomplete
        v-model="model.month"
        :label="$t('month', { ns: 'applicationForm' })"
        :items="monthRange"
        name="month"
      ></v-autocomplete>
    </v-col>
    <v-col>
      <v-autocomplete
        v-model="model.year"
        :label="$t('year', { ns: 'applicationForm' })"
        name="year"
        :items="yearRange"
      ></v-autocomplete>
    </v-col>
  </v-row>
</template>

<script setup>
import { defineProps, defineModel } from "vue";
import { getDateRangeForDateOfBirthInput } from "../../utils/utils";
const { errorMessage } = defineProps({
  errorMessage: {
    type: String,
  },
});

const { dayRange, monthRange, yearRange } = getDateRangeForDateOfBirthInput();

const model = defineModel({
  type: Object,
  required: true,
});
</script>

<style lang="scss" scoped></style>
