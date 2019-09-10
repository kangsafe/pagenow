import {Axios} from '../utils/AxiosPlugin'

const saveCompinfoType = async function (data) {
  return await Axios.post('/compinfo/saveCompinfoType', {data: JSON.stringify(data)});
};

const getAllCompinfoType = async function () {
  return await Axios.get('/compinfo/getAllCompinfoType');
};

const saveCompinfo = async function (data) {
  return await Axios.post('/compinfo/saveCompinfo', {data: JSON.stringify(data)});
};

const updateCompinfo = async function (data) {
  return await Axios.post('/compinfo/updateCompinfo', {data: JSON.stringify(data)});
};

const getAllCompinfoByTypeId = async function (typeId) {
  return await Axios.get('/compinfo/getAllCompinfoByTypeId', {params: {typeId: typeId}});
};

const deleteCompinfo = async function (id) {
  return await Axios.delete('/compinfo/deleteCompinfo', {params: {id: id}});
};

const buildComponentLibrary = async function () {
  return await Axios.get('/compinfo/buildComponentLibrary');
};

export default {
  saveCompinfoType,
  getAllCompinfoType,
  saveCompinfo,
  updateCompinfo,
  getAllCompinfoByTypeId,
  deleteCompinfo,
  buildComponentLibrary
}
