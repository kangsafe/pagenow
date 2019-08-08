//

import {Axios} from '../utils/AxiosPlugin'

const savePage = async function (data) {
  return await Axios.post('/page/savePage', {data: JSON.stringify(data)});
};

const getPagesByProjectId = async function (projectId) {
  return await Axios.get('/page/getPagesByProjectId', {params: {projectId: projectId}});
};

const updatePageLayoutData = async function (pageId, layoutData) {
  return await Axios.post('/page/updatePageLayoutData', {pageId: pageId, layoutData: JSON.stringify(layoutData)});
};

const deletePage = async function (id) {
  return await Axios.delete('/page/deletePage', {params: {id: id}});
};

const getPageById = async function (id) {
  return await Axios.get('/page/getPageById', {params: {id: id}});
};

export default {
  savePage,
  getPagesByProjectId,
  updatePageLayoutData,
  deletePage,
  getPageById
}
