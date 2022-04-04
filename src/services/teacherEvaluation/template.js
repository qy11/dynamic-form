import { stringify } from 'qs';
import request from '@/services/request';
import { url } from '../service-utils';

/**
 * 模板列表
 * 接口提供者：陈陈
 */
export async function queryTemplateList(payload) {
  return request(`${url.teacherEvaluation}/evaluate/template/list?${stringify(payload)}`);
}

/**
 * 模板详情
 * 接口提供者：陈陈
 */
export async function queryTemplateDetail(payload) {
  return request(`${url.teacherEvaluation}/evaluate/template/detail?${stringify(payload)}`);
}

/**
 * 删除模板
 * 接口提供者：陈陈
 */
export async function deleteTemplate(payload) {
  return request(`${url.teacherEvaluation}/evaluate/template/delete?${stringify(payload)}`);
}

/**
 * 新建模板
 * @param {object} params
 */
export async function addTemplateTask(params) {
  return request(`${url.teacherEvaluation}/evaluate/template/save`, {
    method: 'post',
    data: {
      ...params,
    },
  });
}
