import { getTrending, fetchMovieSearcher } from './api/api-service';
const searchForm = document.querySelector('.header__search-form');

console.log(searchForm, 'search form');
searchForm.addEventListener('submit', onSearchingMov);

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

function onSearchingMov(event) {
  event.preventDefault();
  getTrending = event.target.firstElementChild.value;
  if (event.target[0].value !== '') {
    console.dir(event.target[0].value);

    fetchMovieSearcher(event.target[0].value)
      .then(console.log);

    searchForm[0].value = '';
    
  };
}
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
