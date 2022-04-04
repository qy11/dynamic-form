const Microsite = '/taskManagement';
export default {
  breadcrumbName: '运营平台',
  path: Microsite,
  routes: [
    {
      path: `${Microsite}/tasklist`,
      component: './Operation/taskManagement/tasklist',
      breadcrumbName: '任务表配置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/tasklist/add`,
      component: './Operation/taskManagement/tasklist/add',
      breadcrumbName: '新建',
      title: '运营平台'
    },
    {
      path: `${Microsite}/tasklist/add/:id`,
      component: './Operation/taskManagement/tasklist/add',
      breadcrumbName: '编辑',
      title: '运营平台'
    },
    {
      path: `${Microsite}/enumerate`,
      component: './Operation/taskManagement/enumerate',
      breadcrumbName: '枚举配置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/enumerate/add`,
      component: './Operation/taskManagement/enumerate/add',
      breadcrumbName: '新建',
      title: '运营平台'
    },
    {
      path: `${Microsite}/enumerate/add/:id`,
      component: './Operation/taskManagement/enumerate/add',
      breadcrumbName: '编辑',
      title: '运营平台'
    },
    {
      path: `${Microsite}/approver`,
      component: './Operation/taskManagement/approver',
      breadcrumbName: '审批人配置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/approver/add`,
      component: './Operation/taskManagement/approver/add',
      breadcrumbName: '新建',
      title: '运营平台'
    },
    {
      path: `${Microsite}/approver/add/:id`,
      component: './Operation/taskManagement/approver/add',
      breadcrumbName: '编辑',
      title: '运营平台'
    },
  ],
};
