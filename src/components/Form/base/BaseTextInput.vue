<template>
  <v-text-field
    v-model="value"
    :name="props.name"
    :label="props.label"
    :error-messages="props.errorMessage ?? errorMessage"
  ></v-text-field>
</template>
<script setup>
import { useField } from "vee-validate";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  formPath: {
    type: String,
    required: true,
  },
  errorMessage: {
    type: String,
    default: undefined,
  },
});
// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.formPath);
</script>
