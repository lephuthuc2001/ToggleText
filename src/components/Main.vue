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
                :error-messages="errors['personalInfomation.name.firstName']"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="lastName"
                name="lastName"
                :label="$t('lastName', { ns: 'applicationForm' })"
                :error-messages="errors['personalInfomation.name.lastName']"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <h2>Address</h2>
        </v-col>
        <v-col cols="10">
          <v-row>
            <v-col cols="7">
              <v-textarea
                v-model="streetAddress"
                label="Street Address"
                name="streetAddress"
                :error-messages="
                  errors['personalInfomation.address.streetAddress']
                "
                outlined
              ></v-textarea>
            </v-col>
            <v-col cols="5">
              <v-row>
                <v-col> DATE OF BIRTH </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-alert
                    v-if="errors['personalInfomation.dateOfBirth']"
                    :text="errors['personalInfomation.dateOfBirth']"
                    type="error"
                    variant="outlined"
                    density="compact"
                  ></v-alert>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-autocomplete
                    v-model="day"
                    label="Day"
                    :items="Array.from({ length: 30 }, (_, i) => i + 1)"
                    name="day"
                    :error-messages="
                      errors['personalInfomation.dateOfBirth.day']
                    "
                  ></v-autocomplete
                ></v-col>
                <v-col>
                  <v-autocomplete
                    v-model="month"
                    label="Month"
                    :items="Array.from({ length: 12 }, (_, i) => i + 1)"
                    name="month"
                    :error-messages="
                      errors['personalInfomation.dateOfBirth.month']
                    "
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <v-autocomplete
                    v-model="year"
                    label="Year"
                    name="year"
                    :items="
                      Array.from(
                        { length: 100 },
                        (_, i) => new Date().getFullYear() - 100 + i
                      )
                    "
                    :error-messages="
                      errors['personalInfomation.dateOfBirth.year']
                    "
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete
                v-model="country"
                label="Country"
                name="country"
                :items="countries"
                :loading="isLoadingCountries"
                outlined
                :error-messages="errors['personalInfomation.address.country']"
              ></v-autocomplete>
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="city"
                label="City"
                name="city"
                outlined
                aria-disabled="true"
                :items="cities"
                :loading="isLoadingCities"
                :error-messages="errors['personalInfomation.address.city']"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <h2>Phone</h2>
        </v-col>
        <v-col cols="10">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="homePhone"
                label="Home"
                outlined
                :error-messages="errors['personalInfomation.phone.home']"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="mobilePhone"
                label="Mobile"
                outlined
                :error-messages="errors['personalInfomation.phone.mobile']"
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
            EDUCATION
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <h2>High School</h2>
        </v-col>
        <v-col cols="10">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="highSchoolName"
                label="Name"
                outlined
                :error-messages="errors['education.highSchool.name']"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="highSchoolCity"
                label="City"
                outlined
                :error-messages="errors['education.highSchool.city']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <h2>University</h2>
        </v-col>
        <v-col cols="10">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="universityName"
                label="Name"
                outlined
                :error-messages="errors['education.university.name']"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="universityCity"
                label="City"
                outlined
                :error-messages="errors['education.university.city']"
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
            Skills
          </h1>
        </v-col>
        <v-col cols="5">
          <h1
            class="opacity-40 text-center text-2xl bg-sky-800 text-white font-semibold uppercase py-2"
          >
            Levels
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-alert
            v-if="errors['skills']"
            :text="errors['skills']"
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
            label="Skill"
            outlined
            :error-messages="errors[`skills[${idx}].name`]"
          ></v-text-field>
        </v-col>
        <v-col cols="5">
          <v-autocomplete
            v-model="field.value.level"
            label="Level"
            :items="['Beginner', 'Intermediate', 'Advanced']"
            outlined
            :error-messages="errors[`skills[${idx}].level`]"
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
            :error-messages="errors['agreement']"
            label="I certify that all answers given herin are true and complate to my best of my knowledge. I authorize investigation of all statements contained in this application for employment as may be necessary in arriving at an employment decision."
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1 class="mb-2">Name and Signature</h1>
          <v-alert
            v-if="errors['signature']"
            :text="errors['signature']"
            type="error"
            variant="outlined"
            density="compact"
          ></v-alert>
          <canvas v-signature></canvas>

          <v-btn aria-label="Clear" @click="clearSignature">Clear</v-btn>
        </v-col>
        <v-col>
          <v-sheet height="150" color="blue-grey-lighten-5l"> Date </v-sheet>
        </v-col>
        <v-col>
          <v-sheet height="150" color="blue-grey-lighten-5"> Approval </v-sheet>
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
            >Submit</v-btn
          >
        </v-col>
      </v-row>
      errors: {{ errors }}
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
      city: "",
    },
    university: {
      name: "",
      city: "",
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

const phoneNumberRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;

const isOlderThan18 = (value) => {
  const { day, month, year } = value;
  if (!day || !month || !year) {
    return true; // Skip validation if any of the fields are missing
  }
  const today = new Date();
  const birthDate = new Date(year, month - 1, day); // month is 0-indexed
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 18;
};

const schema = yup.object().shape({
  personalInfomation: yup.object().shape({
    name: yup.object().shape({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
    }),
    address: yup.object().shape({
      streetAddress: yup.string().required("Street address is required"),
      city: yup.string().required("City is required"),
      country: yup.string().required("Country is required"),
    }),
    dateOfBirth: yup
      .object()
      .shape({
        day: yup
          .number()
          .typeError("Day is required")
          .required("Day is required"),
        month: yup
          .number()
          .typeError("Month is required")
          .required("Month is required"),
        year: yup
          .number()
          .typeError("Year is required")
          .required("Year is required"),
      })
      .test(
        "is-older-than-18",
        "You must be at least 18 years old",
        isOlderThan18
      ),
    phone: yup.object().shape({
      home: yup
        .string()
        .matches(phoneNumberRegex, "Invalid phone number")
        .required("Home phone is required"),
      mobile: yup
        .string()
        .matches(phoneNumberRegex, "Invalid phone number")
        .required("Mobile phone is required"),
    }),
  }),
  education: yup.object().shape({
    highSchool: yup.object().shape({
      name: yup.string().required("High school name is required"),
      city: yup.string().required("High school city is required"),
    }),
    university: yup.object().shape({
      name: yup.string().required("University name is required"),
      city: yup.string().required("University city is required"),
    }),
  }),
  skills: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Skill name is required"),
        level: yup
          .string()
          .required("Skill level is required")
          .oneOf(
            ["Beginner", "Intermediate", "Advanced"],
            "Invalid skill level"
          ),
      })
    )
    .min(3, "You must have at least 3 skills"),
  agreement: yup.boolean().oneOf([true], "You must agree to the terms"),
  signature: yup.string().required("You must sign the application"),
});

const { handleSubmit, defineField, errors, setFieldValue, resetForm } = useForm(
  {
    validationSchema: toTypedSchema(schema),
    initialValues,
  }
);

const [firstName] = defineField("personalInfomation.name.firstName");
const [lastName] = defineField("personalInfomation.name.lastName");

const [streetAddress] = defineField("personalInfomation.address.streetAddress");
const [city] = defineField("personalInfomation.address.city");
const [country] = defineField("personalInfomation.address.country");

const [day] = defineField("personalInfomation.dateOfBirth.day");
const [month] = defineField("personalInfomation.dateOfBirth.month");
const [year] = defineField("personalInfomation.dateOfBirth.year");

const [homePhone] = defineField("personalInfomation.phone.home");
const [mobilePhone] = defineField("personalInfomation.phone.mobile");

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values));

  console.log(values);
  resetForm();
});

const [highSchoolName] = defineField("education.highSchool.name");
const [highSchoolCity] = defineField("education.highSchool.city");

const [universityName] = defineField("education.university.name");
const [universityCity] = defineField("education.university.city");

const [isAgreed] = defineField("agreement");

const [signature] = defineField("signature");

const { fields, push, remove } = useFieldArray("skills");

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
