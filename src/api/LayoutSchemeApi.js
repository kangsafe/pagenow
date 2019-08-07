// 布局方案接口

import {Axios} from '../utils/AxiosPlugin'

const saveLayoutScheme = async function (data) {
  return await Axios.post('/layoutScheme/saveLayoutScheme', {data: JSON.stringify(data)});
};

const getAllLayoutScheme = async function () {
  return await Axios.get('/layoutScheme/getAllLayoutScheme');
};

const getLayoutSchemeMetadataByName = async function (name) {
  return await Axios.get('/layoutScheme/getLayoutSchemeMetadataByName', {params: {name: name}});
};

export default {
  saveLayoutScheme,
  getAllLayoutScheme,
  getLayoutSchemeMetadataByName
}
