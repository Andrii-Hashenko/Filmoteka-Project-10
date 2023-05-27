import getRefs from '../js/get-refs';
import { tns } from 'tiny-slider/src/tiny-slider';
import MoviesApi from '../js/api-requests';
import movieDetailMarkUp from '../js/modal-movie-details';
import forModalTrailerRender from './modal-trailer';
import { translateItems } from './localization';

const refs = getRefs();
const movies = new MoviesApi();

export default function buildSlider(d) {
  if (window.screen.width >= 1024) {
    d.map(el => {
      const { poster_path, id } = el;
      const imgSlider = `<a><img src="${setPoster(poster_path)}" alt="" data-id="${id}"/></a>`;
      // console.log(window.screen.width);
      return refs.slider.insertAdjacentHTML('beforeend', imgSlider);
    });
    slider();
    return slider().play();
  }

  slider().destroy();
}

function setPoster(poster) {
  if (poster === null) {
    return 'https://wipfilms.net/wp-content/data/posters/tt0338683.jpg';
  }

  return `https://image.tmdb.org/t/p/w500${poster}`;
}

refs.slider.addEventListener('click', e => {
  if (e.target.parentNode.classList.contains('tns-slide-active')) {
    movies.id = e.target.dataset.id;
    movies.getMoviesById().then(response => {
      movieDetailMarkUp(response.data);
      translateItems('.modal-card [data-key]');
      setTimeout(() => {
        onSearchTrailerById();
      }, 500);
    });
  }
});

function slider() {
  const slider = tns({
    container: '.slider',
    items: 9,
    controlsContainer: '.slider',
    navContainer: false,
    navAsThumbnails: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayButton: false,
    autoplayButtonOutput: false,
    // swipeAngle: false,
    speed: 1000,
    nav: false,
    // autoplayHoverPause: true,
    // controlsText: ['^', '^'],
    rewind: false,
    mouseDrag: true,
  });

  return slider;
}

export { slider };

function onSearchTrailerById() {
  movies.getMoviesTrailer().then(response => {
    forModalTrailerRender(response.data.results);
  });
}
