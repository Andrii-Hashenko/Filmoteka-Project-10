import { getTrending } from '.src/.js/.api-service';
const searchForm = (document.querySelector('.header__search-form').innerHTML =
  ' ');

searchForm.addEventListener('submit', onSearchingMov);

//пошук фільмів

function onSearchingMov(event) {
  event.preventDefault();
  getTrending.searchQuery = event.target.firstElementChild.value;
  if (event.target.firstElementChild.value === ' ') {
    return;
  }
}

//отримати фільми
//function fetchMoviesKeyword()

//відображення фільмів
/*function showMov(cards)*/
