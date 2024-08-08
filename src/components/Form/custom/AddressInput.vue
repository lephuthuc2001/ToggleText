<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <BaseTextareaInput
            :label="$t('streetAddress', { ns: 'applicationForm' })"
            name="street-address"
            :formPath="`${props.formPath}.streetAddress`"
          ></BaseTextareaInput>
        </v-col>
        <v-col>
          <BaseTextInput
            :label="$t('postcode', { ns: 'applicationForm' })"
            name="postcode"
            :formPath="`${props.formPath}.postcode`"
          ></BaseTextInput>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <BaseSelectInput
            :label="$t('city', { ns: 'applicationForm' })"
            name="city"
            :items="cities"
            :loading="isLoadingCities"
            :formPath="`${props.formPath}.city`"
          ></BaseSelectInput>
        </v-col>
        <v-col>
          <BaseSelectInput
            :label="$t('country', { ns: 'applicationForm' })"
            name="country"
            :items="countries"
            :formPath="`${props.formPath}.country`"
          ></BaseSelectInput>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
// Vue-related imports
import { ref, onMounted, watch, computed } from "vue";

// Library imports
import { useField } from "vee-validate";

// Local imports
import LocationService from "../../../services/LocationService";
import BaseTextInput from "../base/BaseTextInput.vue";
import BaseSelectInput from "../base/BaseSelectInput.vue";
import BaseTextareaInput from "../base/BaseTextareaInput.vue";

const props = defineProps({
  formPath: {
    type: String,
    required: true,
  },
});

const { value, errorMessage } = useField(() => props.formPath);

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

const country = computed(() => value.value.country);

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

    value.value.city = "";
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
