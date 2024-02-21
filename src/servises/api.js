import apiInstance from 'axios';

const BASE_URL = 'https://energyflow.b.goit.study/api';
const END_POINT = '/exercises';
const EXERCISES_CATEGORY = {
  muscles: 'muscles',
  'body parts': 'bodyparts',
  equipment: 'equipment',
};

class ApiParams {
  constructor() {
    this.category = 'muscles';
    this.exercises = '';
  }

  getCategory(category) {
    this.category = category;
  }

  getExercises(exercises) {
    this.exercises = exercises;
  }
}

// console.log(ApiParams);

// const KEYS_EXERCISES = Object.keys(EXERCISES_CATEGORY);
// for (const key of KEYS_EXERCISES) {
// console.log(EXERCISES_CATEGORY[key]);
// }

function searchExercises({ query, page = 1, limit }) {
  return apiInstance
    .get(
      `${BASE_URL}${END_POINT}?${EXERCISES_CATEGORY[this.category]}=${
        this.exercises
      }`,
      {
        params: {
          keyword: query,
          page,
          limit,
        },
      }
    )
    .then(({ data }) => data);
}

export { searchExercises };
