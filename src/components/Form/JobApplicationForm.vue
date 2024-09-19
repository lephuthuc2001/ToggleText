<template>
  <v-container tag="form" @submit.prevent="onSubmit">
    <v-row>
      <v-radio-group
        v-model="schema"
        :label="'Schema: ' + schema.toUpperCase()"
        inline
      >
        <v-radio label="Zod" value="zod"></v-radio>
        <v-radio label="Yup" value="yup"></v-radio>
        <v-radio label="Valibot" value="valibot"></v-radio>
      </v-radio-group>
    </v-row>
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
        <h2>
          {{ $t("name", { ns: "applicationForm" }) }}
        </h2>
      </v-col>
      <v-col cols="10">
        <v-row>
          <v-col cols="6">
            <BaseTextInput
              name="firstName"
              :label="$t('firstName', { ns: 'applicationForm' })"
              formPath="personalInformation.name.firstName"
              :errorMessage="
                localizedErrors['personalInformation.name.firstName']
              "
              :required="
                isRequired(
                  validationSchema,
                  'personalInformation.name.firstName'
                )
              "
            />
          </v-col>
          <v-col cols="6">
            <BaseTextInput
              name="lastName"
              :label="$t('lastName', { ns: 'applicationForm' })"
              formPath="personalInformation.name.lastName"
              :errorMessage="
                localizedErrors['personalInformation.name.lastName']
              "
              :required="
                isRequired(
                  validationSchema,
                  'personalInformation.name.firstName'
                )
              "
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <h2>
          {{ $t("address", { ns: "applicationForm" }) }}
        </h2>
      </v-col>
      <v-col cols="10">
        <AddressInput
          :localizedErrors="localizedErrors"
          formPath="personalInformation.address"
          :validationSchema="validationSchema"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <h2>
          {{ $t("dateOfBirth", { ns: "applicationForm" }) }}
        </h2>
      </v-col>
      <v-col cols="10">
        <DateOfBirthInput
          :localizedErrors="localizedErrors"
          formPath="personalInformation.dateOfBirth"
          :validationSchema="validationSchema"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <h2>
          {{ $t("phone", { ns: "applicationForm" }) }}
        </h2>
      </v-col>
      <v-col cols="10">
        <v-row>
          <v-col cols="6">
            <BaseTextInput
              name="home"
              :label="$t('home', { ns: 'applicationForm' })"
              formPath="personalInformation.phone.home"
              :errorMessage="localizedErrors['personalInformation.phone.home']"
              :required="
                isRequired(validationSchema, 'personalInformation.phone.home')
              "
            />
          </v-col>
          <v-col cols="6">
            <BaseTextInput
              name="mobile"
              :label="$t('mobile', { ns: 'applicationForm' })"
              formPath="personalInformation.phone.mobile"
              :errorMessage="
                localizedErrors['personalInformation.phone.mobile']
              "
              :required="
                isRequired(validationSchema, 'personalInformation.phone.mobile')
              "
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
        <h2>
          {{ $t("highSchool", { ns: "applicationForm" }) }}
        </h2>
      </v-col>
      <v-col cols="10">
        <v-row>
          <v-col cols="6">
            <BaseTextInput
              name="highSchoolName"
              :label="$t('highSchoolName', { ns: 'applicationForm' })"
              formPath="education.highSchool.name"
              :errorMessage="localizedErrors['education.highSchool.name']"
              :required="
                isRequired(validationSchema, 'education.highSchool.name')
              "
            />
          </v-col>
          <v-col cols="6">
            <BaseTextInput
              name="highSchoolLocation"
              :label="$t('highSchoolLocation', { ns: 'applicationForm' })"
              formPath="education.highSchool.location"
              :errorMessage="localizedErrors['education.highSchool.location']"
              :required="
                isRequired(validationSchema, 'education.highSchool.location')
              "
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <h2>
          {{ $t("university", { ns: "applicationForm" }) }}
        </h2>
      </v-col>
      <v-col cols="10">
        <v-row>
          <v-col cols="6">
            <BaseTextInput
              name="universityName"
              :label="$t('universityName', { ns: 'applicationForm' })"
              formPath="education.university.name"
              :errorMessage="localizedErrors['education.university.name']"
              :required="
                isRequired(validationSchema, 'education.university.name')
              "
            />
          </v-col>
          <v-col cols="6">
            <BaseTextInput
              name="universityLocation"
              :label="$t('universityLocation', { ns: 'applicationForm' })"
              formPath="education.university.location"
              :errorMessage="localizedErrors['education.university.location']"
              :required="
                isRequired(validationSchema, 'education.university.location')
              "
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
    <SkillsLevelsInput
      :localizedErrors="localizedErrors"
      formPath="skills"
      :validationSchema="validationSchema"
    />

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
        <h1 class="mb-2">
          {{ $t("signature", { ns: "applicationForm" }) }}
          <span
            class="text-red"
            v-if="isRequired(validationSchema, 'signature')"
          >
            (required) &#42;</span
          >
        </h1>
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
import * as yup from "yup";
import * as v from "valibot";
import { toTypedSchema as zodToTypedSchema } from "@vee-validate/zod";
import { toTypedSchema as yupToTypedSchema } from "@vee-validate/yup";
import { toTypedSchema as valibotToTypedSchema } from "@vee-validate/valibot";
import { useForm } from "vee-validate";
import { useTranslation } from "i18next-vue";
import isEmpty from "lodash/isEmpty";
import { ref, watch } from "vue";

// Utility imports
import { phoneNumberRegex, isOlderThan18, isRequired } from "../../utils/utils";

// Component imports
import DateOfBirthInput from "./custom/DateOfBirthInput.vue";
import SignatureInput from "./custom/SignatureInput.vue";
import AddressInput from "./custom/AddressInput.vue";
import SkillsLevelsInput from "./custom/SkillsLevelsInput.vue";
import BaseTextInput from "./base/BaseTextInput.vue";
import BaseCheckbox from "./base/BaseCheckbox.vue";
import { computed } from "vue";
import { required } from "valibot";

const { t, i18next } = useTranslation();

const initialValues = {
  personalInformation: {
    name: {
      firstName: "",
      lastName: "",
    },
    address: {
      streetAddress: "",
      postcode: undefined,
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

const schema = ref("zod");

const zodSchema = zodToTypedSchema(
  z.object({
    personalInformation: z.object({
      name: z.object({
        firstName: z
          .string({
            message: "firstName.required",
          })
          .min(2, {
            message: "firstName.required",
          }),
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
          postcode: z
            .string({
              message: "city.required",
            })
            .optional({
              message: "city.required",
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
          (value) => {
            if (value.country === "United States") {
              return value.postcode !== undefined;
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
  })
);

const yupSchema = yupToTypedSchema(
  yup.object().shape({
    personalInformation: yup
      .object()
      .shape({
        name: yup
          .object()
          .shape({
            firstName: yup
              .string("firstName.required")
              .required("firstName.required"),
            lastName: yup
              .string("lastName.required")
              .required("lastName.required"),
          })
          .required(),
        address: yup
          .object()
          .shape({
            streetAddress: yup.string().required("streetAddress.required"),
            postcode: yup.string().when("country", {
              is: "United States",
              then: (postcode) => postcode.required("postcode.required"),
              otherwise: (addressSchema) => addressSchema.nullable(),
            }),
            city: yup.string().required("city.required"),
            country: yup.string().required("country.required"),
          })
          .required(),
        dateOfBirth: yup
          .object()
          .shape({
            day: yup.string().required("day.required"),
            month: yup.string().required("month.required"),
            year: yup.string().required("year.required"),
          })
          .test("is-older-than-18", "olderThan18", function (value) {
            return isOlderThan18(value);
          })
          .required(),
        phone: yup
          .object()
          .shape({
            home: yup.string().matches(phoneNumberRegex, "phoneNumber.invalid"),

            mobile: yup
              .string()
              .matches(phoneNumberRegex, "phoneNumber.invalid"),
          })
          .required(),
      })
      .required(),
    education: yup.object().shape({
      highSchool: yup
        .object()
        .shape({
          name: yup.string().required("highSchoolName.required"),
          location: yup.string().required("highSchoolLocation.required"),
        })
        .required(),
      university: yup
        .object()
        .shape({
          name: yup.string().required("universityName.required"),
          location: yup.string().required("universityLocation.required"),
        })
        .required(),
    }),
    skills: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required("skillName.required"),
          level: yup
            .mixed()
            .oneOf(
              ["Beginner", "Intermediate", "Advanced"],
              "skillLevel.invalid"
            )
            .required("skillLevel.invalid"),
        })
      )
      .min(3, "skills.atLeastThree")
      .required(),
    agreement: yup.boolean().oneOf([true], "agreement.required"),
    signature: yup.string().required("signature.required"),
  })
);

const valibotSchema = valibotToTypedSchema(
  v.object({
    personalInformation: v.object({
      name: v.object({
        firstName: v.pipe(v.string(), v.nonEmpty("firstName.required")),
        lastName: v.pipe(v.string(), v.nonEmpty("lastName.required")),
      }),
      address: v.pipe(
        v.object({
          streetAddress: v.pipe(
            v.string(),
            v.nonEmpty("streetAddress.required")
          ),
          postcode: v.optional(v.string()),
          city: v.pipe(v.string(), v.nonEmpty("city.required")),
          country: v.pipe(v.string(), v.nonEmpty("country.required")),
        }),
        v.forward(
          v.partialCheck(
            [
              ["personalInformation.address.postcode"],
              ["personalInformation.address.country"],
            ],
            (address) => {
              if (
                address.country === "United States" &&
                isEmpty(address.postcode)
              ) {
                return false;
              }
              return true;
            },
            "postcode.required"
          ),
          ["postcode"]
        )
      ),
      dateOfBirth: v.object({
        day: v.pipe(v.string(), v.nonEmpty("day.required")),
        month: v.pipe(v.string(), v.nonEmpty("month.required")),
        year: v.pipe(v.string(), v.nonEmpty("year.required")),
      }),
      phone: v.object({
        home: v.pipe(
          v.string(),
          v.regex(phoneNumberRegex, "phoneNumber.invalid")
        ),
        mobile: v.pipe(
          v.string(),
          v.regex(phoneNumberRegex, "phoneNumber.invalid")
        ),
      }),
    }),
    education: v.object({
      highSchool: v.object({
        name: v.pipe(v.string(), v.nonEmpty("highSchoolName.required")),
        location: v.pipe(v.string(), v.nonEmpty("highSchoolLocation.required")),
      }),
      university: v.object({
        name: v.pipe(v.string(), v.nonEmpty("universityName.required")),
        location: v.pipe(v.string(), v.nonEmpty("universityLocation.required")),
      }),
    }),
    skills: v.pipe(
      v.array(
        v.object({
          name: v.pipe(v.string(), v.nonEmpty("skillName.required")),
          level: v.pipe(
            v.picklist(
              ["Beginner", "Intermediate", "Advanced"],
              "skillLevel.invalid"
            ),
            v.nonEmpty("skillLevel.invalid")
          ),
        })
      ),
      v.minLength(3, "skills.atLeastThree")
    ),
    agreement: v.optional(
      v.pipe(v.boolean(), v.literal(true, "agreement.required"))
    ),
    signature: v.pipe(v.string(), v.nonEmpty("signature.required")),
  })
);

const validationSchema = computed(() => {
  switch (schema.value) {
    case "zod":
      return zodSchema;
    case "yup":
      return yupSchema;
    case "valibot":
      return valibotSchema;
  }
});

const { handleSubmit, errors, resetForm, values } = useForm({
  validationSchema,
  initialValues,
});

const localizedErrors = computed(() => {
  const output = {};
  // If there are no errors, return an empty object
  if (Object.keys(errors.value).length === 0) {
    return output;
  }

  Object.entries(errors.value).forEach(([formPath, message]) => {
    output[formPath] = t(schema.value + "." + message, {
      ns: "applicationForm",
    });
  });

  return output;
});

const onSubmit = handleSubmit((values, actions) => {
  actions.resetForm();
});

i18next.on("languageChanged", () => {
  resetForm();
});

watch(schema, () => {
  resetForm();

  console.log(
    validationSchema.value.describe("personalInformation.address.postcode")
  );
});

watch(
  values,
  () => {
    console.log(
      validationSchema.value.describe("personalInformation.address.postcode")
    );
  },
  {
    deep: true,
  }
);
</script>

<style scoped></style>
