import { getTrending } from '../api/api-service';
import { createGalleryMarkup } from '../gallery/galleryMarkupCards';
import { genresGalleryFormatModal } from './formatGenres';

import { getMovieById } from '../api/api-service';

import nothing from '../../images/no_poster/nothing.wp.webp';

import { getMovieById } from '../api/api-service';
import refs from '../refs';

const modalEl = document.querySelector('.modal');
const addWatchedBtn = document.querySelector('.add-to-watched');

const libraryWatchedHeaderBtn = document.querySelector('.js-watched');
const addQueueBtn = document.querySelector('.add-to-queue');
const libraryQueueHeaderBtn = document.querySelector('.js-queue');

const galleryfilm = document.getElementById('films-main');
const libraryfilm = document.getElementById('films-library');
console.log(galleryfilm);
console.log(libraryfilm);

let movieId = null;

let watchedMoviesIds = setWatchedIds();

let watchedMoviesInfo = [];
let queueMoviesIds = setQueueIds();


let queueMoviesInfo = [];

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
    document.body.classList.add('stop-scrolling');
    movieId = card.dataset.film;
    const movieInfo = await getMovieById(movieId);

    const movieTitleContainer = modalEl.querySelector('.modal_title');
    movieTitleContainer.textContent = movieInfo.original_title;


    modalEl.querySelector('.modal_image').src =
      `https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`;
    
    const movieVote = modalEl.querySelector('.vote');
    movieVote.textContent = `${movieInfo.vote_average} / ${movieInfo.vote_count}`;

    const moviePopularity = modalEl.querySelector('.popularity');
    moviePopularity.textContent = movieInfo.popularity;

    const movieOriginalTitle = modalEl.querySelector('.original-title');
    movieOriginalTitle.textContent = movieInfo.original_title;
    
    const genres = genresGalleryFormatModal(movieInfo.genres);
    const movieGenres = modalEl.querySelector('.genre');
    movieGenres.textContent = genres;

    const movieOverview = modalEl.querySelector('.modal_description');
    movieOverview.textContent = movieInfo.overview;

    // console.log(genresGalleryFormat(movieInfo.genre_ids));

  }));
});

const backdrop = document.querySelector('.modal__backdrop');
const closeBtn = document.querySelector('.modal__button');


closeBtn.addEventListener('click', closeModal);

function closeModal() {
  modalEl.style.display = 'none';
  document.body.classList.remove('stop-scrolling');
}

window.addEventListener('click', e => {
  if (e.target === backdrop) {
    closeModal();
  }
});



closeBtn.addEventListener('click', closeModal);

function closeModal() {
  modalEl.style.display = 'none';
  document.body.classList.remove('stop-scrolling');
}

window.addEventListener('click', e => {
  if (e.target === backdrop) {
    closeModal();
  }
});


window.addEventListener('keydown', e => {
  if (e.keyCode === 27) {
    closeModal();
  }
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

       modalEl.querySelector(
         '.modal_image'
       ).src = `https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`;

       const movieVote = modalEl.querySelector('.vote');
       movieVote.textContent = `${movieInfo.vote_average} / ${movieInfo.vote_count}`;

       const moviePopularity = modalEl.querySelector('.popularity');
       moviePopularity.textContent = movieInfo.popularity;

       const movieOriginalTitle = modalEl.querySelector('.original-title');
       movieOriginalTitle.textContent = movieInfo.original_title;

       const genres = genresGalleryFormatModal(movieInfo.genre_ids);
       const movieGenres = modalEl.querySelector('.genre');
       movieGenres.textContent = genres;

       const movieOverview = modalEl.querySelector('.modal_description');
       movieOverview.textContent = movieInfo.overview;
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



        const movieTitleContainer = modalEl.querySelector('.modal_title');
        movieTitleContainer.textContent = movieInfo.original_title;
      })
    );
  } else {
    libraryfilm.innerHTML = '<h2> No movies in queue </h2> ';
  }
}

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


function setQueueIds() {
  if (localStorage.getItem('queue')) {
    return JSON.parse(localStorage.getItem('queue'));
  } else {
    return [];
  }
}

// getTrending().then(data => {
//   refs.galleryfilm.insertAdjacentHTML(
//     'beforeend',
//     createGalleryMarkup(data.results)
//   );
// });

