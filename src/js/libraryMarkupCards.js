import { genresLibraryFormat } from './formatGenres';
import no_poster from '../images/no_poster.jpg';

function createLibraryMarkup(films) {
  return films
    .map(film => {
      const genres = genresLibraryFormat(film.genre_ids);
      const filmDate = film.release_date ?? film.first_air_date ?? null;
      const filmYear = filmDate ? filmDate.slice(0, 4) : 'Unknown year';

      const poster = film.poster_path
        ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
        : no_poster;

      return `
      <li class="film__card" data-film="${film.id}">
        <div class="film__thumb">        
            <img class="film__image"
            src="${poster}"
            alt="${film.title ?? film.name}"
            loading="lazy"
            />      
        </div>
        <div class="film__info">
          <p class="film__name">${film.title ?? film.name}</p>
          <p class="film__descr">${genres} | ${filmYear}</p>
        </div>
      </li>`;
    })
    .join('');
}
