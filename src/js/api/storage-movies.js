// const btnQueue = document.querySelector('button[name="queue"]');
// const btnLibrary = document.querySelector('button[name="library"]');

// btnLibrary.addEventListener('click', addMovieToStorage);
// btnQueue.addEventListener('click', addMovieToStorage);

// const obj = {
//   id: 45,
//   preview:
//     'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
//   original:
//     'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
//   description: 'Hokkaido Flower',
// };

export function addMovieToStorage(e) {
  e.preventDefault();

  const KEY_STORAGE = e.currentTarget.name;

  const storage = getStorge(KEY_STORAGE);
  console.log('1stor', storage);
  if (!storage) {
    const newStorage = [];
    newStorage.push(obj);
    return localStorage.setItem(KEY_STORAGE, JSON.stringify(newStorage));
  }
  const newElem = storage.find(item => item.id === obj.id);
  console.log('el', newElem);
  if (!newElem) {
    storage.push(obj);
    return localStorage.setItem(KEY_STORAGE, JSON.stringify(storage));
  }
  console.log('We have one');
}
 
export function getStorge(key) {
  const checkStorage = localStorage.getItem(key);
  return (parsData =
    checkStorage === null ? undefined : JSON.parse(checkStorage));
}
