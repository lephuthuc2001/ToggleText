<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <v-textarea
            v-model="model.streetAddress"
            :label="$t('streetAddress', { ns: 'applicationForm' })"
            name="street-address"
            auto-grow
          ></v-textarea>
        </v-col>
        <v-col>
          <v-text-field
            v-model="model.postcode"
            :label="$t('postcode', { ns: 'applicationForm' })"
            name="postcode"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-autocomplete
            v-model="model.city"
            :label="$t('city', { ns: 'applicationForm' })"
            name="city"
            :items="cities"
            :loading="isLoadingCities"
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete
            v-model="model.country"
            :label="$t('country', { ns: 'applicationForm' })"
            name="country"
            :items="countries"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import { defineModel, ref, onMounted, watch, toRef, computed } from "vue";
import LocationService from "../../services/LocationService";
const model = defineModel({
  required: true,
  type: Object,
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

const country = computed(() => model.value.country);

watch(
  country,
  (newCountry, oldCountry) => {
    console.log({
      newCountry,
      oldCountry,
    });
    if (newCountry === oldCountry) {
      return;
    }

    model.value.city = "";
    cities.value = [];
    isLoadingCities.value = true;
    LocationService.getStatesPerCountry(newCountry).then((citiesArray) => {
      console.log("citiesArray", citiesArray);
      cities.value = citiesArray;
      isLoadingCities.value = false;
    });
  },
  {
    deep: true,
  }
);
</script>

<style lang="scss" scoped></style>
