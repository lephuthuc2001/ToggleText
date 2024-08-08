<template>
  <v-autocomplete
    :label="props.label"
    :name="props.name"
    v-model="value"
    :items="props.items"
    :item-title="props.itemTitle"
    :item-value="props.itemValue"
    :error-messages="props.localizedErrorMessage ?? errorMessage"
    :loading="props.loading"
  ></v-autocomplete>
</template>

<script setup>
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
  localizedErrorMessage: {
    type: String,
    default: undefined,
  },
});

const { value, errorMessage } = useField(() => props.formPath);
</script>

<style lang="scss" scoped></style>
