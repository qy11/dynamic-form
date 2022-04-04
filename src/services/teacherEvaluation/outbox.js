import { stringify } from 'qs';
import request from '@/services/request';
import { url } from '../service-utils';

/**
 * 我发起的任务页面
 * 我发起的任务列表
 * 接口提供者：陈陈
 */
export async function queryPublishList(payload) {
  return request(`${url.teacherEvaluation}/evaluate/task/my/publish/list?${stringify(payload)}`);
}

/**
 * 我发起的任务页面
 * 我发布任务统计列表接口
 * 接口提供者：陈陈
 */
export async function queryStatisticsList(payload) {
  return request(
    `${url.teacherEvaluation}/evaluate/task/my/publish/statistics/list?${stringify(payload)}`,
  );
}

/**
 * 我发起的任务页面
 * 任务人员列表
 * @param {object} params
 */
export async function queryUserList(payload) {
  return request(`${url.teacherEvaluation}/evaluate/task/user/list?${stringify(payload)}`);
}

/**
 * 我发起的任务页面
 * 人员指标列表
 * @param {object} params
 */
export async function queryFlowList(payload) {
  return request(`${url.teacherEvaluation}/evaluate/task/user/index/list?${stringify(payload)}`);
}

/**
 * 我发起的页面
 * 一键催办接口
 * @type {string}
 */
export async function hasten(payload) {
  return request(`${url.teacherEvaluation}/evaluate/task/user/index/hasten?${stringify(payload)}`);
}

/**
 * 统计导出
 * @type {string}
 */
export async function exportTaskForm(payload) {
  return request(`//rdp3-download.xx.com/suxp/exportrdp/fzx?${stringify(payload)}`);
}

/**
 * 我发布的任务页面
 * 立即结束接口
 * @type {string}
 */
export async function endTask(payload) {
  return request(`${url.teacherEvaluation}/evaluate/task/end?${stringify(payload)}`);
}
