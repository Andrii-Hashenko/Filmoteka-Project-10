import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { onModalBtnsRenderingPageFromPageSwitcher } from './page-switcher';

import { translateMsg } from './translate';
import messages from './languages/notiflix.json';
import btnTxt from './languages/buttons-text.json';

//notiflix messages
const watchedFailureMsg = messages.watched.failure;
const watchedSuccessMsg = messages.watched.success;
const queueFailureMsg = messages.queue.failure;
const queueSuccessMsg = messages.queue.success;
//buttons text
const watchAddTxt = btnTxt.watch.add;
const watchRemoveTxt = btnTxt.watch.remove;
const queueAddTxt = btnTxt.queue.add;
const queueRemoveTxt = btnTxt.queue.remove;

function onModalBtnWatchedLocalStorage(btnAddWatched, data, watched, queue) {
  btnAddWatched.addEventListener('click', e => {
    if (
      e.path[1].children[1].classList.contains('pressed') &&
      !e.target.classList.contains('pressed')
    ) {
      e.path[1].children[1].classList.remove('pressed');
      e.path[1].children[1].textContent = translateMsg(queueAddTxt);
      queue.splice(
        queue.findIndex(obj => obj.id === data.id),
        1,
      );
      localStorage.setItem('queue', JSON.stringify(queue));
    } // дві кнопки не може бути активними зразу
    if (e.target.classList.contains('pressed')) {
      e.target.classList.remove('pressed');
      e.target.textContent = translateMsg(watchAddTxt);
      watched.splice(
        watched.findIndex(obj => obj.id === data.id),
        1,
      );
      localStorage.setItem('watched', JSON.stringify(watched));
      setTimeout(() => Notify.failure(translateMsg(watchedFailureMsg)), 250);
      onModalBtnsRenderingPageFromPageSwitcher();
      // setTimeout(() => Notify.failure('Film removed on watched'), 250);
    } else {
      e.target.classList.add('pressed');
      e.target.textContent = translateMsg(watchRemoveTxt);
      watched.push(data);
      localStorage.setItem('watched', JSON.stringify(watched));
      onModalBtnsRenderingPageFromPageSwitcher();
      setTimeout(() => Notify.success(translateMsg(watchedSuccessMsg)), 250);
    }
  });
}

function onModalBtnQueueLocalStorage(btnAddQueue, data, queue, watched) {
  btnAddQueue.addEventListener('click', e => {
    if (
      e.path[1].children[0].classList.contains('pressed') &&
      !e.target.classList.contains('pressed')
    ) {
      e.path[1].children[0].classList.remove('pressed');
      e.path[1].children[0].textContent = translateMsg(queueAddTxt);
      watched.splice(
        watched.findIndex(obj => obj.id === data.id),
        1,
      );
      localStorage.setItem('watched', JSON.stringify(watched));
    } // дві кнопки не може бути активними зразу
    if (e.target.classList.contains('pressed')) {
      e.target.classList.remove('pressed');
      e.target.textContent = translateMsg(queueAddTxt);
      queue.splice(
        queue.findIndex(obj => obj.id === data.id),
        1,
      );
      localStorage.setItem('queue', JSON.stringify(queue));

      setTimeout(() => Notify.failure(translateMsg(queueFailureMsg)), 250);
      onModalBtnsRenderingPageFromPageSwitcher();
      // setTimeout(() => Notify.failure('Film removed on queue'), 250);
    } else {
      e.target.classList.add('pressed');
      e.target.textContent = translateMsg(queueRemoveTxt);
      queue.push(data);
      localStorage.setItem('queue', JSON.stringify(queue));
      onModalBtnsRenderingPageFromPageSwitcher();
      setTimeout(() => Notify.success(translateMsg(queueSuccessMsg)), 250);
    }
  });
}

export { onModalBtnWatchedLocalStorage, onModalBtnQueueLocalStorage };
