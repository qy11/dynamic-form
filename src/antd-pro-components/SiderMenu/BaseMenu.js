/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import queryString from 'query-string';
import { Menu, Spin } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import styles from './index.less';

const query = queryString.parse(window.location.search);
const { SubMenu } = Menu;

export function getRouterData(routerMap) {
  const flattenRoute = flatten(routerMap);
  const routes = Object.keys(flattenRoute).map(path => flattenRoute[path]);
  return routes;
}

function flatten(routerMap, parentPath = '') {
  let routes = {};
  Object.keys(routerMap).forEach(path => {
    routes[parentPath + path] = {
      path: parentPath + path,
      key: path,
      name: routerMap[path].name,
      exact: routerMap[path].exact || true,
      component: routerMap[path].component,
      activeMenu: routerMap[path].activeMenu,
      configPath: routerMap[path].path,
    };
    if (routerMap[path].children) {
      routes = {
        ...routes,
        ...flatten(routerMap[path].children, path === '/' ? '' : parentPath + path),
      };
    }
  });
  return routes;
}

function getActiveKey(menuList, pathname, selectedKeys, openKeys, activeMenu) {
  let matchedItem = {};
  if (activeMenu) {
    matchedItem = menuList.find(({ path }) => path === activeMenu);
  } else {
    // matchedItem = menuList.find(
    //   ({ path }) => path && new RegExp(`^${path.replace(/\/*$/, '(\\/|$)')}`).test(pathname),
    // );
    matchedItem = menuList.find(
      ({ path }) =>
        path?.split('?')[0] &&
        new RegExp(`^${path?.split('?')[0].replace(/\/*$/, '(\\/|$)')}`).test(pathname),
    );
  }
  // 没有找到匹配的菜单项，则去所有下级节点中找
  if (!matchedItem) {
    const menuWithChildren = menuList.filter(_ => _.children && _.children.length);
    const matched = menuWithChildren.find(_ => {
      getActiveKey(_.children, pathname, selectedKeys, openKeys, activeMenu);
      if (selectedKeys.length) {
        return true;
      }
      return false;
    });
    if (matched) {
      selectedKeys.unshift(matched.path);
      openKeys.unshift(matched.path);
    }
    return;
  }
  // 如果没有子节点，则选中当前节点
  if (!matchedItem.children || !matchedItem.children.length) {
    selectedKeys.push(matchedItem.path);
    return;
  }
  // 递归在子节点中找，当前节点默认展开
  openKeys.push(matchedItem.path);
  // 尾调用优化
  getActiveKey(matchedItem.children, pathname, selectedKeys, openKeys);
}

const BaseMenu = props => {
  const {
    // openKeys,
    menuData,

    location,
  } = props;

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  // const { menuData, collapsed } = useSelector(state => state.menu);
  const configMenuDataFlatten = getRouterData(menuData);

  const currentMenuData = configMenuDataFlatten.find(({ configPath }) =>
    new RegExp(`^${configPath.replace(/\/*$/, '(\\/|$)')}`).test(location.pathname),
  );
  const activeMenu = currentMenuData?.activeMenu || '';

  // const onOpenChange = keys => {
  //   const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
  //   setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  // };

  useEffect(() => {
    // console.log('^' + url.replace(/\/*$/, '/'));
    const nextSelectedKeys = [];
    const nextOpenKeys = [];
    getActiveKey(menuData, location.pathname, nextSelectedKeys, nextOpenKeys, activeMenu);
    setSelectedKeys(nextSelectedKeys);
    setOpenKeys(Array.from(new Set([...openKeys, ...nextOpenKeys])));
  }, [menuData, location.pathname]);

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  const getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => getSubMenuOrMenuItem(item))
      .filter(item => item);
  };

  /**
   * get SubMenu or Item
   */
  const getSubMenuOrMenuItem = item => {
    if (item.children && item.children.length) {
      return (
        <SubMenu icon={<MenuOutlined />} key={item.path} title={<span>{item.name}</span>}>
          {item.children.map(m => getSubMenuOrMenuItem(m))}
        </SubMenu>
      );
    }
    const parentUri = query?.parentUri;
    if (item.hidden) return null;
    const newitemPath = !parentUri
      ? item.path
      : item.path?.indexOf('?') === -1
      ? `${item.path}?parentUri=${parentUri}`
      : `${item.path}&parentUri=${parentUri}`;

    return (
      <Menu.Item key={item.path} icon={<MenuOutlined />}>
        <Link to={newitemPath} replace={item.path === location.pathname}>
          <span className="menu-name-text">{item.name}</span>
        </Link>
      </Menu.Item>
    );
  };

  return (
    <Spin spinning={false}>
      <Menu
        className={styles['sider-menu']}
        theme="light"
        mode="inline"
        onOpenChange={setOpenKeys}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        // style={style}
        // className={cls}
      >
        {getNavMenuItems(menuData)}
      </Menu>
    </Spin>
  );
};

export default BaseMenu;
