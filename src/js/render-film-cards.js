import { getTrending } from './api/api-service';
import { createGalleryMarkup } from './galleryMarkupCards';

const loader = document.querySelector('.films__container');
const galleryfilm = document.querySelector('.list-films-js');
// showHideLoader(loader);
getTrending().then(data => {
  //   showHideLoader(loader);
  galleryfilm.insertAdjacentHTML(
    'beforeend',
    createGalleryMarkup(data.results)
  );
});
