<template>
  <v-main>
    <div></div>
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
          <v-row>
            <v-col cols="7">
              <v-textarea
                v-model="streetAddress"
                :label="$t('streetAddress', { ns: 'applicationForm' })"
                name="streetAddress"
                :error-messages="
                  localizedErrors['personalInfomation.address.streetAddress']
                "
                outlined
              ></v-textarea>
            </v-col>
            <v-col cols="5">
              <v-row>
                <v-col>
                  {{ $t("dateOfBirth", { ns: "applicationForm" }) }}
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-alert
                    v-if="localizedErrors['personalInfomation.dateOfBirth']"
                    :text="localizedErrors['personalInfomation.dateOfBirth']"
                    type="error"
                    variant="outlined"
                    density="compact"
                  ></v-alert>
                </v-col>
              </v-row>
              <DateOfBirthInput
                :errorMessage="
                  localizedErrors['personalInfomation.dateOfBirth']
                "
                v-model="dateOfBirth"
              ></DateOfBirthInput>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete
                v-model="country"
                :label="$t('country', { ns: 'applicationForm' })"
                name="country"
                :items="countries"
                :loading="isLoadingCountries"
                outlined
                :error-messages="
                  localizedErrors['personalInfomation.address.country']
                "
              ></v-autocomplete>
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="city"
                :label="$t('city', { ns: 'applicationForm' })"
                name="city"
                outlined
                aria-disabled="true"
                :items="cities"
                :loading="isLoadingCities"
                :error-messages="
                  localizedErrors['personalInfomation.address.city']
                "
              ></v-autocomplete>
            </v-col>
          </v-row>
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
      <v-row>
        <v-col>
          <v-alert
            v-if="localizedErrors['skills']"
            :text="localizedErrors['skills']"
            type="error"
            variant="outlined"
            density="compact"
          ></v-alert>
        </v-col>
      </v-row>
      <v-row v-for="(field, idx) in fields" :key="field.key">
        <v-col cols="6">
          <v-text-field
            v-model="field.value.name"
            :label="$t('skill', { ns: 'applicationForm', count: 1 })"
            outlined
            :error-messages="localizedErrors[`skills[${idx}].name`]"
          ></v-text-field>
        </v-col>
        <v-col cols="5">
          <v-autocomplete
            v-model="field.value.level"
            :label="$t('level', { ns: 'applicationForm', count: 1 })"
            :items="levelsOptions"
            item-title="title"
            item-value="value"
            outlined
            :error-messages="localizedErrors[`skills[${idx}].level`]"
          ></v-autocomplete>
        </v-col>
        <v-col cols="1">
          <v-btn
            aria-label="Remove"
            @click="remove(idx)"
            color="red"
            size="small"
          >
            <v-icon icon="fa-solid fa-trash" />
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            aria-label="Add"
            @click="push({ name: '', level: 'Beginner' })"
          >
            <v-icon icon="fa-solid fa-plus"
          /></v-btn>
        </v-col>
      </v-row>

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
          <v-alert
            v-if="localizedErrors['signature']"
            :text="localizedErrors['signature']"
            type="error"
            variant="outlined"
            density="compact"
          ></v-alert>
          <canvas v-signature></canvas>

          <v-btn aria-label="Clear" @click="clearSignature">
            <v-icon icon="fa-solid fa-refresh" />
          </v-btn>
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
import { computed, onMounted, ref, watch } from "vue";
import * as yup from "yup";
import LocationService from "../services/LocationService";
import { toTypedSchema } from "@vee-validate/yup";
import { useForm, useFieldArray, FieldArray } from "vee-validate";
import SignaturePad from "signature_pad";
import { useTranslation } from "i18next-vue";
import DateOfBirthInput from "./Form/DateOfBirthInput.vue";
import { setLocale } from "yup";
import {
  phoneNumberRegex,
  isOlderThan18,
  isSkillDetail,
  getLastPartOfString,
} from "../utils/utils";

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

function isDateOfBirthComplete(value) {
  const { day, month, year } = value;
  return day && month && year;
}
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

const {
  handleSubmit,
  defineField,
  errors,
  setFieldValue,
  resetForm,
  values: formData,
} = useForm({
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

const [streetAddress] = defineField("personalInfomation.address.streetAddress");
const [city] = defineField("personalInfomation.address.city");
const [country] = defineField("personalInfomation.address.country");

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

const [signature] = defineField("signature");

const { fields, push, remove } = useFieldArray("skills");

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

const countries = ref([]);
const isLoadingCountries = ref(false);

const cities = ref([]);

const isLoadingCities = ref(false);

onMounted(async () => {
  isLoadingCountries.value = true;
  const countriesNameArray = await LocationService.getAllCountries();
  isLoadingCountries.value = false;

  countries.value = countriesNameArray;
});

watch(country, async (value) => {
  setFieldValue("personalInfomation.address.city", "");
  cities.value = [];
  if (!value) {
    return;
  }

  isLoadingCities.value = true;
  const states = await LocationService.getStatesPerCountry(value);

  isLoadingCities.value = false;
  cities.value = states;
});

const signaturePad = ref(null);

const clearSignature = () => {
  signaturePad.value.clear();

  setFieldValue("signature", "");
};

i18next.on("languageChanged", () => {
  resetForm();
  clearSignature();
});

const vSignature = {
  mounted(el) {
    signaturePad.value = new SignaturePad(el, {
      backgroundColor: "rgb(255, 255, 255)",
    });

    signaturePad.value.addEventListener("endStroke", () => {
      setFieldValue("signature", signaturePad.value.toDataURL("image/jpeg"));
    });
  },
};
</script>

<style scoped></style>
