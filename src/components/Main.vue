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
              <BaseTextInput
                name="firstName"
                :label="$t('firstName', { ns: 'applicationForm' })"
                formPath="personalInfomation.name.firstName"
                :errorMessage="errors['personalInfomation.name.firstName']"
              />
            </v-col>
            <v-col cols="6">
              <BaseTextInput
                name="lastName"
                :label="$t('lastName', { ns: 'applicationForm' })"
                formPath="personalInfomation.name.lastName"
                :errorMessage="errors['personalInfomation.name.lastName']"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <h2>{{ $t("address", { ns: "applicationForm" }) }}</h2>
        </v-col>
        <v-col cols="10">
          <AddressInput formPath="personalInfomation.address" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <h2>{{ $t("dateOfBirth", { ns: "applicationForm" }) }}</h2>
        </v-col>
        <v-col cols="10">
          <DateOfBirthInput
            v-model="dateOfBirth"
            formPath="personalInfomation.dateOfBirth"
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
              <BaseTextInput
                name="home"
                :label="$t('home', { ns: 'applicationForm' })"
                formPath="personalInfomation.phone.home"
                :errorMessage="errors['personalInfomation.phone.home']"
              />
            </v-col>
            <v-col cols="6">
              <BaseTextInput
                name="mobile"
                :label="$t('mobile', { ns: 'applicationForm' })"
                formPath="personalInfomation.phone.mobile"
                :errorMessage="errors['personalInfomation.phone.mobile']"
              />
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
              <BaseTextInput
                name="highSchoolName"
                :label="$t('highSchoolName', { ns: 'applicationForm' })"
                formPath="education.highSchool.name"
                :errorMessage="errors['education.highSchool.name']"
              />
            </v-col>
            <v-col cols="6">
              <BaseTextInput
                name="highSchoolLocation"
                :label="$t('highSchoolLocation', { ns: 'applicationForm' })"
                formPath="education.highSchool.location"
                :errorMessage="errors['education.highSchool.location']"
              />
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
              <BaseTextInput
                name="universityName"
                :label="$t('universityName', { ns: 'applicationForm' })"
                formPath="education.university.name"
                :errorMessage="errors['education.university.name']"
              />
            </v-col>
            <v-col cols="6">
              <BaseTextInput
                name="universityLocation"
                :label="$t('universityLocation', { ns: 'applicationForm' })"
                formPath="education.university.location"
                :errorMessage="errors['education.university.location']"
              />
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
      <SkillsLevelsInput formPath="skills" />

      <v-row>
        <v-col>
          <v-checkbox
            v-model="isAgreed"
            name="agreement"
            :errorMessages="errors['agreement']"
          >
            <template #label>
              {{ $t("agreement", { ns: "applicationForm" }) }}
            </template>
          </v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1 class="mb-2">{{ $t("signature", { ns: "applicationForm" }) }}</h1>
          <SignatureInput v-model="signature"></SignatureInput>
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
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useTranslation } from "i18next-vue";
import DateOfBirthInput from "./Form/DateOfBirthInput.vue";
import { phoneNumberRegex, isOlderThan18 } from "../utils/utils";
import SignatureInput from "./Form/SignatureInput.vue";
import AddressInput from "./Form/AddressInput.vue";
import SkillsLevelsInput from "./Form/SkillsLevelsInput.vue";
import BaseTextInput from "./Form/base/BaseTextInput.vue";

const { t, i18next } = useTranslation();

const initialValues = {
  personalInfomation: {
    name: {
      firstName: "",
      lastName: "",
    },
    address: {
      streetAddress: "",
      postcode: "",
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

const zodSchema = z.object({
  personalInfomation: z.object({
    name: z.object({
      firstName: z.string().min(2, {
        message: "First name must be at least 2 characters",
      }),
      lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters",
      }),
    }),
    address: z.object({
      streetAddress: z.string().min(1, {
        message: "Street address must be at least 1 character",
      }),
      postcode: z.string().min(1, {
        message: "Postcode must be at least 1 character",
      }),
      city: z.string().min(1, {
        message: "City is required",
      }),
      country: z.string().min(1, {
        message: "Country is required",
      }),
    }),
    dateOfBirth: z
      .object({
        day: z.string().min(1, {
          message: "Day is required",
        }),
        month: z.string().min(1, {
          message: "Month is required",
        }),
        year: z.string().min(1, {
          message: "Year is required",
        }),
      })
      .refine(
        (value) => {
          console.log(value);
          return isOlderThan18(value);
        },
        {
          message: "You must be older than 18",
        }
      ),
    phone: z.object({
      home: z.string().min().regex(phoneNumberRegex, {
        message: "Invalid phone number",
      }),
      mobile: z
        .string()
        .regex(phoneNumberRegex, { message: "Invalid phone number" }),
    }),
  }),
  education: z.object({
    highSchool: z.object({
      name: z.string().min(1, {
        message: "High school name must be at least 1 character",
      }),
      location: z.string().min(1, {
        message: "High school location must be at least 1 character",
      }),
    }),
    university: z.object({
      name: z.string().min(1, {
        message: "University name must be at least 1 character",
      }),
      location: z.string().min(1, {
        message: "University location must be at least 1 character",
      }),
    }),
  }),
  skills: z
    .array(
      z.object({
        name: z.string().min(1, {
          message: "Skill name must be at least 1 character",
        }),
        level: z.enum(["Beginner", "Intermediate", "Advanced"], {
          message:
            "Skill level must be one of the following: Beginner, Intermediate, Advanced",
        }),
      })
    )
    .min(3, {
      message: "You must have at least 3 skills",
    }),
  agreement: z.boolean().refine(
    (value) => {
      return value;
    },
    {
      message: "You must agree to the terms",
    }
  ),
  signature: z.string().refine(
    (value) => {
      return value.length > 0;
    },
    {
      message: "You must sign the application",
    }
  ),
});

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: toTypedSchema(zodSchema),
  initialValues,
});

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values));

  console.log(values);
  resetForm();
});

const [isAgreed] = defineField("agreement");

i18next.on("languageChanged", () => {
  resetForm();
});
</script>

<style scoped></style>
