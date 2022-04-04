/* eslint-disable react/destructuring-assignment */
import { Breadcrumb } from 'antd';
import React from 'react';
import { history } from 'umi';
import menuRouters from '../../../config/routes/basics';
import { base } from '@/base';
import styles from './index.less';

const ROUTE_PARSING = (routers, pathname) => {
  if (!routers || !pathname) {
    return null;
  }
  const RESULT = [];
  function forFn(routersList) {
    routersList.map(item => {
      if (pathname.indexOf(base === '/' ? item.path : `${base}${item.path}`) === 0) {
        if (item.path !== '/') {
          RESULT.push({
            component: item.component,
            path: base === '/' ? item.path : `${base}${item.path}`,
            pathname: item.breadcrumbName,
            isClickable: item.routes && item.routes.length,
            disabled: item.disabled,
          });
        }
        if (item.routes) {
          forFn(item.routes);
        }
      }
      return null;
    });
  }
  forFn(routers);
  return RESULT;
};

const TO = (path, isPath, disabled) => {
  if (disabled) {
    return;
  }
  window.history.replaceState(null, null, `${path}${isPath ? window.location.search : ''}`);
};

const BreadcrumbView = route => {
  // eslint-disable-next-line react/destructuring-assignment
  const DATA_LIST = ROUTE_PARSING(menuRouters, route.pathname);
  const historyLength = window.history.length;
  return (
    <Breadcrumb className={styles['content-breadcrumb']}>
      {historyLength >= 2 && (
        <Breadcrumb.Item>
          <a
            onClick={() => {
              if (typeof route.onBack === 'function') {
                route.onBack();
                return;
              }
              history.goBack();
            }}
            className={styles['breadcrumb-go-back']}
          >
            返回
          </a>
        </Breadcrumb.Item>
      )}
      {DATA_LIST &&
        DATA_LIST.map((item, index) => {
          const { path, pathname, disabled, isClickable, component } = item;
          const isLab = path === route.pathname || isClickable;
          // 设计要求无对应路由页面时隐藏 component为空不可点击当前面包屑
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Breadcrumb.Item key={`${path}-key-${index}`}>
              {!isLab && path === '/' ? (
                ''
              ) : (
                <a
                  className="breadcrumb-menu-item"
                  style={{ pointerEvents: !component ? 'none' : 'auto' }}
                  onClick={() => TO(path, route.isPath, disabled)}
                >
                  {pathname}
                </a>
              )}
            </Breadcrumb.Item>
          );
        })}
    </Breadcrumb>
  );
};

export default BreadcrumbView;
