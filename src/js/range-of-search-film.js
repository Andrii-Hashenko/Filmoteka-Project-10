import MoviesApi from '../js/api-requests';
import debounce from 'debounce';
import getRefs from '../js/get-refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import moviesMarkUp from '../js/movies-grid';
import onLoadPage from '../js/onStart';
import '../sass/layout/_pagination.scss';
import createPagination from './pagination-searchQuery';
import { translateMsg } from './translate';
import messages from './languages/notiflix.json';

const noMovieFound = messages.apifilms.failure;

const movies = new MoviesApi();
const refs = getRefs();

refs.form.addEventListener('input', debounce(onInputRenderCard, 500));

function onInputRenderCard(e) {
  e.preventDefault();
  movies.resetPage();

  const searchInput1 = refs.searchInput.value;
  if (searchInput1 === '') {
    onLoadPage();
    return;
  }

  refs.gallery.innerHTML = '';

  displayResults(searchInput1, moviesMarkUp);
}

function displayResults(searchInput, callback) {
  movies.query = searchInput;

  movies.getSearchMovies().then(response => {
    createPagination(response.data.total_results, searchInput);
    if (response.data.results.length === 0) {
      Notify.failure(translateMsg(noMovieFound));
      return;
    }
    callback(response.data.results);
  });
}
// refs.form.addEventListener('input', debounce(onInput, 500));
// refs.form.addEventListener('input', removeHiddenClass);

// function onInput(e) {
//   e.preventDefault();

//   const searchInput = refs.searchInput.value;
//   if (searchInput === '') {
//     refs.search.innerHTML = '';
//     return;
//   }

//   displayResults(searchInput, renderFilmList);

//   refs.search.addEventListener('click', onClickOpenModalWindow);
// }

// function onClickOpenModalWindow(e) {
//   e.preventDefault();

//   movies.id = e.target.dataset.id;

//   movies.getMoviesById().then(response => {
//     movieDetailMarkUp(response.data);
//   });
// }

// function renderFilmList(films) {
//   if (films.length > 0) {
//     handleRangeOfResults(films.slice(0, 5));
//     return;
//   }
// }

// function handleRangeOfResults(films) {
//   refs.search.innerHTML = '';

//   const fill = films
//     .map(film => {
//       return `<li class="search-item" data-id=${film.id}>${film.title} (${ film.release_date.slice(0, 4) })</li>`;
//     })
//     .join('');

//   return refs.search.insertAdjacentHTML('beforeend', fill);
// }

// function removeHiddenClass(e) {
//   e.preventDefault();
//   const {
//     elements: { searchQuery },
//   } = e.currentTarget;

//   refs.search.classList.remove('is-hidden');

//   if (searchQuery.value === '') {
//     refs.search.classList.add('is-hidden');
//     return;
//   }
// }
