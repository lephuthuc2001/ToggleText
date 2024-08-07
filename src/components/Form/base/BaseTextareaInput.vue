<template>
  <v-textarea
    v-model="value"
    :name="props.name"
    :label="props.label"
    :error-messages="errorMessage"
  ></v-textarea>
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
});
// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.formPath);
</script>

<style lang="scss" scoped></style>
