const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '900c3c2e823d6abe3929dac959f94e63';
import { Spinner } from 'spin.js';
import opts from './spinner';
import axios from 'axios';
export default class MoviesApi {
  constructor() {
    this.searchQuery = '';
    this.movieId = '';
    this._page = 1;
    this.language = 'en-US';
  }

  async getPopularMovies() {
    var target = document.querySelector('body');
    var spinner = new Spinner(opts).spin(target);
    try {
      const response = await axios.get(
        `${BASE_URL}trending/movie/day?api_key=${API_KEY}&language=${this.setLanguage()}&page=${
          this._page
        }`,
      );
      spinner.stop();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getSearchMovies() {
    var target = document.querySelector('body');
    var spinner = new Spinner(opts).spin(target);
    try {
      const response = await axios.get(
        `${BASE_URL}search/movie?api_key=${API_KEY}&language=${this.setLanguage()}&page=${
          this._page
        }&query=${this.searchQuery}`,
      );
      spinner.stop();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getMoviesById() {
    var target = document.querySelector('body');
    var spinner = new Spinner(opts).spin(target);
    try {
      const response = await axios.get(
        `${BASE_URL}movie/${this.movieId}?api_key=${API_KEY}&language=${this.setLanguage()}`,
      );
      spinner.stop();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getUpcomingMovies() {
    var target = document.querySelector('body');
    var spinner = new Spinner(opts).spin(target);
    try {
      const response = await axios.get(
        `${BASE_URL}movie/upcoming?api_key=${API_KEY}&language=${this.setLanguage()}&page=1`,
      );
      spinner.stop();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getMoviesTrailer() {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/${this.movieId}/videos?api_key=${API_KEY}&language=${this.setLanguage()}`,
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  setLanguage() {
    if (!localStorage.getItem('lang')) {
      return (this.language = 'en-US');
    }
    return (this.language = localStorage.getItem('lang'));
  }

  incrementPage() {
    this._page += 1;
  }

  resetPage() {
    this._page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get id() {
    return this.movieId;
  }

  set id(newId) {
    this.movieId = newId;
  }
  set page(newPage) {
    this._page = newPage;
  }
  get page() {
    return this._page;
  }
}
