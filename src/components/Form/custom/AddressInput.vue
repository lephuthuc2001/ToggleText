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

const streetAddressFormPath = `${props.formPath}.streetAddress`;
const streetAddressErrorMessage = computed(() => {
  return props.localizedErrors[streetAddressFormPath];
});

const postCodeFormPath = `${props.formPath}.postcode`;
const postCodeErrorMessage = computed(() => {
  return props.localizedErrors[postCodeFormPath];
});

const cityFormPath = `${props.formPath}.city`;
const cityErrorMessage = computed(() => {
  return props.localizedErrors[cityFormPath];
});

const countryFormPath = `${props.formPath}.country`;
const countryErrorMessage = computed(() => {
  return props.localizedErrors[countryFormPath];
});

// if not USA => KHONG HIEN LEN
const { value, errorMessage } = useField(() => props.formPath);
const curentCountry = useFieldValue(countryFormPath);
const currentPostcode = useFieldValue(postCodeFormPath);

const postcodeCustomError = computed(function () {
  if (
    curentCountry.value === "United States" &&
    isEmpty(currentPostcode.value)
  ) {
    console.log(props.localizedErrors[props.formPath]);
    return props.localizedErrors[props.formPath];
  }
  return null;
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

const country = computed(() => value.value.country);

watch(
  country,
  (newCountry, oldCountry) => {
    if (newCountry === oldCountry) {
      return;
    }

    value.value.city = "";
    cities.value = [];
    isLoadingCities.value = true;
    LocationService.getStatesPerCountry(newCountry).then((citiesArray) => {
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
