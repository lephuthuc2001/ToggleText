<template>
  <v-main>
    <v-container tag="form" @submit.prevent="onSubmit">
      <v-row>
        <v-col>
          <h1 class="text-center text-sky-800 text-6xl uppercase font-bold">
            {{ $t("title", { ns: "applicationForm" }) }}
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1
            class="text-center text-2xl bg-sky-800 text-white font-bold uppercase py-2"
          >
            {{ $t("personalInformation", { ns: "applicationForm" }) }}
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <h2>{{ $t("name", { ns: "applicationForm" }) }}</h2>
        </v-col>
        <v-col cols="10">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="firstName"
                name="firstName"
                :label="$t('firstName', { ns: 'applicationForm' })"
                :error-messages="
                  localizedErrors['personalInfomation.name.firstName']
                "
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="lastName"
                name="lastName"
                :label="$t('lastName', { ns: 'applicationForm' })"
                :error-messages="
                  localizedErrors['personalInfomation.name.lastName']
                "
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <h2>{{ $t("address", { ns: "applicationForm" }) }}</h2>
        </v-col>
        <v-col cols="10">
          <AddressInput v-model="address" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <h2>{{ $t("dateOfBirth", { ns: "applicationForm" }) }}</h2>
        </v-col>
        <v-col cols="10">
          <DateOfBirthInput
            :errorMessage="localizedErrors['personalInfomation.dateOfBirth']"
            v-model="dateOfBirth"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <h2>{{ $t("phone", { ns: "applicationForm" }) }}</h2>
        </v-col>
        <v-col cols="10">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="homePhone"
                :label="$t('home', { ns: 'applicationForm' })"
                outlined
                :error-messages="
                  localizedErrors['personalInfomation.phone.home']
                "
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="mobilePhone"
                :label="$t('mobile', { ns: 'applicationForm' })"
                outlined
                :error-messages="
                  localizedErrors['personalInfomation.phone.mobile']
                "
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1
            class="text-center text-2xl bg-sky-800 text-white font-semibold uppercase py-2"
          >
            {{ $t("education", { ns: "applicationForm" }) }}
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <h2>{{ $t("highSchool", { ns: "applicationForm" }) }}</h2>
        </v-col>
        <v-col cols="10">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="highSchoolName"
                :label="$t('highSchoolName', { ns: 'applicationForm' })"
                outlined
                :error-messages="localizedErrors['education.highSchool.name']"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="highSchoolLocation"
                :label="$t('highSchoolLocation', { ns: 'applicationForm' })"
                outlined
                :error-messages="
                  localizedErrors['education.highSchool.location']
                "
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <h2>{{ $t("university", { ns: "applicationForm" }) }}</h2>
        </v-col>
        <v-col cols="10">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="universityName"
                :label="$t('universityName', { ns: 'applicationForm' })"
                outlined
                :error-messages="localizedErrors['education.university.name']"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="universityLocation"
                :label="$t('universityLocation', { ns: 'applicationForm' })"
                outlined
                :error-messages="
                  localizedErrors['education.university.location']
                "
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="7">
          <h1
            class="opacity-40 text-center text-2xl bg-sky-800 text-white font-semibold uppercase py-2"
          >
            {{ $t("skill", { ns: "applicationForm", count: 2 }) }}
          </h1>
        </v-col>
        <v-col cols="5">
          <h1
            class="opacity-40 text-center text-2xl bg-sky-800 text-white font-semibold uppercase py-2"
          >
            {{ $t("level", { ns: "applicationForm", count: 2 }) }}
          </h1>
        </v-col>
      </v-row>
      <SkillsLevelsInput
        v-model="skills"
        :errorMessage="localizedErrors['skills']"
      />

      <v-row>
        <v-col>
          <v-checkbox
            v-model="isAgreed"
            name="agreement"
            :error-messages="localizedErrors['agreement']"
            :label="$t('agreement', { ns: 'applicationForm' })"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1 class="mb-2">{{ $t("signature", { ns: "applicationForm" }) }}</h1>
          <SignatureInput
            v-model="signature"
            :error-message="localizedErrors['signature']"
          ></SignatureInput>
        </v-col>
        <v-col>
          <v-sheet height="150" color="blue-grey-lighten-5l">
            {{ $t("date", { ns: "applicationForm" }) }}
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet height="150" color="blue-grey-lighten-5l">
            {{ $t("approval", { ns: "applicationForm" }) }}
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            aria-label="Submit"
            size="large"
            variant="elevated"
            color="blue-darken-2"
            type="submit"
            >{{ $t("submit", { ns: "applicationForm" }) }}</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { computed } from "vue";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { useForm, useFieldArray, FieldArray } from "vee-validate";
import { useTranslation } from "i18next-vue";
import DateOfBirthInput from "./Form/DateOfBirthInput.vue";
import { setLocale } from "yup";
import {
  phoneNumberRegex,
  isOlderThan18,
  isSkillDetail,
  getLastPartOfString,
} from "../utils/utils";
import SignatureInput from "./Form/SignatureInput.vue";
import AddressInput from "./Form/AddressInput.vue";
import SkillsLevelsInput from "./Form/SkillsLevelsInput.vue";

const { t, i18next } = useTranslation();

const initialValues = {
  personalInfomation: {
    name: {
      firstName: "",
      lastName: "",
    },
    address: {
      streetAddress: "",
      city: "",
      country: "",
    },
    dateOfBirth: {
      day: "",
      month: "",
      year: "",
    },
    phone: {
      home: "",
      mobile: "",
    },
  },
  education: {
    highSchool: {
      name: "",
      location: "",
    },
    university: {
      name: "",
      location: "",
    },
  },
  skills: [
    {
      name: "aaa",
      level: "Beginner",
    },
    {
      name: "bbb",
      level: "Beginner",
    },
    {
      name: "ccc",
      level: "Beginner",
    },
  ],
  agreement: false,
  signature: "",
};

setLocale({
  mixed: {
    required: ({ path }) => {
      return {
        validationRule: "validation.required",
        details: { path },
      };
    },
  },
  string: {
    matches: ({ path, regex }) => ({
      validationRule: "validation.matches",
      details: { path, regex },
    }),
  },
  number: {
    min: ({ min, path }) => ({
      validationRule: "field_too_short",
      details: { min, path },
    }),
    max: ({ max, path }) => ({
      validationRule: "field_too_big",
      details: { max, path },
    }),
  },
  array: {
    min: ({ path, min }) => ({
      validationRule: "validation.array-min",
      details: { min, path },
    }),
  },
});

const schema = yup.object().shape({
  personalInfomation: yup.object().shape({
    name: yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
    }),
    address: yup.object().shape({
      streetAddress: yup.string().required(),
      city: yup.string().required(),
      country: yup.string().required(),
    }),
    dateOfBirth: yup
      .object()
      .shape({
        day: yup.string().required(),
        month: yup.string().required(),
        year: yup.string().required(),
      })
      .required()
      .test("isOlderThan18", "You must be older than 18", isOlderThan18),
    phone: yup.object().shape({
      home: yup.string().matches(phoneNumberRegex).required(),
      mobile: yup.string().matches(phoneNumberRegex).required(),
    }),
  }),
  education: yup.object().shape({
    highSchool: yup.object().shape({
      name: yup.string().required(),
      location: yup.string().required(),
    }),
    university: yup.object().shape({
      name: yup.string().required(),
      location: yup.string().required(),
    }),
  }),
  skills: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required(),
        level: yup
          .string()
          .required()
          .oneOf(
            ["Beginner", "Intermediate", "Advanced"],
            "Invalid skill level"
          ),
      })
    )
    .min(3),
  agreement: yup.boolean().oneOf([true], "You must agree to the terms"),
  signature: yup.string().required("You must sign the application"),
});

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues,
});

const localizedErrors = computed(function () {
  const output = {};

  if (Object.keys(errors.value).length === 0) {
    return output;
  }

  Object.entries(errors.value).forEach(([key, value]) => {
    if (typeof value === "object") {
      const { validationRule, details } = value;

      let formPath = "path." + details.path;

      const isSkill = isSkillDetail(details.path);
      if (isSkill.isMatch) {
        formPath = isSkill.isName
          ? "path." + "skillName"
          : "path." + "skillLevel";
      }

      const field = t(formPath, {
        ns: "applicationForm",
        lng: "en",
      });

      const fieldName = t(field, {
        ns: "applicationForm",
      });

      let message;

      if (validationRule === "validation.required") {
        message = t(validationRule, {
          ns: "applicationForm",
          field: fieldName,
        });
      }

      if (validationRule === "validation.matches") {
        message = t(validationRule, {
          ns: "applicationForm",
          field: fieldName,
          regex: details.regex,
        });
      }

      if (validationRule === "validation.array-min") {
        message = t(validationRule, {
          ns: "applicationForm",
          field: fieldName,
          expected: details.min,
        });
      }

      output[key] = message;
    } else {
      const message = t("validation.custom." + getLastPartOfString(key), {
        ns: "applicationForm",
      });
      output[key] = message;
    }
  });

  return output;
});

const [firstName] = defineField("personalInfomation.name.firstName");
const [lastName] = defineField("personalInfomation.name.lastName");

const [address] = defineField("personalInfomation.address");

const [dateOfBirth] = defineField("personalInfomation.dateOfBirth");

const [homePhone] = defineField("personalInfomation.phone.home");
const [mobilePhone] = defineField("personalInfomation.phone.mobile");

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values));

  console.log(values);
  resetForm();
});

const [highSchoolName] = defineField("education.highSchool.name");
const [highSchoolLocation] = defineField("education.highSchool.location");

const [universityName] = defineField("education.university.name");
const [universityLocation] = defineField("education.university.location");

const [isAgreed] = defineField("agreement");

const [signature] = defineField("signature", {
  validateOnBlur: false,
  // Validates when `change` event is emitted from the element/component
  validateOnChange: false,
  // Validates when `input` event is emitted from the element/component
  validateOnInput: false,
  // Validates when the returned model value changes
  validateOnModelUpdate: true,
});

const skills = useFieldArray("skills");

i18next.on("languageChanged", () => {
  resetForm();
});
</script>

<style scoped></style>
