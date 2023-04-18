export default function getRefs() {
  return {
    homeEl: document.querySelector('.header__link-home'),
    libraryEl: document.querySelector('.header__link-library'),
    headerEl: document.querySelector('.header'),
    searchEl: document.querySelector('.header__search-form'),
    btnsEl: document.querySelector('.header__user-links-wrapper'),
    watchedEl: document.querySelector('.js-watched'),
    queueEl: document.querySelector('.js-queue'),
    galleryfilm: document.querySelector('.list-films-js'),
    libraryfilm: document.querySelector('#films-library'),

    //   примеры

    //   btnAddWatched: document.querySelector(''),
    //   btnAddQueue: document.querySelector(''),

    //   search: document.querySelector(''),
    //   searchItem: document.querySelector(''),
    //   searchInput: document.querySelector(''),
    //   pagination: document.querySelector(''),
  };
}
