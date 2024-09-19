<template>
  <v-autocomplete
    :name="props.name"
    v-model="value"
    :items="props.items"
    :item-title="props.itemTitle"
    :item-value="props.itemValue"
    :error-messages="props.errorMessage ?? errorMessage"
    :loading="props.loading"
  >
    <template #label>
      {{ props.label }}
      <span class="text-red" v-if="props.required"> (required) &#42;</span>
    </template></v-autocomplete
  >
</template>

<script setup>
import { required } from "valibot";
import { useField } from "vee-validate";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  formPath: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  itemTitle: {
    type: String,
    default: "title",
  },
  itemValue: {
    type: String,
    default: "value",
  },
  loading: {
    type: Boolean,
    default: false,
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

const { value, errorMessage } = useField(() => props.formPath);
</script>

<style lang="scss" scoped></style>
