import { stringify } from 'qs';
import request from '../request';
import { url } from '../service-utils';

// 上传附件
export function addFileUpdate(params) {
  return request(`${url.fileApi}/file/upload`, {
    headers: { 'Content-Type': 'multipart/form-data' },
    data: params,
    method: 'post',
  });
}

// 删除附件
export function deleteFile(params) {
  return request(`${url.fileApi}/file/delete?${stringify(params)}`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: params,
    method: 'DELETE',
  });
}

// 查看附件列表
export function getFile(params) {
  return request(`${url.fileApi}/file/get?${stringify(params)}`);
}

// 获取阿里云上传相关参数
export function getStsToken() {
  return request(`${url.fileApi}/file/getStsToken`);
}
