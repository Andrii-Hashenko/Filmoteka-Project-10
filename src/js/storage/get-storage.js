import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnQueueStorage = document.querySelector('.get-queue');
const btnLibraryStorage = document.querySelector('.get-library');

btnQueueStorage.addEventListener('click', getStorage);
btnLibraryStorage.addEventListener('click', getStorage);

function getStorage(e) {
  e.preventDefault();

  const KEY_STORAGE = e.currentTarget.name;
  const fetchStorage = localStorage.getItem(KEY_STORAGE);
  const parsData = fetchStorage === null ? undefined : JSON.parse(fetchStorage);

  if (parsData) {
    return parsData;
  }
  Notify.info(`You not added any movie to the ${KEY_STORAGE}`, {
    width: '300px',
  });
}
