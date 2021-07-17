
const BASE_URL = `https://restcountries.eu/rest/v2`;
const SEARCH_PARAMS = `fields=name;capital;population;flag;languages`

function fetchCountries(name) {
    const url = `${BASE_URL}/name/${name}?${SEARCH_PARAMS}`;
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });

}

export default { fetchCountries };

