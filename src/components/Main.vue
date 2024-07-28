<template>
  <v-container xl tag="form">
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
            <v-text-field label="First Name" outlined></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Last Name" outlined></v-text-field>
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
            <v-textarea label="Street Address" outlined></v-textarea>
          </v-col>
          <v-col cols="5">
            <v-row>
              <v-col> DATE OF BIRTH </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-autocomplete
                  label="Day"
                  :items="Array.from({ length: 30 }, (_, i) => i + 1)"
                ></v-autocomplete
              ></v-col>
              <v-col>
                <v-autocomplete
                  label="Month"
                  :items="Array.from({ length: 12 }, (_, i) => i + 1)"
                ></v-autocomplete>
              </v-col>
              <v-col>
                <v-autocomplete
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
            <v-text-field label="City" outlined></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Postal Code" outlined></v-text-field>
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
            <v-text-field label="Home" outlined></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Mobile" outlined></v-text-field>
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
            <v-text-field label="Name" outlined></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="City" outlined></v-text-field>
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
            <v-text-field label="Name" outlined></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="City" outlined></v-text-field>
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
    <v-row v-for="index in numbersOfSkills" :key="index">
      <v-col cols="7">
        <v-text-field label="Skill" outlined></v-text-field>
      </v-col>
      <v-col cols="5">
        <v-autocomplete
          label="Level"
          :items="['Beginner', 'Intermediate', 'Advanced']"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-checkbox
          label="I certify that all answers given herin are true and complate to my best of my knowledge. I authorize investigation of all statements contained in this application for employment as may be necessary in arriving at an employment decision."
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet
          height="150"
          color="blue-grey-lighten-5
"
        >
          Name & Signature
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet
          height="150"
          color="blue-grey-lighten-5
"
        >
          Date
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet
          height="150"
          color="blue-grey-lighten-5
"
        >
          Approval
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const numbersOfSkills = ref(3);
</script>

<style scoped></style>
