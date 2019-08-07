// 页面信息接口

import {Axios} from '../utils/AxiosPlugin'

const savePageInfo = async function (data) {
  return await Axios.post('/pageInfo/savePageInfo', {data: JSON.stringify(data)});
};

const getPageInfos = async function (data) {
  return await Axios.get('/pageInfo/getPageInfos');
};

const getPageInfoById = async function (id) {
  return await Axios.get('/pageInfo/getPageInfoById', {params: {id: id}});
};


export default {
  savePageInfo,
  getPageInfos,
  getPageInfoById
}
