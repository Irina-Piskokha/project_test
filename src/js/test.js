import { refs } from './refs';

async function getExercises() {
  const response = await fetch('https://energyflow.b.goit.study/api/filters');
  const data = await response.json();
  return data;
}

async function main() {
  const { results } = await getExercises();
  let currentPage = 1;
  let rows = 3;

  console.log(results);

  function displayList(arrResults, rowPerPage, page) {
    refs.exercisesWrap.innerHTML = '';
    page--;

    const start = rowPerPage * page;
    const end = start + rowPerPage;

    const pagination = arrResults.slice(start, end);

    pagination.forEach(el => {
      console.log(el);
      refs.exercisesWrap.innerHTML = `${el.name}`;
    });
  }

  displayList(results, rows, currentPage);
}

main();
