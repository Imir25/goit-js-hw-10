import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_rU5MAQmB1LUDVeZzfIfLqOQTHhQHPvO3Qy63y6V96adA3LA2XGUcqtnR9iG9bDUF';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.status);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => response.data[0])
    .then((cat) => {
      return axios
        .get(`https://api.thecatapi.com/v1/images/${cat.id}`)
        .then((response) => response.data);
    })
    .catch((error) => {
      throw new Error(error.response.status);
    });
}