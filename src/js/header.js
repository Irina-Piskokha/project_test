import { refs } from './refs';

const homeBtn = refs.headerMenuBtn.querySelector('.header-btn-home');
const favorites = refs.headerMenuBtn.querySelector('.header-btn-favorites');

homeBtn.addEventListener('click', () => {
  favorites?.classList.remove('header-btn-favorites-active');
  homeBtn.classList.add('header-btn-home-active');
});

favorites.addEventListener('click', () => {
  homeBtn?.classList.remove('header-btn-home-active');
  favorites.classList.add('header-btn-favorites-active');
});
