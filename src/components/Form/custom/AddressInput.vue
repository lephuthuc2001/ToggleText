<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <BaseTextareaInput
            :label="$t('streetAddress', { ns: 'applicationForm' })"
            name="street-address"
            :formPath="streetAddressFormPath"
            :errorMessage="streetAddressErrorMessage"
          ></BaseTextareaInput>
        </v-col>
        <v-col>
          <BaseTextInput
            :label="$t('postcode', { ns: 'applicationForm' })"
            name="postcode"
            :formPath="postCodeFormPath"
            :errorMessage="postCodeErrorMessage ?? postcodeCustomError"
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
            :formPath="cityFormPath"
            :errorMessage="cityErrorMessage"
          ></BaseSelectInput>
        </v-col>
        <v-col>
          <BaseSelectInput
            :label="$t('country', { ns: 'applicationForm' })"
            name="country"
            :items="countries"
            :formPath="countryFormPath"
            :errorMessage="countryErrorMessage"
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
import { useField, useFieldValue } from "vee-validate";
import { isEmpty } from "lodash";

// Local imports
import LocationService from "../../../services/LocationService";
import BaseTextInput from "../base/BaseTextInput.vue";
import BaseSelectInput from "../base/BaseSelectInput.vue";
import BaseTextareaInput from "../base/BaseTextareaInput.vue";

// Props
const props = defineProps({
  formPath: {
    type: String,
    required: true,
  },
  localizedErrors: {
    type: Object,
    default: () => ({}),
  },
});

// Form paths
const streetAddressFormPath = `${props.formPath}.streetAddress`;
const postCodeFormPath = `${props.formPath}.postcode`;
const cityFormPath = `${props.formPath}.city`;
const countryFormPath = `${props.formPath}.country`;

// Error messages
const streetAddressErrorMessage = computed(
  () => props.localizedErrors[streetAddressFormPath]
);
const postCodeErrorMessage = computed(
  () => props.localizedErrors[postCodeFormPath]
);
const cityErrorMessage = computed(() => props.localizedErrors[cityFormPath]);
const countryErrorMessage = computed(
  () => props.localizedErrors[countryFormPath]
);

// Field values
const { value } = useField(() => props.formPath);
const curentCountry = useFieldValue(countryFormPath);
const currentPostcode = useFieldValue(postCodeFormPath);

// Custom error message for postcode
const postcodeCustomError = computed(() => {
  if (
    curentCountry.value === "United States" &&
    isEmpty(currentPostcode.value)
  ) {
    return props.localizedErrors[props.formPath];
  }
  return null;
});

// Country and city data
const countries = ref([]);
const isLoadingCountries = ref(false);
const cities = ref([]);
const isLoadingCities = ref(false);

// Fetch countries on mount
onMounted(async () => {
  isLoadingCountries.value = true;
  const countriesNameArray = await LocationService.getAllCountries();
  isLoadingCountries.value = false;
  countries.value = countriesNameArray;
});

// Watch for country changes to update cities
const country = computed(() => value.value.country);
watch(
  country,
  async (newCountry, oldCountry) => {
    if (newCountry === oldCountry) return;
    value.value.city = "";
    cities.value = [];
    isLoadingCities.value = true;
    const citiesArray = await LocationService.getStatesPerCountry(newCountry);
    cities.value = citiesArray;
    isLoadingCities.value = false;
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
