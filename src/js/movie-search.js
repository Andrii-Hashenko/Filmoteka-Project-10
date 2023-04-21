// це я закоментувала
// import { getTrending, fetchMovieSearcher } from './api/api-service';
// const searchForm = document.querySelector('.header__search-form');

// console.log(searchForm, 'search form');
// searchForm.addEventListener('submit', onSearchingMov);

//пошук фільмів
// додала з galleryMarkupCards.js
import { genresGalleryFormat } from './formatGenres';
import no_poster from '../../images/no_poster/no_poster.wp.webp';

// додала з api.js
const API_KEY = '900c3c2e823d6abe3929dac959f94e63';
const BASE_URL = 'https://api.themoviedb.org/3';
const TREND_URL = `${BASE_URL}/trending/all/day`;
const SEARCH_URL = `${BASE_URL}/search/movie`;
const ID_URL = `${BASE_URL}/movie`;
// https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
// const url = `search/movie?query=${this.#searchQuery}&page=${this.#page}&language=${lang}`;

// додала з refs.js додатково внесла inputEl
const refs = {
  homeEl: document.querySelector('.header__link-home'),
  libraryEl: document.querySelector('.header__link-library'),
  headerEl: document.querySelector('.header'),
  searchEl: document.querySelector('.header__search-form'),
  inputEl: document.querySelector('.header__input'),
  btnsEl: document.querySelector('.header__user-links-wrapper'),
  libraryWatchedHeaderBtn: document.querySelector('.js-watched'),
  libraryQueueHeaderBtn: document.querySelector('.js-queue'),
  galleryfilm: document.querySelector('#films-main'),
  libraryfilm: document.querySelector('#films-library'),
};

getTrending(TREND_URL);

// додала з spi-service.js
async function getTrending(page = 1) {
  const url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=en-US&page=${page}`;
  return await axios
    .get(url)
    .then(response => {
    return response.data;
    })
    .catch(error => console.log(error));
}



async function fetchMovieSearcher(text, page = 1){
  try {
    const { data } = await axios.get(
      `${SEARCH_URL}?api_key=${API_KEY}&language=en-US&query=${text}&page=${page}`
    );
    showMovies(data);
    return data;
    
  } catch (error) {
    console.error('Smth wrong with api search fetch' + error);
  }
}



refs.searchEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const apiSearchUrl = `${SEARCH_URL}?api_key=${API_KEY}&language=en-US&query=${refs.searchEl.value}`;
  if (refs.searchEl.value) {
    fetchMovieSearcher(refs.searchEl.value, page = 1);

    refs.searchEl.value = "";
  }
});

// відображаєм результат пошуку
// function showMovies(data) {
  // const moviesEl = document.querySelector(".movies");
  
// Очищаем предыдущие фильмы
  // document.querySelector(".movies").innerHTML = "";
  // document.querySelector('#films-main').innerHTML = "";

  

  function showMovies(data) {
    const moviesEl = document.querySelector('#films-main');
    const genres = genresGalleryFormat(film.genre_ids);
    const filmDate = film.release_date ?? film.first_air_date ?? null;
    const filmYear = filmDate ? filmDate.slice(0, 4) : 'Unknown year';
  
    const poster = film.poster_path
          ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
          : no_poster;
  
  
    // Очищаем предыдущие фильмы
    document.querySelector('#films-main').innerHTML = "";
  
    data.films.forEach((movie) => {
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
          <div class="movie__cover-inner">
          <img
            src="${poster}"
            alt="${film.title ?? film.name}"
          />
          
        </div>
        <div class="movie__info">
          <div class="movie__title">${film.title ?? film.name}</div>
          <div class="movie__category">${genres} | ${filmYear}</div>
        </div>`;
      moviesEl.appendChild(movieEl);
    });
  }
  
  
  showMovies(respData);
  
// //пошук фільмів

// function onSearchingMov(event) {
//   event.preventDefault();
//   getTrending.searchQuery = event.target.firstElementChild.value;
//   if (event.target.firstElementChild.value === ' ') {
//     return;
//   }
// }
// //отримати фільми
// //function fetchMoviesKeyword()
// //відображення фільмів
// /*function showMov(cards)*/

//пошук фільмів

// це я закоментувала
// function onSearchingMov(event) {
//   event.preventDefault();
//   getTrending = event.target.firstElementChild.value;
//   if (event.target[0].value !== '') {
//     console.dir(event.target[0].value);

//     fetchMovieSearcher(event.target[0].value)
//       .then(console.log);

//     searchForm[0].value = '';
    
//   };
// }


//відображення фільмів
// export function fetchMoviesKeywords(keywords) {
//   return keywords.hits
//     .map(({ SEARCH_URL, searchForm, language }) => {
//       return `
//       < div class="search-wrapper" >
//       <form class="${searchForm}" action="${SEARCH_URL}">
//         <div class="input-wrapper">
//           <input
//             class="header__input"
//             type="${language}"
//             name="${keywords.name}"
//             placeholder="Movie search"
//           /> 
//         </div>
//         </div>`;
//     })
//     .join('');
// }
