import { getTrending } from '../api/api-service';
import { createGalleryMarkup } from '../gallery/galleryMarkupCards';

import { getMovieById } from '../api/api-service';

import nothing from '../../images/no_poster/nothing.wp.webp';
import { getMovieById } from '../api/api-service';
import refs from '../refs';

const modalEl = document.querySelector('.modal');
const addWatchedBtn = document.querySelector('.add-to-watched');
const libraryWatchedBtn = document.querySelector('.js-watched');
const galleryfilm = document.getElementById('films-main');
const libraryfilm = document.getElementById('films-library');
console.log(galleryfilm);
console.log(libraryfilm);

let movieId = null;

let watchedMoviesIds = setWatchedIds();

let watchedMoviesInfo = [];

console.log(watchedMoviesIds);

getTrending().then(data => {
  galleryfilm.insertAdjacentHTML(
    'beforeend',
    createGalleryMarkup(data.results)
  );
})
.then(() => {
  const allCards = document.querySelectorAll('.film__card');

  allCards.forEach(card => card.addEventListener('click', async () => {
    console.log(card.dataset.film);
    modalEl.style.display = 'block';


    movieId = card.dataset.film;
    const movieInfo = await getMovieById(movieId);

    const movieTitleContainer = modalEl.querySelector('.modal_title');
    movieTitleContainer.textContent = movieInfo.original_title;
    
  }));
});



/*Library Watched*/

addWatchedBtn.addEventListener('click', addToWatched);

function addToWatched() {
  modalEl.style.display = 'none';
  addToWatchedQueueLS(movieId);

  renderWatched();
};


function addToWatchedQueueLS(movieId) {
  if (checkIfWatched(movieId)) {
    watchedMoviesIds = watchedMoviesIds.filter(id => id !== movieId);
    
  } else {
    watchedMoviesIds.push(movieId);
  }

  localStorage.setItem('watched', JSON.stringify(watchedMoviesIds));
}

function checkIfWatched(movieId) {
  return watchedMoviesIds.includes(movieId);
}

libraryWatchedBtn.addEventListener('click', renderWatched);

async function renderWatched () {
    libraryfilm.innerHTML = '';
  
    if(watchedMoviesIds.length) {
      try {
        for (const id of watchedMoviesIds) {
          const movie = await getMovieById(id);
          watchedMoviesInfo.push(movie);
        }
  
        const layout = createGalleryMarkup(watchedMoviesInfo);
        libraryfilm.insertAdjacentHTML('beforeend', layout);
      } catch (error) {
        // error handling      
      }
  
      const allCards = libraryfilm.querySelectorAll('.film__card');
      allCards.forEach(card => card.addEventListener('click', async () => {
        modalEl.style.display = 'block';
        movieId = card.dataset.film;
  
        const movieInfo = await getMovieById(movieId);
  
        const movieTitleContainer = modalEl.querySelector('.modal_title');
        movieTitleContainer.textContent = movieInfo.original_title;
      }))
    } else {
      refs.libraryfilm.innerHTML = `
      <li class="nothing">
        <img src="${nothing}" alt="There's nothing to see here" />
      </li>`;
    refs.libraryfilm.classList.remove('films__container');
    return;
    }
  };

function setWatchedIds () {
  if (localStorage.getItem('watched')) {
    return JSON.parse(localStorage.getItem('watched'));
  } else {
    return [];
  }
}


/*Library Queue*/

addQueueBtn.addEventListener('click', addToQueue);

function addToQueue() {
  modalEl.style.display = 'none';
  addToQueueLS(movieId);

  renderQueue();
}

function addToQueueLS(movieId) {
  if (checkIfQueue(movieId)) {
    queueMoviesIds = queueMoviesIds.filter(id => id !== movieId);
  } else {
    queueMoviesIds.push(movieId);
  }

  localStorage.setItem('queue', JSON.stringify(queueMoviesIds));
}

function checkIfQueue(movieId) {
  return queueMoviesIds.includes(movieId);
}

libraryQueueHeaderBtn.addEventListener('click', renderQueue);

async function renderQueue() {
  libraryfilm.innerHTML = '';

  if (queueMoviesIds.length) {
    try {
      for (const id of queueMoviesIds) {
        const movie = await getMovieById(id);
        queueMoviesInfo.push(movie);
      }

      const layout = createGalleryMarkup(queueMoviesInfo);
      libraryfilm.insertAdjacentHTML('beforeend', layout);
    } catch (error) {
      // error handling
    }

    const allCards = libraryfilm.querySelectorAll('.film__card');
    allCards.forEach(card =>
      card.addEventListener('click', async () => {
        modalEl.style.display = 'block';
        movieId = card.dataset.film;

        const movieInfo = await getMovieById(movieId);

        const movieTitleContainer = modalEl.querySelector('.modal_title');
        movieTitleContainer.textContent = movieInfo.original_title;
      })
    );
  } else {
    libraryfilm.innerHTML = '<h2> No movies in queue </h2> ';
  }
}

function setQueueIds() {
  if (localStorage.getItem('queue')) {
    return JSON.parse(localStorage.getItem('queue'));
  } else {
    return [];
  }
}