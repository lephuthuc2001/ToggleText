<template>
  <v-row v-if="errorMessage">
    <v-col>
      <ErrorMessage
        :errorMessage="props.localizedErrors[formPath] ?? errorMessage"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <BaseSelectInput
        :label="$t('day', { ns: 'applicationForm' })"
        :items="dayRange"
        name="day"
        :formPath="dayInputFormPath"
        :errorMessage="dayErrorMessage"
        :required="isRequired(props.validationSchema, dayInputFormPath)"
      ></BaseSelectInput
    ></v-col>

    <v-col>
      <BaseSelectInput
        :label="$t('month', { ns: 'applicationForm' })"
        :items="monthRange"
        name="month"
        :formPath="monthInputFormPath"
        :errorMessage="monthErrorMessage"
        :required="isRequired(props.validationSchema, monthInputFormPath)"
      ></BaseSelectInput>
    </v-col>
    <v-col>
      <BaseSelectInput
        :label="$t('year', { ns: 'applicationForm' })"
        name="year"
        :items="yearRange"
        :formPath="yearInputFormPath"
        :errorMessage="yearErrorMessage"
        :required="isRequired(props.validationSchema, yearInputFormPath)"
      ></BaseSelectInput>
    </v-col>
  </v-row>
</template>

<script setup>
// Vue-related imports
import { defineProps, defineModel, computed } from "vue";

// Library imports
import { useField } from "vee-validate";

// Local imports
import {
  getDateRangeForDateOfBirthInput,
  isRequired,
} from "../../../utils/utils";
import BaseSelectInput from "../base/BaseSelectInput.vue";
import ErrorMessage from "../base/ErrorMessage.vue";
import { required } from "valibot";

const props = defineProps({
  errorMessage: {
    type: String,
  },
  formPath: {
    type: String,
    required: true,
  },
  localizedErrors: {
    type: Object,
    default: () => ({}),
  },
  validationSchema: {
    type: Object,
    required: true,
  },
});

const { dayRange, monthRange, yearRange } = getDateRangeForDateOfBirthInput();

const dayInputFormPath = `${props.formPath}.day`;
const monthInputFormPath = `${props.formPath}.month`;
const yearInputFormPath = `${props.formPath}.year`;

const dayErrorMessage = computed(() => {
  return props.localizedErrors[dayInputFormPath];
});
const monthErrorMessage = computed(() => {
  return props.localizedErrors[monthInputFormPath];
});
const yearErrorMessage = computed(() => {
  return props.localizedErrors[yearInputFormPath];
});

const { value, errorMessage } = useField(() => props.formPath);
</script>

<style lang="scss" scoped></style>
