import getRefs from '../js/get-refs';
import moviesMarkUp from './movies-grid';

const refs = getRefs();

const pageSwitcherRefs = {
  watchedBtnEl: document.querySelector('.btn-watched'),
  queueBtnEl: document.querySelector('.btn-queue'),
};

function loadFromLocaleStorage(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: Error');
  }
}

function processingData(category) {
  const dataFromLocStore = loadFromLocaleStorage(category);

  const dataVsGenresModify = dataFromLocStore.map(item => {
    item.genre_ids = item.genres.map(elem => elem.id);

    return item;
  });

  return dataVsGenresModify;
}

function resetAndRender(string) {
  refs.slider.innerHTML = '';
  refs.sliderContainer.innerHTML = '';
  refs.gallery.innerHTML = '';
  moviesMarkUp(processingData(string));
}

function onLibraryBtnActive() {
  onQueueBtnClick();
}

function onWatchedBtnClick() {
  resetAndRender('watched');

  pageSwitcherRefs.watchedBtnEl.classList.add('library-btn-active');
  pageSwitcherRefs.queueBtnEl.classList.remove('library-btn-active');
}

function onQueueBtnClick() {
  resetAndRender('queue');

  pageSwitcherRefs.queueBtnEl.classList.add('library-btn-active');
  pageSwitcherRefs.watchedBtnEl.classList.remove('library-btn-active');
}

refs.libraryPage.addEventListener('click', () => {
  onLibraryBtnActive();
});

pageSwitcherRefs.watchedBtnEl.addEventListener('click', () => {
  onWatchedBtnClick();
});

pageSwitcherRefs.queueBtnEl.addEventListener('click', () => {
  onQueueBtnClick();
});

function onModalBtnsRenderingPageFromPageSwitcher() {
  const active = {
    watched: pageSwitcherRefs.watchedBtnEl.classList.contains('library-btn-active'),
    queue: pageSwitcherRefs.queueBtnEl.classList.contains('library-btn-active'),
  };

  if (active.queue) {
    resetAndRender('queue');
  } else if (active.watched) {
    resetAndRender('watched');
  }
}
export { onModalBtnsRenderingPageFromPageSwitcher };
