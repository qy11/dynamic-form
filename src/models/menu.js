import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import queryString from 'query-string';
import { history, formatMessage } from 'umi';
import { memoize } from 'lodash';
import Authorized from '../utils/Authorized';
import { menu } from '../defaultSettings';
import { getMenuData } from '../services/menu';

const { check } = Authorized;
const query = queryString.parse(window.location.search);

let flag = true;
let currentMenuArr = [];
function currentMenuData(data) {
  data.forEach(item => {
    if (flag) {
      if (item.path === `/${query?.parentUri.split('/')[1]}`) {
        flag = false;
        currentMenuArr = item;
      }
      currentMenuData(item.children || []);
    }
  });
  return currentMenuArr;
}

const generateMenu = memoize(function generateMenu(menus) {
  return (menus || []).map(({ url, menuName, icon, subMenus }) => ({
    path: url,
    name: menuName,
    icon,
    children: generateMenu(subMenus),
  }));
});

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }

      let locale = 'menu';

      if (parentName) {
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }
      // if enableMenuLocale use item.name,
      // close menu international
      const name = menu.disableLocal
        ? item.name
        : formatMessage({ id: locale, defaultMessage: item.name });
      const result = {
        ...item,
        name,
        // locale,
        title: name,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
  // doc: add hideChildrenInMenu
  if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
    return {
      ...item,
      children: filterMenuData(item.children), // eslint-disable-line
    };
  }
  return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
  if (!menuData) {
    return [];
  }
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => check(item.authority, getSubMenu(item)))
    .filter(item => item);
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
  const routerMap = {};

  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

const filterRoutes = (serverMenus, localMenus) => {
  return serverMenus
    .map(serverMenuItem => {
      let localMenuItem;
      if (localMenus) {
        localMenuItem = localMenus.find(
          q => q.name === serverMenuItem.menuName && q.path === serverMenuItem.url,
        );
      }

      if (!localMenuItem) {
        localMenuItem = {};
      }

      let newIcon = serverMenuItem.icon;
      if (!newIcon) {
        newIcon = localMenuItem.icon;
      }
      if (!newIcon) {
        newIcon = 'bars';
      }

      if (serverMenuItem.subMenus && serverMenuItem.subMenus.length > 0) {
        return {
          ...localMenuItem,
          icon: newIcon,
          routeSign: serverMenuItem.routeSign,
          parentId: serverMenuItem.parentMenuId,
          name: serverMenuItem.menuName,
          path: serverMenuItem.url,
          routes: filterRoutes(serverMenuItem.subMenus, localMenuItem.routes),
        };
      }

      return {
        ...localMenuItem,
        routeSign: serverMenuItem.routeSign,
        parentId: serverMenuItem.parentMenuId,
        icon: newIcon,
        name: serverMenuItem.menuName,
        path: serverMenuItem.url,
      };
    })
    .filter(q => q);
};

export default {
  namespace: 'menu',

  state: {
    menuData: [
      {
        name: '通讯录',
        children: [
          {
            path: '/contacts/internal',
            name: '内部通讯录',
          },
          {
            path: '/contacts/staffmanage',
            name: '员工管理',
          },
          {
            path: '/contacts/housing',
            name: '业务通讯录-小区',
          },
          {
            path: '/contacts/buildingManage',
            name: '小区房屋管理',
          },
          {
            path: '/contacts/handle',
            name: '手写',
          },
        ],
        path: '/contacts',
      }
    ],
    routerData: [],
    breadcrumbNameMap: {},
    hideSilderMenu: false, // 是否隐藏左侧菜单，如果是配置在其他子应用路由中，需要隐藏
  },

  effects: {
    *getMenuData({ payload }, { call, put }) {
      // 这个方法一定要在获取菜单之前调用，不然菜单会获取不到，不知道有什么蜜汁操作在里面，明明是一个get方法

      let { menus } = yield call(getMenuData);
      if (menus.length === 0) {
        history.replace('/');
      } else {
        menus = menus?.filter(item => {
          if (item.routeSign === 'v2') {
            return item;
          }
        });
      }

      const { routes, authority } = payload;
      const newRoutes = filterRoutes(menus, routes);
      const originalMenuData = memoizeOneFormatter(newRoutes, authority);
      const allMenuData = filterMenuData(originalMenuData);
      let menuData = [];
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);

      if (query.parentUri) {
        menuData = [currentMenuData(allMenuData)];
      } else {
        menuData = allMenuData;
      }

      yield put({
        type: 'save',
        payload: {
          menuData,
          breadcrumbNameMap,
          routerData: newRoutes,
        },
      });
    },
    *setMenuData({ payload }, { put }) {
      const { routes, menus = [], collapsed, activeMenuIndex, hideSilderMenu } = payload;

      const originMenuData = menus[activeMenuIndex] ? menus[activeMenuIndex].subMenus : [];

      const menuData = generateMenu(originMenuData);

      const newRoutes = filterRoutes(menus, routes);
      // console.log(newRoutes, 'newRoutes');
      // const originalMenuData = memoizeOneFormatter(newRoutes);
      // console.log(originalMenuData, 'originalMenuData');
      // const allMenuData = filterMenuData(newRoutes);

      // // const menuData = generateMenu(originMenuData);

      // let menuData = [];
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(newRoutes);

      // if (query.parentUri) {
      //   menuData = [currentMenuData(allMenuData)];
      // } else {
      //   menuData = allMenuData;
      // }

      yield put({
        type: 'save',
        payload: { menuData, breadcrumbNameMap, routerData: newRoutes, hideSilderMenu },
      });

      yield put({
        type: 'global/save',
        payload: {
          collapsed,
          childrenList: menuData,
        },
      });
      // return Promise.resolve({ menuData, breadcrumbNameMap, routerData: newRoutes });
    },
    *judgeVersion({ pathname }, { select }) {
      const { breadcrumbNameMap } = yield select(state => state.menu);
      if (Object.keys(breadcrumbNameMap).length === 0) {
        return;
      }
      const pathnameArr = pathname.split('/').filter(q => q);
      if (pathnameArr.length === 0) {
        window.location.reload();
        return;
      }

      const last = pathnameArr[pathnameArr.length - 1];
      const home = last.indexOf('home') === 0;
      if (!home) {
        window.location.reload();
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
