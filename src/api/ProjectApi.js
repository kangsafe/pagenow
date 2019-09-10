//

import {Axios} from '../utils/AxiosPlugin'

const saveProject = async function (data) {
  return await Axios.post('/project/saveProject', {data: JSON.stringify(data)});
};

const updateProjectEchartThemeId = async function (projectId, echartThemeId) {
  return await Axios.post('/project/updateProjectEchartThemeId', {projectId: projectId, echartThemeId: echartThemeId});
};

const getAllProject = async function () {
  return await Axios.get('/project/getAllProject');
};

const deleteProject = async function (id) {
  return await Axios.delete('/project/deleteProject', {params: {id: id}});
};

const getProjectById = async function (id) {
  return await Axios.get('/project/getProjectById', {params: {id: id}});
};

export default {
  saveProject,
  updateProjectEchartThemeId,
  getAllProject,
  deleteProject,
  getProjectById
}
