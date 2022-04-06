import axios from 'axios';
import { message } from 'antd';
import { gotoLogin } from '../utils/utils';

export default async function net(url, options = {}) {
  return new Promise((resolve, reject) => {
    return axios({
      url,
      ...options,
      headers: {
        Authorization: window.token,
      },
    })
      .then(response => {
        const { data } = response;
        if (data?.code === 200 || data?.code === 0) {
          return resolve(data);
        } else if (data.code === 401) {
          message.error(data.msg);
          gotoLogin();
          return resolve(data);
        } else {
          message.error(data.msg);
          return reject(data);
        }
      })
      .catch(error => {
        const { response } = error || {};
        const { data } = response || {};
        return reject(data || {});
      });

  });
}


// axios.interceptors.request.use(config => {
//   const { componentName, appCode } = config;
//   if (componentName && packageData?.dependencies) {
//     const arr = []
//     const obj = packageData.dependencies;
//     for (const key in obj) {
//       if (Object.prototype.hasOwnProperty.call(obj, key)) {
//         const element = obj[key];
//         if (Array.isArray(componentName)) {
//           componentName.forEach((item) => {
//             if (item === key) {
//               arr.push({ [key]: element, appCode });
//             }
//           });
//         } else if (componentName === key) {
//           arr.push({
//             [key]: element,
//             appCode
//           })
//         }
//       }
//     }
//     window.suosi_pageLog.send(arr);
//   }
//   return config
// }, err => {
//   return Promise.reject(err)
// })