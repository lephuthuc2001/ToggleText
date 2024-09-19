<template>
  <v-checkbox
    v-model="checked"
    @update:modelValue="handleChange"
    :name="props.name"
    :error-messages="props.errorMessage ?? errorMessage"
  >
    <template #label>
      {{ props.label }}
      <span class="text-red" v-if="props.required"> (required) &#42;</span>
    </template></v-checkbox
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
