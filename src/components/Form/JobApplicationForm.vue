<template>
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
              :errorMessage="
                localizedErrors['personalInfomation.name.firstName']
              "
            />
          </v-col>
          <v-col cols="6">
            <BaseTextInput
              name="lastName"
              :label="$t('lastName', { ns: 'applicationForm' })"
              formPath="personalInfomation.name.lastName"
              :errorMessage="
                localizedErrors['personalInfomation.name.lastName']
              "
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
        <AddressInput
          :localizedErrors="localizedErrors"
          formPath="personalInfomation.address"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <h2>{{ $t("dateOfBirth", { ns: "applicationForm" }) }}</h2>
      </v-col>
      <v-col cols="10">
        <DateOfBirthInput
          :localizedErrors="localizedErrors"
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
              :errorMessage="localizedErrors['personalInfomation.phone.home']"
            />
          </v-col>
          <v-col cols="6">
            <BaseTextInput
              name="mobile"
              :label="$t('mobile', { ns: 'applicationForm' })"
              formPath="personalInfomation.phone.mobile"
              :errorMessage="localizedErrors['personalInfomation.phone.mobile']"
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
              :errorMessage="localizedErrors['education.highSchool.name']"
            />
          </v-col>
          <v-col cols="6">
            <BaseTextInput
              name="highSchoolLocation"
              :label="$t('highSchoolLocation', { ns: 'applicationForm' })"
              formPath="education.highSchool.location"
              :errorMessage="localizedErrors['education.highSchool.location']"
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
              :errorMessage="localizedErrors['education.university.name']"
            />
          </v-col>
          <v-col cols="6">
            <BaseTextInput
              name="universityLocation"
              :label="$t('universityLocation', { ns: 'applicationForm' })"
              formPath="education.university.location"
              :errorMessage="localizedErrors['education.university.location']"
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
    <SkillsLevelsInput :localizedErrors="localizedErrors" formPath="skills" />

    <v-row>
      <v-col>
        <BaseCheckbox
          name="agreement"
          :label="$t('agreement', { ns: 'applicationForm' })"
          formPath="agreement"
          :errorMessage="localizedErrors['agreement']"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1 class="mb-2">{{ $t("signature", { ns: "applicationForm" }) }}</h1>
        <SignatureInput
          :errorMessage="localizedErrors['signature']"
          formPath="signature"
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

  <div>{{ errors }}</div>
  <div>{{ localizedErrors }}</div>
</template>

<script setup>
// Library imports
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useTranslation } from "i18next-vue";
import isEmpty from "lodash/isEmpty";

// Utility imports
import { phoneNumberRegex, isOlderThan18 } from "../../utils/utils";

// Component imports
import DateOfBirthInput from "./custom/DateOfBirthInput.vue";
import SignatureInput from "./custom/SignatureInput.vue";
import AddressInput from "./custom/AddressInput.vue";
import SkillsLevelsInput from "./custom/SkillsLevelsInput.vue";
import BaseTextInput from "./base/BaseTextInput.vue";
import BaseCheckbox from "./base/BaseCheckbox.vue";
import { computed } from "vue";

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
      firstName: z
        .string({
          message: "firstName.required",
        })
        .min(2),
      lastName: z
        .string({
          message: "lastName.required",
        })
        .min(2, {
          message: "lastName.required",
        }),
    }),
    address: z
      .object({
        streetAddress: z
          .string({
            message: "streetAddress.required",
          })
          .min(1, {
            message: "streetAddress.required",
          }),
        postcode: z.string({
          message: "postcode.required",
        }),
        city: z
          .string({
            message: "city.required",
          })
          .min(1, {
            message: "city.required",
          }),
        country: z
          .string({
            message: "country.required",
          })
          .min(1, {
            message: "country.required",
          }),
      })
      .refine(
        ({ postcode, country }) => {
          if (country === "United States" && isEmpty(postcode)) {
            return false;
          }
          return true;
        },
        {
          message: "postcode.required",
        }
      ),
    dateOfBirth: z
      .object({
        day: z
          .string({
            message: "day.required",
          })
          .min(1, {
            message: "day.required",
          }),
        month: z
          .string({
            message: "month.required",
          })
          .min(1, {
            message: "month.required",
          }),
        year: z
          .string({
            message: "year.required",
          })
          .min(1, {
            message: "year.required",
          }),
      })
      .refine(
        (value) => {
          return isOlderThan18(value);
        },
        {
          message: "olderThan18",
        }
      ),
    phone: z.object({
      home: z
        .string({
          message: "phoneNumber.invalid",
        })
        .regex(phoneNumberRegex, {
          message: "phoneNumber.invalid",
        }),
      mobile: z
        .string({
          message: "phoneNumber.invalid",
        })
        .regex(phoneNumberRegex, { message: "phoneNumber.invalid" }),
    }),
  }),
  education: z.object({
    highSchool: z.object({
      name: z
        .string({
          message: "highSchoolName.required",
        })
        .min(1, {
          message: "highSchoolName.required",
        }),
      location: z
        .string({
          message: "highSchoolLocation.required",
        })
        .min(1, {
          message: "highSchoolLocation.required",
        }),
    }),
    university: z.object({
      name: z
        .string({
          message: "universityName.required",
        })
        .min(1, {
          message: "universityName.required",
        }),
      location: z
        .string({
          message: "universityLocation.required",
        })
        .min(1, {
          message: "universityLocation.required",
        }),
    }),
  }),
  skills: z
    .array(
      z.object({
        name: z
          .string({
            message: "skillName.required",
          })
          .min(1, {
            message: "skillName.required",
          }),
        level: z.enum(["Beginner", "Intermediate", "Advanced"], {
          message: "skillLevel.invalid",
        }),
      })
    )
    .min(3, {
      message: "skills.atLeastThree",
    }),
  agreement: z
    .boolean()
    .default(false)
    .refine(
      (value) => {
        return value;
      },
      {
        message: "agreement.required",
      }
    ),
  signature: z.string().refine(
    (value) => {
      return value.length > 0;
    },
    {
      message: "signature.required",
    }
  ),
});

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: toTypedSchema(zodSchema),
  initialValues,
});

const localizedErrors = computed(() => {
  const output = {};

  // If there are no errors, return an empty object
  if (Object.keys(errors.value).length === 0) {
    return output;
  }

  Object.entries(errors.value).forEach(([formPath, message]) => {
    output[formPath] = t(message, { ns: "applicationForm" });
  });

  return output;
});

const onSubmit = handleSubmit((values, actions) => {
  console.log(values);

  actions.resetForm();
});

i18next.on("languageChanged", () => {
  resetForm();
});
</script>

<style scoped></style>
