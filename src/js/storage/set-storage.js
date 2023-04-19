import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function addMovieToStorage(nameEvt, movieId) {
  const obj = movieId;
  const KEY_STORAGE = nameEvt;

  const checkStorage = localStorage.getItem(KEY_STORAGE);
  const storage = checkStorage === null ? undefined : JSON.parse(checkStorage);

  if (!storage) {
    const newStorage = [];
    newStorage.push(obj);
    return localStorage.setItem(KEY_STORAGE, JSON.stringify(newStorage));
  }
  const newElem = storage.find(item => item === obj);

  if (!newElem) {
    storage.push(obj);
    return localStorage.setItem(KEY_STORAGE, JSON.stringify(storage));
  }
  console.log(newElem);
  Notify.info(`The movie already exist in ${KEY_STORAGE}`, { width: '280px' });
}
