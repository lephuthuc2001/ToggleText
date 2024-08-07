<template>
  <v-row v-if="errorMessage">
    <v-col>
      <ErrorMessage :errorMessage="errorMessage" />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <BaseSelectInput
        :label="$t('day', { ns: 'applicationForm' })"
        :items="dayRange"
        name="day"
        :formPath="dayInputFormPath"
      ></BaseSelectInput
    ></v-col>

    <v-col>
      <BaseSelectInput
        :label="$t('month', { ns: 'applicationForm' })"
        :items="monthRange"
        name="month"
        :formPath="monthInputFormPath"
      ></BaseSelectInput>
    </v-col>
    <v-col>
      <BaseSelectInput
        :label="$t('year', { ns: 'applicationForm' })"
        name="year"
        :items="yearRange"
        :formPath="yearInputFormPath"
      ></BaseSelectInput>
    </v-col>
  </v-row>
</template>

<script setup>
import { defineProps, defineModel, computed } from "vue";
import { useField } from "vee-validate";
import { getDateRangeForDateOfBirthInput } from "../../utils/utils";
import BaseSelectInput from "./base/BaseSelectInput.vue";
import ErrorMessage from "./ErrorMessage.vue";

const props = defineProps({
  errorMessage: {
    type: String,
  },
  formPath: {
    type: String,
    required: true,
  },
});

const { dayRange, monthRange, yearRange } = getDateRangeForDateOfBirthInput();

const dayInputFormPath = computed(() => `${props.formPath}.day`);
const monthInputFormPath = computed(() => `${props.formPath}.month`);
const yearInputFormPath = computed(() => `${props.formPath}.year`);

const { value, errorMessage } = useField(() => props.formPath);
</script>

<style lang="scss" scoped></style>
