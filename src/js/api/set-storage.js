import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnQueue = document.querySelector('button[name="queue"]');
const btnLibrary = document.querySelector('button[name="library"]');

btnLibrary.addEventListener('click', addMovieToStorage);
btnQueue.addEventListener('click', addMovieToStorage);

const obj = {
  id: 45,
  original_title: 'Fight Club',
};

function addMovieToStorage(e) {
  e.preventDefault();

  const KEY_STORAGE = e.currentTarget.name;
  const checkStorage = localStorage.getItem(KEY_STORAGE);
  const storage = checkStorage === null ? undefined : JSON.parse(checkStorage);

  if (!storage) {
    const newStorage = [];
    newStorage.push(obj);
    return localStorage.setItem(KEY_STORAGE, JSON.stringify(newStorage));
  }
  const newElem = storage.find(item => item.id === obj.id);

  if (!newElem) {
    storage.push(obj);
    return localStorage.setItem(KEY_STORAGE, JSON.stringify(storage));
  }
  console.log(newElem);
  Notify.info(
    `The movie ${newElem.original_title} already exist in ${KEY_STORAGE}`,
    { width: '330px' }
  );
}
