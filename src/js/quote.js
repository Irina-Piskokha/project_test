import { refs } from './refs';

document.addEventListener('DOMContentLoaded', () => {
  getQuote()
    .then(result => {
      const markup = createMarkup(result);
      refs.quoteWrap.innerHTML = markup;
    })
    .catch(() => {
      refs.quoteWrap.innerHTML = 'Sorry';
    });
});

function createMarkup({ author, quote }) {
  return `<p class="quote-text">${quote}</p>
  <p class="qoute-name">${author}</p>`;
}

function getQuote() {
  const BASE_URL = 'https://energyflow.b.goit.study/api';
  const END_POINT = '/quote';

  const url = `${BASE_URL}${END_POINT}`;

  return fetch(url).then(response => {
    return response.json();
  });
}
