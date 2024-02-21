import { searchExercises } from './servises/api';

const refs = {
  formSearch: document.querySelector('#form-exercises'),
  exercisesContainer: document.querySelector('.exercises-search'),
};

const pageSizeParams = {
  query: '',
  page: 1,
  limit: 9,
};

refs.formSearch.addEventListener('submit', onFormSearchSubmit);

async function onFormSearchSubmit(event) {
  event.preventDefault();

  refs.exercisesContainer.innerHTML = '';
  pageSizeParams.page = 1;

  const form = event.currentTarget;
  pageSizeParams.query = form.elements.text.value.trim();

  try {
    const value = await searchExercises(pageSizeParams);
    console.log(value);
  } catch (error) {
    console.log(error);
  }
}
