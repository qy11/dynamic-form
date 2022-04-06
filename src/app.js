import { getDvaApp } from 'umi';
// import './public-path';
import store from 'store2';
import routes from '../config/router.config';
import { queryCurrent } from './services/user';

window.token =
  window.token ||
  'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2luZm8iOiIlN0IlMjJhdmF0YXIlMjIlM0ElMjJodHRwJTNBJTJGJTJGd2V3b3JrLnFwaWMuY24lMkZiaXptYWlsJTJGSFFLYU83WGVOd0F4R3czb3ZTNTU2Z2Z6d1J6WTlUTzdOSlppYzJDcWRLVFFpYTdEMXlVM0ZnVXclMkYwJTIyJTJDJTIyaW5kdXN0cnlUeXBlJTIyJTNBJTIyY29tbXVuaXR5JTIyJTJDJTIybG9naW5UeXBlJTIyJTNBJTIybm9ybWFsJTIyJTJDJTIybWVtYmVySWQlMjIlM0ExNDM3MjUzNDUxOTQwMjk0ODEyJTJDJTIybWVtYmVyTmFtZSUyMiUzQSUyMiVFNiU5RCU4RSVFNSVCQiVCQSVFNSVCRCVBQyUyMiUyQyUyMm1vYmlsZSUyMiUzQSUyMjEzNjU3MDg2NDUxJTIyJTJDJTIyb3JnSWQlMjIlM0EzMDAxMDAxMDAxMDAwMDA2JTJDJTIyb3JnTmFtZSUyMiUzQSUyMiVFNiU5RCVBRCVFNSVCNyU5RSVFNiVBRCVBMyVFNSU5RCU5QiVFNyVBNyU5MSVFNiU4QSU4MCVFNiU5QyU4OSVFOSU5OSU5MCVFNSU4NSVBQyVFNSU4RiVCOCUyMiUyQyUyMm9yZ1R5cGUlMjIlM0ElMjJnZW5lcmFsJTIyJTJDJTIycmVnaW9uQ29kZSUyMiUzQSUyMjMzMDEwMjAwMDAwMDAwMDAwMCUyMiUyQyUyMnNob3J0TmFtZSUyMiUzQSUyMiVFNiVBRCVBMyVFNSU5RCU5QiVFNyVBNyU5MSVFNiU4QSU4MCUyMiUyQyUyMnVzZXJJZCUyMiUzQTE0MzcyNTM0NTE5NDAyOTQ4MTIlMkMlMjJ1c2VyTmFtZSUyMiUzQSUyMiVFNiU5RCU4RSVFNSVCQiVCQSVFNSVCRCVBQyUyMiUyQyUyMnVzZXJUeXBlJTIyJTNBJTIyZW1wbG95ZWUlMjIlN0QiLCJ1c2VyX25hbWUiOiIzMDAxMDAxMDAxMDAwMDA2QDE0MzcyNTM0NTE5NDAyOTQ4MTJAZW1wbG95ZWVAbm9ybWFsIiwib3JnX2lkIjozMDAxMDAxMDAxMDAwMDA2LCJzY29wZSI6WyJ3cml0ZSJdLCJleHAiOjE2NDkyNTg2MDksImp0aSI6IjM2N2ZhYTU1LTBjODUtNDk4ZC1hMWZiLTFjYzI0NTIzMDEwMSIsImNsaWVudF9pZCI6InNpdCJ9.VjR-nOitCKqvxnJbkbVlpQh2uiFUirJiai1GRvDucW6hElkbkLe6bfnqOsiaEiNqcLcjo5dlQh67ixiESX0HWNs_5S6AShHgh7qlHCqf7K12nqyQsih0TBuAAumLermBH9t4x1PD6jFakLwWhdr_nOlUlvE67jPPBdG19vkb-A8';

let timer;
// 同步容器的参数到 store 中
function dispatchState(value = null) {
  const gApp = getDvaApp();
  // 获取全局下挂载的 redux store，如果还未初始化，则异步轮询
  // eslint-disable-next-line no-underscore-dangle
  const _store = gApp && gApp._store;
  if (!_store) {
    // eslint-disable-next-line no-unused-expressions
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      dispatchState(value);
    }, 0);
    return;
  }
  if (!value) {
    queryCurrent().then(res => {
      gApp._store.dispatch({
        type: 'user/save',
        payload: { currentUser: res || {} },
      });
    });
    return;
  }

  const { menus, currentUser, collapsed, activeMenuIndex, hideSilderMenu = false } = value;
  // queryCurrent().then(res => {
  //   console.log(res, 'currentUser222');
  //   gApp._store.dispatch({
  //     type: 'user/save',
  //     payload: { currentUser: res || {} },
  //   });
  // });
  gApp._store.dispatch({
    type: 'user/save',
    payload: { currentUser },
  });

  store.session('token', value?.token);
  window.token = value?.token;
  gApp._store.dispatch({
    type: 'menu/setMenuData',
    payload: { menus, routes, collapsed, activeMenuIndex, hideSilderMenu },
  });
}
/* eslint-disable import/prefer-default-export */
export const qiankun = {
  // 应用加载之前
  async bootstrap(props) {
    console.log('noticev4 bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props) {
    if (!props) return;
    const { onGlobalStateChange } = props;
    // if (MicroApp) {
    //   window._micro_app = MicroApp;
    // }

    onGlobalStateChange((value /* , prev */) => {
      // 利用 redux 在全局挂载的 g_app.store，dispatch 全局事件。
      if (!getDvaApp) {
        return;
      }
      if (value && JSON.stringify(value) !== '{}') {
        dispatchState(value);
      } else {
        // dispatchState({ hideSilderMenu });
      }
    }, true);
    // history.push("/workFlow/workFlow/home");

    // window.hideSilderMenu = hideSilderMenu;

    // 应用挂载之后刷新一下，解决 popState 回调函数没有被调用到导致 history 没更新的问题
    // const { pathname, search, hash } = window.location;
    // history.replace(pathname + search + hash);
  },
  // 应用卸载之后触发
  async unmount(props) {
    console.log('usercenter', props);
    // window.hideSilderMenu = false;
  },

  // 应用卸载之后触发
  async update(props) {
    console.log('usercenter', props);
    // const { hideSilderMenu } = props;
    // dispatchState({ hideSilderMenu });
    // window.hideSilderMenu = hideSilderMenu;
  },
};

dispatchState();
