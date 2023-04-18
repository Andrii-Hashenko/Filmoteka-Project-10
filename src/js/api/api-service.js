import axios from 'axios';
import { API_KEY, BASE_URL, TREND_URL, SEARCH_URL, ID_URL } from './api';

export default {
  async getTrendData(page) {
    try {
      const { data } = await axios.get(
        `${TREND_URL}?api_key=${API_KEY}&page=${page}`
      );
      return data;
    } catch (error) {
      console.error('Smth wrong with api get full trends' + error);
    }
  },
};

export async function getTrending(page = 1) {
  const url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=en-US&page=${page}`;
  return await axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}

async function fetchMovieSearcher(text, page) {
  try {
    const { data } = await axios.get(
      `${SEARCH_URL}?api_key=${API_KEY}&language=en-US&query=${text}&page=${page}`
    );
    return data;
  } catch (error) {
    console.error('Smth wrong with api search fetch' + error);
  }
}

async function getMovieById(id) {
  try {
    const { data } = await axios.get(
      `${ID_URL}${id}?api_key=${API_KEY}&language=en-US`
    );
    const result = {};
  } catch (error) {
    console.error('Smth wrong with api ID fetch' + error);
  }
}

export async function getArrayofFilms(array) {
  const arrayOfFilms = array.map(async id => {
    return await axios
      .get(`${ID_URL}/${id}?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        return response.data;
      })
      .catch(error => console.log(error));
  });

  const resultData = await Promise.all(arrayOfFilms);
  return resultData;
}
