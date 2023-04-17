import {
  API_KEY,
  SEARCH_URL,
  BASE_URL} from '.src/.api.js/.storage/.movie-search.js';
import axios from 'axios';

//const SEARCH_URL = '${BASE_URL}/search/movi';
//const url = `${SEARCH_URL}?api_key=${API_KEY}&query=${text}&page=${page}`;
const headerNav = document.querySelector('.header-nav');
const form = (document.querySelector('.header__search-form').innerHTML = ' ');
const inputWrapper = document.querySelector('.input-wrapper');
const input = document.querySelector('.header__input');

//const button = document.querySelector('.header__btn');

form.addEventListener('submit', searchingMov);
//let searchQuery = '';
//let currentPage = 1;

//searchingMov(SEARCH_URL);
//пошук фільмів
function searchingMov(event) {
  event.preventDefault();
  const searchValue = form.value.trim();
  if (!searchQuery === '') return;
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
