import { getTrending } from '.src/.js/.api-service';
const searchForm = (document.querySelector('.header__search-form').innerHTML =
  ' ');

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
  if (event.target.firstElementChild.value === ' ') return;
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
