import createLibraryMarkup from '../gallery/libraryMarkupCards';
// import refs from '../sass/layouts/_header_library.scss';

export {
  libraryEl,
  watchedEl,
  queueEl,
  collectionList,
  myLibraryWatchedRender,
  myLibraryQueueRender,
};

const {
  homeEl,
  collectionList,
  libraryEl,
  headerEl,
  searchEl,
  btnsEl,
  navEl,
  watchedEl,
  queueEl,
  ...rest
} = refs;

libraryEl.addEventListener('click', onLibraryClick);
watchedEl.addEventListener('click', onWatchedClick);
queueEl.addEventListener('click', onQueueClick);

// Функция обработки события при нажатии на My Library
function onLibraryClick(e) {
  e.preventDefault();

  myLibraryWatchedRender(e);
  if (headerEl.classList.contains('js-library-bgi')) {
    return;
  }

  homeEl.classList.remove('navigation__link-home--current');
  headerEl.classList.add('js-library-bgi');
  headerEl.classList.remove('js-home-bgi');
  libraryEl.classList.add('navigation__link-home--current');
  searchEl.classList.remove('js-show');
  searchEl.classList.add('js-hide');
  btnsEl.classList.remove('js-hide');
  btnsEl.classList.add('js-show');
}

// Функция обработки события при нажатии на Watched
function onWatchedClick(e) {
  paginationLibElement.innerHTML = '';
  myLibraryWatchedRender(e);
  watchedEl.classList.add('button--orange');
  queueEl.classList.remove('button--orange');
}

// Функция обработки события при нажатии на Queue
function onQueueClick(e) {
  paginationLibElement.innerHTML = '';
  watchedEl.classList.remove('button--orange');
  queueEl.classList.add('button--orange');
  myLibraryQueueRender(e);
}

// Функция рендера библиотеки фильмов раздела Watched
function myLibraryWatchedRender(e) {
  e.preventDefault();
  collectionList.innerHTML = '';
  const watchedFilms = JSON.parse(localStorage.getItem('watched'));
  const watchedFilmsPage = sliceLibraryOnPage(watchedFilms);
  if (watchedFilms.length === 0) {
    collectionList.innerHTML =
      '<li class ="empty-my-library"><p class = "title-empty-my-library">You  have not watched films yet</p><img class="icon-empty-my-library" src="src\images\no_poster\nothing.webp" alt ="not films here"></img></li>';
    return;
  }
  renderFile(watchedFilmsPage[0]);

  if (watchedFilms.length > 20) {
    paginationLibElement.innerHTML = '';
    currentLibPage = 1;
    renderLibPag(watchedFilmsPage);
  }
}

// Функция рендера библиотеки фильмов раздела Queue
function myLibraryQueueRender(e) {
  e.preventDefault();
  collectionList.innerHTML = '';
  const queueFilms = JSON.parse(localStorage.getItem('queue'));
  const queueFilmsPage = sliceLibraryOnPage(queueFilms);
  if (queueFilms.length === 0) {
    collectionList.innerHTML =
      '<li class ="empty-my-library"><p class = "title-empty-my-library">You  have not watched films yet</p><img class="icon-empty-my-library" src="src\images\no_poster\nothing.webp" alt ="not films here"></img></li>';
    return;
  }
  renderFile(queueFilmsPage[0]);
  if (queueFilms.length > 20) {
    paginationLibElement.innerHTML = '';
    currentLibPage = 1;
    renderLibPag(queueFilmsPage);
  }
}

// функция рендера
function renderFile(results) {
  collectionList.innerHTML = render({ results });
}

/////////////////////////////////////////////////////////////////////////////////////

// Пагинация My Library

const paginationLibElement = document.getElementById('paginationLibrary');

// Функция разделющаяgj страницам массив фильмов из LocalStorage 
function sliceLibraryOnPage(value) {
  if (value === null) {
    return;
  }
  const groupSize = 20;
  const sliceArr = value
    .map(function (e, i) {
      return i % groupSize === 0 ? value.slice(i, i + groupSize) : null;
    })
    .filter(function (e) {
      return e;
    });
  return sliceArr;
}

let currentLibPage = 1;

// Функция рендера пагинации библиотеки
function renderLibPag(value) {
  const totalLibPages = value.length;
  renderLibPaginationBtn(value, totalLibPages);
  makeActiveLibBtn();
}

// Функция рендера кнопок пагинации библиотеки
function renderLibPaginationBtn(arrayPagination, totalLibPages) {
  const before = currentLibPage - 2;
  const after = currentLibPage + 2;

  if (totalLibPages > 4) {
    for (let i = before; i <= after; i += 1) {
      if (i > 0 && i <= 2) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.innerText = i;
        li.appendChild(a);
        paginationLibElement.appendChild(li);
      }
    }
  }
  if (totalLibPages < 4) {
    arrayPagination.forEach((e, i) => {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.innerText = i + 1;
      li.appendChild(a);
      paginationLibElement.appendChild(li);
    });
  }
}

// Функция нажатия перехода на нужную страницу при нажатии на кнопку
function onLibBtnClick(e) {
  e.preventDefault();

  if (e.target.tagName !== 'A') {
    return;
  }

  collectionList.innerHTML = '';
  paginationLibElement.innerHTML = '';
  currentLibPage = Number(e.target.textContent);

  if (watchedEl.classList.contains('button--orange')) {
    const watchedFilms = JSON.parse(localStorage.getItem('watched'));
    const watchedFilmsPage = sliceLibraryOnPage(watchedFilms);
    renderFile(watchedFilmsPage[currentLibPage - 1]);
    renderLibPag(watchedFilmsPage);
  }
  if (queueEl.classList.contains('button--orange')) {
    const queueFilms = JSON.parse(localStorage.getItem('queue'));
    const queueFilmsPage = sliceLibraryOnPage(queueFilms);
    renderFile(queueFilmsPage[currentLibPage - 1]);
    renderLibPag(queueFilmsPage);
  }
}

// Функция выделяющая кнопку акттивной страницы
function makeActiveLibBtn() {
  let pages = paginationLibElement.querySelectorAll('a');

  for (let i = 0; i < pages.length; i += 1) {
    if (pages[i].classList.contains('active')) {
      pages[i].classList.remove('active');
    }
    if (Number(pages[i].textContent) === currentLibPage) {
      pages[i].classList.add('active');
    }
  }
}

paginationLibElement.addEventListener('click', onLibBtnClick);
