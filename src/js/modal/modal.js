'use strict';

const addWatchedBtn = document.querySelector('.add-to-watched');
const addQueueBtn = document.querySelector('.add-to-queue');

addWatchedBtn.addEventListener('click', () => {
});

const galleryfilm = document.querySelector('.list-films-js');


allCards.addEventListener('click', createModalMarkup);

const modalEl = document.querySelector('.modal');


/*Для редактирования*/

getMovieById(filmId).then(data => {
    modalEl.insertAdjacentHTML('beforeend', createModalMarkup(data.results));
    
    const btnClose = document.querySelector('.modal__button');
    btnClose.addEventListener('click', () => closeModal());
});

function genresGalleryFormatFull(array) {
  const genreResult = genresList
    .filter(element => Array.isArray(array) && array.includes(element.id))
    .map(element => element.name);
  return genreResult.join(', ');
}

export function createModalMarkup(films) {
  modalEl.classList.add('modal--show');
  document.body.classList.add('stop-scrolling');
  return films
    .map(film => {
      const genres = genresGalleryFormatFull(film.genre_ids);

      // const poster = film.poster_path
      //   ? https://image.tmdb.org/t/p/w500/${film.poster_path}
      //   : no_poster;

      return `<div id="modal" class="modal">
  <!-- <div class="modal__backdrop"></div> -->
  <button class="modal__button">
    <svg width="30px" height="30px" class="modal__cross">
      <use href="./images/close.svg"></use>
    </svg>
  </button>
  <div class="image__descr">
    <img class="modal_image" src="${poster}" alt="${film.title ?? film.name}" />
  </div>
  <div class="image__descr">
    <h1 class="modal_title">${film.title ?? film.name}</h1>
    <ul class="properties_storage">
      <li class="modal_documentation documentation_text">
        <h2 class="properties">Vote / Votes</h2>
      </li>
      <li class="modal_documentation documentation_text">
        <h2 class="properties">Popularity</h2>
      </li>
      <li class="modal_documentation documentation_text">
        <h2 class="properties">Original Title</h2>
      </li>
      <li class="modal_documentation documentation_text">
        <h2 class="properties">Genre</h2>
      </li>
    </ul>
    <ul class="properties_storage">
      <li class="modal_documentation documentation_value">
        <span class="properties_value">${film.vote_average}+"/"+${
        film.vote_count
      }</span>
      </li>
      <li class="modal_documentation documentation_value">
        <span class="properties_value">${film.popularity}</span>
      </li>
      <li class="modal_documentation documentation_value">
        <span class="properties_value">${film.original_title}</span>
      </li>
      <li class="modal_documentation documentation_value">
        <span class="properties_value">${genres}</span>
      </li>
    </ul>
    <h2 class="modal_about_title">About</h2>
    <p class="modal_description">
      ${film.overview}
    </p>
    <div class="modal_buttons">
      <button class="modal_watched">add to Watched</button>
      <button class="modal_queue">add to queue</button>
    </div>
  </div>
</div>`;
    })
    .join('');
}

function closeModal() {
  modalEl.classList.remove('modal--show');
  document.body.classList.remove('stop-scrolling');
  allCards.removeEventListener('click', createModalMarkup);
}

window.addEventListener('click', e => {
  if (e.target === modalEl) {
    closeModal();
  }
});

window.addEventListener('keydown', e => {
  if (e.keyCode === 27) {
    closeModal();
  }
});