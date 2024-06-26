import { refs } from './refs';
import format from 'date-fns/format';

// отримуємо поточну дату
const currentData = format(new Date(), 'P');
// зберігаємо поточну дату в LS
localStorage.setItem('quoteData', JSON.stringify(currentData));

document.addEventListener('DOMContentLoaded', () => {
  // беремо данні дати з LS
  const jsonValue = localStorage.getItem('quoteData');
  const dataValue = JSON.parse(jsonValue);
  // беремо данні об'єкта з LS
  const jsonObj = localStorage.getItem('quoteValue');
  const valueObj = JSON.parse(jsonObj);

  if (
    localStorage.getItem('quoteValue') === null ||
    currentData !== dataValue
  ) {
    getQuote()
      .then(result => {
        let markup = createMarkup(result);
        refs.quoteWrap.innerHTML = markup;
        localStorage.setItem('quoteValue', JSON.stringify(result));
      })
      .catch(() => {
        refs.quoteWrap.innerHTML = 'Sorry';
      });
  } else {
    let markup = createMarkup(valueObj);
    refs.quoteWrap.innerHTML = markup;
  }
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
