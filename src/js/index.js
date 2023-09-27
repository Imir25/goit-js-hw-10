import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('#breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

const slim = new SlimSelect(breedSelect, {
  placeholder: 'Select a breed',
  onChange: (values) => {
    if (values.length > 0) {
      const breedId = values[0].value; 
      fetchCatByBreed(breedId)
        .then((cat) => renderCat(cat))
        .catch((error) => {
          Notiflix.Notify.failure('Oops! Something went wrong. Try reloading the page.');
        });
    }
  },
});

window.onload = () => {
  
  loader.classList.remove('is-hidden');

  fetchBreeds()
    .then((breeds) => {
      const options = breeds.map((breed) => ({
        text: breed.name,
        value: breed.id,
      }));
      slim.setData(options);
      breedSelect.classList.remove('is-hidden');
      loader.classList.add('is-hidden');
    })
    .catch((error) => {
      Notiflix.Notify.failure('Oops! Something went wrong. Try reloading the page.');
      breedSelect.classList.remove('is-hidden');
      loader.classList.add('is-hidden');
    });
};

function renderCat(cat) {
  const breed = cat.breeds[0];
  const markup = `
    <img class='cat-img' src='${cat.url}' width='460px'>
    <div class='cat-wrapper'>
      <h1 class='cat-header'>${breed.name}</h1>
      <p class='cat-desc'>${breed.description}</p>
      <p class='cat-temp'><b>Temperament: </b>${breed.temperament}</p>
    </div>`;
  catInfo.innerHTML = markup;
}