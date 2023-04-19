import data from '../../team-card.json';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/src/styles/main.scss';
import teamCardTpl from '../../team-card.hbs';
const teamLink = document.querySelector('.js-team-link');

teamLink.addEventListener('click', onTeamModalShow);

function onTeamModalShow() {
  const teamCardsMarkup = teamCardTpl(data);
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onCloseEsc);

  function onClick(e) {
    console.log('123');
    e.target.classList.value === 'team__title' ||
    e.target.classList.value === 'team__title_accent' ||
    e.target.classList.value === 'basicLightbox'
      ? teamModal.close()
      : teamModal.show();

    if (localStorage.getItem('theme') === 'dark') {
      document.querySelector('.team-section').classList.add('dark-bg');
    }
  }

  function onCloseEsc(e) {
    e.code === 'Escape' ? teamModal.close() : teamModal.show();
  }

  const teamModal = basicLightbox.create(teamCardsMarkup, {
    onShow: () => {
      document.body.style.overflow = 'hidden';
    },
    onClose: () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onCloseEsc);
    },
  });

  teamModal.show();
}