import { refs } from './refs';
import { getExercises } from './servicesApi';

let query = 'Muscles';
let page = 1;

// -------  Функція, яка робить запит по Muscles по Default -------

async function getDefaultApi() {
  try {
    // fetch to the server
    const { results, totalPages } = await getExercises(query);
    refs.exercisesWrap.innerHTML = exercisesMarcup(results);

    // pagination
    if (totalPages > 1) {
      //   refs.exercisesNumberingWrap.addEventListener('click', onPaginationClick);
      refs.exercisesNumberingWrap.classList.remove('is-hidden');
      refs.exercisesNumberingWrap.innerHTML = paginationMarcup(totalPages);
    } else {
      refs.exercisesNumberingWrap.classList.add('is-hidden');
    }
  } catch (err) {
    console.log(err);
  }
}

getDefaultApi();

// ------- Функція фільтрів Muscles, Body parts, Equipment -------

refs.exercisesBtn.addEventListener('click', onButtonClick);

async function onButtonClick(evt) {
  if (evt.target === evt.currentTarget) return;

  try {
    query = evt.target.value;

    // active button
    const oldActiveBtn = refs.exercisesBtn.querySelector(
      '.exercises-btn-active'
    );
    oldActiveBtn.classList.remove('exercises-btn-active');
    const newActiveBtn = evt.target.closest('.exercises-btn');
    newActiveBtn.classList.add('exercises-btn-active');

    //fetch to the server
    const { results, totalPages } = await getExercises(query);
    refs.exercisesWrap.innerHTML = exercisesMarcup(results);

    // pagination
    if (totalPages > 1) {
      refs.exercisesNumberingWrap.classList.remove('is-hidden');
      refs.exercisesNumberingWrap.innerHTML = paginationMarcup(totalPages);
      refs.exercisesNumberingWrap.addEventListener('click', onPaginationClick);
    } else {
      refs.exercisesNumberingWrap.classList.add('is-hidden');
    }
  } catch (err) {
    console.log(err);
  }
}

// ------- Функція Pagination -------

async function onPaginationClick(evt) {
  if (evt.target === evt.currentTarget) return;
  let currentPageValue = evt.target.value;
  console.log(typeof page);
  page += 1;

  try {
    const { results, totalPages } = await getExercises(query);
    Array.from(evt.currentTarget.children).map(el => {
      if (el.value === currentPageValue) {
        el.classList.add('exercises-numbering-item-active');
        refs.exercisesWrap.innerHTML = exercisesMarcup(results);
      } else {
        el.classList.remove('exercises-numbering-item-active');
      }
    });
  } catch (err) {
    console.log(err);
  }

  // refs.exercisesWrap.innerHTML = '';

  //   try {
  //     const { results, page, totalPages } = getExercises(query);
  //     console.log(page);
  //     //   if (page === totalPages) return;
  //     refs.exercisesWrap.innerHTML = exercisesMarcup(results);
  //   } catch (err) {
  //     console.log(err);
  //   }
}

// ------- Функція розмітки Muscles, Body parts, Equipment -------

function exercisesMarcup(arr) {
  return arr
    .map(
      ({ imgUrl, name, filter }) => `<li class="exercises-item">
       <a href="#" class="exercises-link">
         <img
           src="${imgUrl}"
           alt="Exercises picture"
           class="exercises-item-img"
        />
         <div class="exercises-item-wrap">
           <h3 class="exercises-item-title">${name}</h3>
           <p class="exercises-item-text">${filter}</p>
         </div>
       </a>
     </li>`
    )
    .join('');
}

// ------- Функція розмітки Pagination -------

function paginationMarcup(totalPages) {
  let paginationHtml = '';

  for (let i = 1; i <= totalPages; i += 1) {
    paginationHtml += `<button class="exercises-numbering-item" type="button" value="${i}">${i}</button>`;
  }
  return paginationHtml;
}
