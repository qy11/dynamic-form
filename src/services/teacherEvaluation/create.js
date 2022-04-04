import { stringify } from 'qs';
import request from '@/services/request';
import { url } from '../service-utils';

/**
 * 新建任务页面
 * 指标列表
 * 接口提供者：陈陈
 */
export async function queryWorkflowList(payload) {
  return request(`${url.teacherEvaluation}/evaluate/task/workflow/list?${stringify(payload)}`);
}

/**
 * 新建任务页面
 * 新建任务
 * @param {object} params
 */
export async function addTask(params) {
  return request(`${url.teacherEvaluation}/evaluate/task/save`, {
    method: 'post',
    data: {
      ...params,
    },
  });
}
