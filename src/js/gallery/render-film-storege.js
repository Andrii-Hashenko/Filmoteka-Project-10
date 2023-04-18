import { createLibraryMarkup } from '../gallery/libraryMarkupCards';
import { getArrayofFilms } from '../api/api-service';
import { watched, queue } from './add-storege';
import refs from '../refs';
import nothing from '../../images/no_poster/nothing.wp.webp';

const btnWatched = document.querySelector('.js-watched');
const btnQueue = document.querySelector('.js-queue');

btnWatched.addEventListener('click', lookWatched);
btnQueue.addEventListener('click', lookQueue);

function lookWatched() {
  // if (!btnWatched.classList.contains('header-movie-button--active')) {
  //   btnWatched.classList.add('header-movie-button--active');
  //   btnWatched.disabled = true;
  //   btnQueue.classList.remove('header-movie-button--active');
  //   btnQueue.disabled = false;
  // }

  if (!watched.length) {
    refs.libraryfilm.innerHTML = `
      <li class="nothing">
        <img src="${nothing}" alt="There's nothing to see here" />
      </li>`;
    refs.libraryfilm.classList.remove('films__container');
    return;
  }
  getArrayofFilms(watched)
    .then(data => {
      refs.libraryfilm.innerHTML = createLibraryMarkup(data);
    })
    .catch(er => console.log(er));
}

function lookQueue() {
  // if (!btnQueue.classList.contains('header-movie-button--active')) {
  //   btnQueue.classList.add('header-movie-button--active');
  //   btnQueue.disabled = true;
  //   btnWatched.classList.remove('header-movie-button--active');
  //   btnWatched.disabled = false;
  // }

  if (!queue.length) {
    refs.libraryfilm.innerHTML = `
      <li class="nothing">
        <img src="${nothing}" alt="There's nothing to see here" />
      </li>`;
    return;
  }
  getArrayofFilms(queue).then(data => {
    refs.libraryfilm.innerHTML = createLibraryMarkup(data);
  });
}

lookWatched();
lookQueue();
