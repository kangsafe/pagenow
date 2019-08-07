//

import {Axios} from '../utils/AxiosPlugin'

const savePage = async function (data) {
  return await Axios.post('/page/savePage', {data: JSON.stringify(data)});
};

const getPagesByProjectId = async function (projectId) {
  return await Axios.get('/page/getPagesByProjectId', {params: {projectId: projectId}});
};

export default {
  savePage,
  getPagesByProjectId
}
