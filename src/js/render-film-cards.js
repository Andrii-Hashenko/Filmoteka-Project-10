import { getTrending } from './api/api-service';
import { createGalleryMarkup } from './galleryMarkupCards';

const galleryfilm = document.querySelector('.list-films-js');
getTrending().then(data => {
  galleryfilm.insertAdjacentHTML(
    'beforeend',
    createGalleryMarkup(data.results)
  );
});
