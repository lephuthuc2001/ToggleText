<template>
  <v-container tag="form" @submit.prevent="onSubmit">
    <v-row>
      <v-col>
        <h1 class="text-center text-sky-800 text-6xl uppercase font-bold">
          Job Application
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1
          class="text-center text-2xl bg-sky-800 text-white font-bold uppercase py-2"
        >
          PERSONAL INFORMATION
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <h2>Name</h2>
      </v-col>
      <v-col cols="10">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="firstName"
              label="First Name"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="lastName"
              label="Last Name"
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
              outlined
            ></v-textarea>
          </v-col>
          <v-col cols="5">
            <v-row>
              <v-col> DATE OF BIRTH </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-autocomplete
                  v-model="day"
                  label="Day"
                  :items="Array.from({ length: 30 }, (_, i) => i + 1)"
                ></v-autocomplete
              ></v-col>
              <v-col>
                <v-autocomplete
                  v-model="month"
                  label="Month"
                  :items="Array.from({ length: 12 }, (_, i) => i + 1)"
                ></v-autocomplete>
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="year"
                  label="Year"
                  :items="
                    Array.from(
                      { length: 100 },
                      (_, i) => new Date().getFullYear() - 100 + i
                    )
                  "
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="city" label="City" outlined></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="postalCode"
              label="Postal Code"
              outlined
            ></v-text-field>
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
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="mobilePhone"
              label="Mobile"
              outlined
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
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="highSchoolCity"
              label="City"
              outlined
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
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="universityCity"
              label="City"
              outlined
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
    <v-row v-for="(field, idx) in fields" :key="field.key">
      <v-col cols="5">
        <v-text-field
          v-model="field.value.name"
          label="Skill"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="5">
        <v-autocomplete
          v-model="field.value.level"
          label="Level"
          :items="['Beginner', 'Intermediate', 'Advanced']"
        ></v-autocomplete>
      </v-col>
      <v-col cols="2">
        <v-btn aria-label="Remove" @click="remove(idx)" color="red"
          >Remove</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn aria-label="Add" @click="push({ name: '', level: 'Beginner' })"
          >Add</v-btn
        >
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-checkbox
          v-model="isAgreed"
          label="I certify that all answers given herin are true and complate to my best of my knowledge. I authorize investigation of all statements contained in this application for employment as may be necessary in arriving at an employment decision."
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet height="150" color="blue-grey-lighten-5">
          Name & Signature
        </v-sheet>
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
</template>

<script setup>
import { ref } from "vue";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { useForm, useFieldArray, FieldArray } from "vee-validate";

const initialValues = {
  personalInfomation: {
    name: {
      firstName: "",
      lastName: "",
    },
    address: {
      streetAddress: "",
      city: "",
      postalCode: "",
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
};

const phoneNumberRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;

const schema = yup.object().shape({
  personalInfomation: yup.object().shape({
    name: yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
    }),
    address: yup.object().shape({
      streetAddress: yup.string().required(),
      city: yup.string().required(),
      postalCode: yup.string().required(),
    }),
    dateOfBirth: yup.object().shape({
      day: yup.number().required(),
      month: yup.number().required(),
      year: yup.number().required(),
    }),
    phone: yup.object().shape({
      home: yup.string().matches(phoneNumberRegex).required(),
      mobile: yup.string().matches(phoneNumberRegex).required(),
    }),
  }),
  education: yup.object().shape({
    highSchool: yup.object().shape({
      name: yup.string().required(),
      city: yup.string().required(),
    }),
    university: yup.object().shape({
      name: yup.string().required(),
      city: yup.string().required(),
    }),
  }),
  skills: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required(),
        level: yup.string().required(),
      })
    )
    .min(3),
  agreement: yup.boolean().required(),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues,
});

const [firstName] = defineField("personalInfomation.name.firstName");
const [lastName] = defineField("personalInfomation.name.lastName");

const [streetAddress] = defineField("personalInfomation.address.streetAddress");

const [day] = defineField("personalInfomation.dateOfBirth.day");
const [month] = defineField("personalInfomation.dateOfBirth.month");
const [year] = defineField("personalInfomation.dateOfBirth.year");

const [city] = defineField("personalInfomation.address.city");
const [postalCode] = defineField("personalInfomation.address.postalCode");

const [homePhone] = defineField("personalInfomation.phone.home");
const [mobilePhone] = defineField("personalInfomation.phone.mobile");

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values));

  console.log(values);
});

const [highSchoolName] = defineField("education.highSchool.name");
const [highSchoolCity] = defineField("education.highSchool.city");

const [universityName] = defineField("education.university.name");
const [universityCity] = defineField("education.university.city");

const [isAgreed] = defineField("agreement");

const { fields, push, remove } = useFieldArray("skills");

console.log(fields);
</script>

<style scoped></style>
