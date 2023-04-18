import { getTrending } from '../api/api-service';
import { createGalleryMarkup } from '../gallery/galleryMarkupCards';
import refs from '../refs';

getTrending().then(data => {
  refs.galleryfilm.insertAdjacentHTML(
    'beforeend',
    createGalleryMarkup(data.results)
  );
});
