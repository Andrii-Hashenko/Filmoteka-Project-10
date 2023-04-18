import './sass/index.scss';

import './js/gallery/render-film-cards';

import './js/modal/film-modal'

const movies = new MoviesApi();
const refs = getRefs();

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  refs.gallery.innerHTML = '';
  movies.query = searchQuery.value;
  movies.getSearchMovies().then(response => {
    console.log(response.data);
    moviesMarkUp(response.data.results);
    createPagination(response.data.total_results, searchQuery);
  });
  searchQuery.value = '';
}

onLoadPage();
