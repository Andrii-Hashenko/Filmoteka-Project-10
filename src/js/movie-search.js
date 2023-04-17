import { API_KEY, SEARCH_URL, BASE_URL } from '.src/.api.js/';
import { fetchMovieSearcher } from '.src/.api-service.js';
import axios from 'axios';

//const SEARCH_URL = '${BASE_URL}/search/movi';
//const url = `${SEARCH_URL}?api_key=${API_KEY}&query=${text}&page=${page}`;

const form = (document.querySelector('.header__search-form').innerHTML = ' ');
//const inputWrapper = document.querySelector('.input-wrapper');
//const input = document.querySelector('.header__input');

form.addEventListener('submit', onSearchingMov);
let searchQuery = '';
//let currentPage = 1;

//пошук фільмів
async function onSearchingMov(event) {
  event.preventDefault();
  try {
    fetchMovieSearcher.searchQuery =
      event.currentTarget.elements.searchQuery.value.trim();
    if (fetchMovieSearcher.searchQuery === '') return;
    const movies = await url.fetchMoviesKeyword();
    if (movies.length === 0)
      // renderFilms(movies);
      form.reset();
  } catch (error) {
    console.log(error);
  }
}
//отримати фільми
 function fetchMoviesKeyword() {
   const { data } = await axios(SEARCH_URL, {
      params: {
        api_key: API_KEY,
        query: this.searchQuery,
        language: this.language,
      },
    });
    return data.results;
  }
 
//відображення фільмів
/*function showMov(cards) {
  return cards.map(card => {
    const moviesEl = (document.querySelector('.search-wrapper').innerHTML = '');
    cards.films.forEach(movie => {
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `< div class="search-wrapper" >
      <form class="header__search-form" action="GET">
        <div class="input-wrapper">
          <input
            class="header__input"
            type="text"
            name="${card.name}"
            placeholder="Movie search"
          />
          <button class="header__btn" type="submit" aria-label="search">
            <svg class="header__search-logo" width="16" height="16">
              <use href="./images/icons/symbol-defs.svg#icon-search"></use>
            </svg>
          </button>
        </div>
      </form>`;
    });
  });
}*/

//function clearPage() {
//}
//2.
/*async function fetchMovieSearcher(text, page) {
  try {
    const { data } = await axios.get(
      `${SEARCH_URL}?api_key=${API_KEY}&query=${text}&page=${page}`
    );
    return data;
  } catch (error) {
    console.error('Smth wrong with api search fetch' + error);
  }
}

async function getMovieById(id) {
  try {
    const { data } = await axios.get(`${ID_URL}${id}?api_key=${API_KEY}`);
    const result = {};
  } catch (error) {
    console.error('Smth wrong with api ID fetch' + error);
  }

}*/
