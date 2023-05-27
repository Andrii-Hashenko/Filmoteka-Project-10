export default function getRefs() {
  return {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    btnAddWatched: document.querySelector('.watched'),
    btnAddQueue: document.querySelector('.queue'),
    libraryPage: document.querySelector('.library-link'),
    btnSectionInLibrary: document.querySelector('.btn-section'),
    homePage: document.querySelector('.home-link'),
    headerByClass: document.querySelector('.header'),
    headerByTeg: document.querySelector('header'),
    search: document.querySelector('.search-list'),
    searchItem: document.querySelector('.search-item'),
    searchInput: document.querySelector('.search_input'),
    pagination: document.querySelector('.tui-pagination'),
    // Authorization
    openSignInModalBtn: document.querySelector('#openSignInModalBtn'),
    logoutBtn: document.querySelector('#logoutBtn'),
    userDetails: document.querySelector('#userDetails'),
    // End of authorization
    slider: document.querySelector('.slider'),
    sliderContainer: document.querySelector('.slider-container'),
    // кнопка наверх
    goUpBtn: document.querySelector('.go-up'),
    //loader
    maskLoader: document.querySelector('.mask'),
    prevSliderBtn: document.querySelector('.tns-controls button[data-controls="prev"]'),
    nextSliderBtn: document.querySelector('button[data-controls="next"]'),
  };
}
