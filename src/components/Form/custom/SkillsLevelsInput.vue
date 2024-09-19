<template>
  <v-row v-if="errorMessage">
    <v-col>
      <ErrorMessage
        :errorMessage="props.localizedErrors[formPath] ?? errorMessage"
      />
    </v-col>
  </v-row>
  <v-row v-for="(field, idx) in fields" :key="field.key">
    <v-col cols="6">
      <BaseTextInput
        :label="$t('skill', { ns: 'applicationForm', count: 1 })"
        name="skill"
        :formPath="`${props.formPath}[${idx}].name`"
        :errorMessage="localizedErrors[`${props.formPath}[${idx}].name`]"
        :required="
          isRequired(props.validationSchema, `${props.formPath}[${idx}].name`)
        "
      ></BaseTextInput>
    </v-col>
    <v-col cols="5">
      <BaseSelectInput
        :label="$t('level', { ns: 'applicationForm', count: 1 })"
        name="level"
        :items="levelsOptions"
        :formPath="`${props.formPath}` + `[${idx}].level`"
        :errorMessage="localizedErrors[`${props.formPath}[${idx}].level`]"
        :required="
          isRequired(props.validationSchema, `${props.formPath}[${idx}].level`)
        "
      ></BaseSelectInput>
    </v-col>
    <v-col cols="1">
      <v-btn aria-label="Remove" @click="remove(idx)" color="red" size="small">
        <v-icon icon="fa-solid fa-trash" />
      </v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-btn aria-label="Add" @click="push({ name: '', level: 'Beginner' })">
        <v-icon icon="fa-solid fa-plus"
      /></v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
// Vue-related imports
import { computed } from "vue";

// Library imports
import { useTranslation } from "i18next-vue";
import { useFieldArray, useFieldError } from "vee-validate";

// Relative imports
import ErrorMessage from "../base/ErrorMessage.vue";
import BaseTextInput from "../base/BaseTextInput.vue";
import BaseSelectInput from "../base/BaseSelectInput.vue";
import { isRequired } from "../../../utils/utils";
import { required } from "valibot";

const { t } = useTranslation();
const props = defineProps({
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

const { fields, push, remove } = useFieldArray(() => props.formPath);

const errorMessage = useFieldError(() => props.formPath);

const levelsOptions = computed(function () {
  return [
    {
      title: t("beginner", {
        ns: "applicationForm",
      }),
      value: "Beginner",
    },
    {
      title: t("intermediate", {
        ns: "applicationForm",
      }),
      value: "Intermediate",
    },
    {
      title: t("advanced", {
        ns: "applicationForm",
      }),
      value: "Advanced",
    },
  ];
});
</script>

<style lang="scss" scoped></style>
