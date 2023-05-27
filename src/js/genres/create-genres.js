import allGenres from '../genres/genres.json';

function genresArreyTrend(genre_ids, allGenres) {
  return genre_ids.map(id => allGenres.genres.filter(element => element.id === id)).flat();
}

export default function createGenresText(genre_ids) {
  const genresToCards = [];

  const genresArray = genresArreyTrend(genre_ids, allGenres);

  for (let genre of genresArray) {
    let lang = localStorage.getItem('lang');
    if (lang === null) {
      lang = 'en-US';
    }
    genresToCards.push(genre.name[lang]);
  }
  if (genresToCards.length === 0) {
    return 'No data';
  }
  if (genresToCards.length < 2) {
    return genresToCards.join(', ');
  } else {
    return genresToCards.slice(0, 2).join(', ') + ', ' + otherGenres();
  }
}

function otherGenres() {
  const lang = localStorage.getItem('lang');
  if (!lang || lang === 'en-US') {
    return 'Other';
  }
  if (lang === 'uk-UA') {
    return 'Інші';
  }
  if (lang === 'ru-RU') {
    return 'Другие';
  }
}
