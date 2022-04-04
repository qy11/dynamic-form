import { stringify } from 'qs';
import request from '@/services/request';
import { url } from '../service-utils';

/**
 * 我收到的任务页面
 * 我收到的任务列表
 * 接口提供者：陈陈
 */
export async function queryReceiveList(payload) {
  return request(`${url.teacherEvaluation}/evaluate/task/my/receive/list?${stringify(payload)}`);
}

/**
 * 我收到的任务页面
 * 开始指标接口
 * 接口提供者：陈陈
 */
export async function startFlow(payload) {
  return request(`${url.teacherEvaluation}/evaluate/task/user/index/start?${stringify(payload)}`);
}

/**
 * 我收到的任务详情页面
 * 任务详情
 * 接口提供者：蒋东明
 */
export async function queryReceiveDetail(payload) {
  return request(`${url.teacherEvaluation}/evaluate/task/my/receive/detail?${stringify(payload)}`);
}


/**
 * 获取当前appId下教师发展性评价下一条工作流待办数据
 * 接口提供者：蒋东明
 */
export async function getNextTodoByTask(params) {
  return request(`${url.teacherEvaluation}/evaluate/task/next/backlog?${stringify(params)}`);
}