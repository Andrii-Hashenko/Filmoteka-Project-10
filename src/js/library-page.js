import getRefs from '../js/get-refs';
const refs = getRefs();

refs.libraryPage.addEventListener('click', renderLibraryHeader);

function renderLibraryHeader(e) {
  e.preventDefault();

  refs.form.classList.add('is-hidden');
  refs.btnSectionInLibrary.classList.remove('is-hidden');
  refs.btnSectionInLibrary.classList.add('btn-list');
  refs.homePage.classList.remove('current');
  refs.libraryPage.classList.add('current');
  refs.headerByClass.classList.remove('header');
  refs.headerByTeg.classList.add('header-library');
  refs.search.classList.add('is-hidden');
  refs.pagination.classList.add('pagination-off');
  refs.search.innerHTML = '';
}
