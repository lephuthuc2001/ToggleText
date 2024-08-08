<template>
  <v-checkbox
    v-model="checked"
    @update:modelValue="handleChange"
    :label="props.label"
    :name="props.name"
    :error-messages="props.localizedErrorMessage ?? errorMessage"
  ></v-checkbox>
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
  localizedErrorMessage: {
    type: String,
    default: undefined,
  },
});

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { handleChange, checked, errorMessage } = useField(
  () => props.formPath,
  undefined,
  {
    type: "checkbox",
    checkedValue: true,
    uncheckedValue: false,
  }
);
</script>
