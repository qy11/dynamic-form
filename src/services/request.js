import axios from 'axios';
import { message } from 'antd';
import { gotoLogin } from '../utils/utils';

export default async function request(url, options = {}) {
  // debugger;
  const { headers } = options;

  const token = headers ? headers['Access-Token'] : '';
  return new Promise((resolve, reject) => {
    return axios({
      url,
      ...options,
      // withCredentials: true,
      headers: {
        Authorization: window.token,
        'Access-Token': token, // token
      },
    })
      .then(response => {
        const { data } = response;
        if (data.code === 200 || data.code === 0 || data.code === '200') {
          return resolve(data.data || data.result);
        } else if (data.code === 21002 || data.code === 21018 || data.code === 21019) {
          return reject(data);
        } else if (data.code === 401) {
          message.error(data.msg);
          gotoLogin();
          return resolve(data);
        } else {
          message.error(data.msg || '网络错误，请重试');
          return reject(data || {});
        }
      })
      .catch(error => {
        const { response } = error || {};
        const { data } = response || {};
        return reject(data || {});
      });
  });
}
