import axios from 'axios';

const BASE_URL = 'https://energyflow.b.goit.study/api';
const END_POINT = 'filters';

function getExercises(query, page = 1) {
  return axios
    .get(`${BASE_URL}/${END_POINT}`, {
      params: {
        filter: query,
        page,
        limit: 12,
      },
    })
    .then(({ data }) => data);
}

export { getExercises };
