import { API_KEY, SEARCH_URL, ID_URL } from '.js/.api/.api.js';
import axios from 'axios';
//const SEARCH_URL = '${BASE_URL}/search/movi';
//1.Function declaration
//async function foo() {
// ...
//}
//getMov(SEARCH_URL);
//пошук фільмів
//async function getMov() {

//}
/*language;query,page,include_adult,region,year,primary_release_year
https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false*/
//відображення фільмів
///function showMov(){}

//2.
async function fetchMovieSearcher(text, page) {
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
}

/*function renderMovieSearcher(cards) {
  return cards.map(
    ({
      // властивості
      language,
      query,
      page,
      include_adult,
      region,
      year,
      primary_release_year,
    }) => {
    //from heder
      return `<div class="search-wrapper">
      <form class="header__search-form" action="GET">
        <div class="input-wrapper">
          <input
            class="header__input"
            type="text"
            name="query"
            placeholder="Movie search"
          />
          <button class="header__btn" type="submit" aria-label="search">
            <svg class="header__search-logo" width="16" height="16">
              <use href="./images/icons/symbol-defs.svg#icon-search"></use>
            </svg>
          </button>
        </div>
      </form>
    `;
    }
  );
}*/
