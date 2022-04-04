/* eslint-disable no-unused-expressions */

import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { title } from '../defaultSettings';

export const matchParamsPath = (pathname, breadcrumbNameMap) => {
  const pathKey = Object.keys(breadcrumbNameMap).find(key => {
    return pathname.includes(key);
  });
  return breadcrumbNameMap[pathKey];
};

const getPageTitle = (pathname, breadcrumbNameMap) => {
  const currRouterData = matchParamsPath(pathname, breadcrumbNameMap);
  const webTitle = currRouterData?.name;
  return webTitle || title;
};

export default memoizeOne(getPageTitle, isEqual);
