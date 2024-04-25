import { refs } from './refs';
import { getExercises } from './servicesApi';

let query = 'Muscles';

// -------  Функція, яка робить запит по Muscles по Default -------

async function getDefaultApi() {
  try {
    const { results } = await getExercises(query);
    refs.exercisesWrap.innerHTML = exercisesMarcup(results);
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
    const query = evt.target.value;

    if (evt.target) {
    }

    if (query) {
      const { results } = await getExercises(query);

      refs.exercisesWrap.innerHTML = exercisesMarcup(results);
      const oldActiveBtn = refs.exercisesBtn.querySelector(
        '.exercises-btn-active'
      );
      oldActiveBtn.classList.remove('exercises-btn-active');
      const newActiveBtn = evt.target.closest('.exercises-btn');
      newActiveBtn.classList.add('exercises-btn-active');
    }
  } catch (err) {
    console.log(err);
  }
}

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
