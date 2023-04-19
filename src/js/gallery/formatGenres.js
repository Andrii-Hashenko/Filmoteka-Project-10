import { genresList } from './genresList';

export function genresGalleryFormat(array) {
  const genreResult = genresList
    .filter(element => Array.isArray(array) && array.includes(element.id))
    .map(element => element.name);

  if (genreResult.length === 0) {
    return 'Unknown genre';
  } else if (genreResult.length > 2) {
    return `${genreResult.slice(0, 2).join(', ')}, ...`;
  } else {
    return genreResult.join(', ');
  }
}


export function genresGalleryFormatModal(arrOfGenres) {
  return arrOfGenres.map(genr => genr.name).join(', ');
}


export function genresLibraryFormat(array) {
  const genreResult = array.map(genre => genre.name);

  if (genreResult.length === 0) {
    return 'Unknown genre';
  } else if (genreResult.length > 2) {
    return `${genreResult.slice(0, 2).join(', ')}, ...`;
  } else {
    return genreResult.join(', ');
  }
}



