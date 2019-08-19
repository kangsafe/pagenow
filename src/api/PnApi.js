import {Axios} from "../utils/AxiosPlugin";

import ProjectApi from './ProjectApi'
import PageApi from './PageApi'
import TestApi from './TestApi'

/**
 *
 * @param url
 * @param params
 * @returns {Promise<*>}
 */
const getData = async function (url, params) {
  return await Axios.get(url, {params: params})
};


export default {
  getData,
  ProjectApi,
  PageApi,
  TestApi
}
