//

import {Axios} from '../utils/AxiosPlugin'

const saveProject = async function (data) {
  return await Axios.post('/project/saveProject', {data: JSON.stringify(data)});
};

const getAllProject = async function () {
  return await Axios.get('/project/getAllProject');
};

const deleteProject = async function (id) {
  return await Axios.delete('/project/deleteProject', {params: {id: id}});
};

export default {
  saveProject,
  getAllProject,
  deleteProject
}
