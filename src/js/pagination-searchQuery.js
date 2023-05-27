import Pagination from 'tui-pagination';
import '../sass/layout/_pagination.scss';
import MoviesApi from '../js/api-requests';
const movies = new MoviesApi();
import moviesMarkUp from '../js/movies-grid';
import getRefs from '../js/get-refs';

const refs = getRefs();

export default function createPagination(total_results, searchQuery) {
  const container = document.getElementById('tui-pagination-container');
  const options = {
    totalItems: total_results,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  const mediaQuery = window.matchMedia('(max-width: 768px)');
  mediaQuery.addEventListener('change', handleMobileChange);
  function handleMobileChange(e) {
    if (e.matches) {
      options.visiblePages = 3;
    }
  }
  handleMobileChange(mediaQuery);

  const pagination = new Pagination(container, options);

  pagination.off('afterMove', function (eventData) {
    refs.gallery.innerHTML = '';
    movies.page = eventData.page;
    movies.getPopularMovies().then(response => {
      moviesMarkUp(response.data.results);
    });
  });

  pagination.on('afterMove', function (eventData) {
    movies.page = eventData.page;
    refs.gallery.innerHTML = '';
    movies.query = searchQuery;
    movies.getSearchMovies().then(response => {
      moviesMarkUp(response.data.results);
    });
  });
}
