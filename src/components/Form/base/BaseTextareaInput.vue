<template>
  <v-textarea
    v-model="value"
    :name="props.name"
    :error-messages="props.errorMessage ?? errorMessage"
  >
    <template #label>
      {{ props.label }}
      <span class="text-red" v-if="props.required"> (required) &#42;</span>
    </template></v-textarea
  >
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
  required: {
    type: Boolean,
    default: false,
  },
});
// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.formPath);
</script>

<style lang="scss" scoped></style>
