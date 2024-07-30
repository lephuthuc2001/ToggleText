async function getAllCountries() {
  const baseUrl = "https://countriesnow.space/api/v0.1/countries/iso";

  try {
    const response = await fetch(baseUrl);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const countries = data.data.map(({ name }) => {
      return name;
    });

    return countries;
  } catch (error) {
    console.error(error);
  }
}

async function getStatesPerCountry(countryCode) {
  const baseUrl = `https://countriesnow.space/api/v0.1/countries/states`;

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country: countryCode }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const states = data.data.states.map(({ name }) => {
      return name;
    });

    return states;
  } catch (error) {
    console.error(error);
  }
}

export default {
  getAllCountries,
  getStatesPerCountry,
};
