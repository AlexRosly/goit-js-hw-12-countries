export default function getRefs() {
    return {
        inputValue: document.getElementById('search-box'),
        countryInfo: document.querySelector('.country-info'),
        countryList: document.querySelector('.country-list')
    };
}
