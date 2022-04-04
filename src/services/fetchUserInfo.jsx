import request from '@/services/request';

let isFetching = false;
let userInfo = null;
const callbacks = [];

const api ='';


// 获取用户信息
export function getUserInfo(callback) {
  if (window.getUserInfoLoading === true) {
    window.getUserInfoCallBack.push(() => getUserInfo(callback));
    return;
  }

  if (userInfo) {
    return callback(userInfo);
  }

  callbacks.push(callback);

  if (!isFetching) {
    isFetching = true;
    // 备注登陆接口  正式环境 

    request(
      `${api}/login/userinfo`,
      {
        method: 'get',
        header: {
          Cookie: document.cookie,
        },
      }
    ).then(
      data => {
        userInfo = data;
        for (const cb of callbacks) {
          cb(data);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
