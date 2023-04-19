const KEY_WATCHED = 'watched';
const KEY_QUEUE = 'queue';
export let watched = getWatchedLocalStorage() || [];
export let queue = getQueueLocalStorage() || [];

export function onAddToWatched(id) {
  if (watched.includes(id)) {
    return;
  }
  watched.push(id);
  setWatchedLocalStorage(watched);
}

export function onAddToQueue(id) {
  if (queue.includes(id)) {
    return;
  }
  queue.push(id);
  setQueueLocalStorage(queue);
}

export function getWatchedLocalStorage() {
  return JSON.parse(localStorage.getItem(KEY_WATCHED));
}

export function getQueueLocalStorage() {
  return JSON.parse(localStorage.getItem(KEY_QUEUE));
}

export function setWatchedLocalStorage(arr) {
  localStorage.setItem(KEY_WATCHED, JSON.stringify(arr));
}

export function setQueueLocalStorage(arr) {
  localStorage.setItem(KEY_QUEUE, JSON.stringify(arr));
}
