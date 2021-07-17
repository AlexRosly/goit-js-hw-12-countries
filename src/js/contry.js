import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import countryCard from '../templates/country-card.hbs';
import countryListTm from '../templates/country-list.hbs';
import getRefs from './get-refs.js';
import API from './api-service.js';


const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.inputValue.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

function onSearch(e) {
    e.preventDefault();
    claerMarkup();

    const name = e.target.value;

    if (name === '') {
        return;
    }
       
   API.fetchCountries(name)
       .then(data => {
           if (data.length > 10) {
               Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
           } else if (data.length === 1) {
               renderCountryCard(data, countryCard);
            } else if (data.length >=2 && data.length <= 10) {
               renderCountryList(data, countryListTm);
            }
       })
       .catch(Error => {
           Notiflix.Notify.failure('Oops, there is no country with that name.');
       });
};

function claerMarkup() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
};

function renderCountryCard(country, template) {

    const markupCountryCard = template(country[0]);
    refs.countryInfo.insertAdjacentHTML('beforeend', markupCountryCard);
    findCountryLang (country);

}

function renderCountryList(countryes, template) {
       
    const markupCountryList = countryes.map(country => template(country)).join('');
    refs.countryList.insertAdjacentHTML('beforeend', markupCountryList);
};


function findCountryLang(data) {

    const arrayLanguages = data.flatMap((languages) => languages.languages);
    const makruplanguages = arrayLanguages.flatMap(data => data.name).join(', ');
    const paragraph = document.querySelector('.country-languages');
    paragraph.insertAdjacentHTML('beforeend', makruplanguages);
    
}