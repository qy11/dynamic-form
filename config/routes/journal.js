const Microsite = '/setting';
export default {
  breadcrumbName: '系统设置',
  path: Microsite,
  routes: [
    {
      path: `${Microsite}/log`,
      component: './Journal/loglist',
      breadcrumbName: '操作日志',
      title: '系统设置'
    },
    {
      path: `${Microsite}/organize`,
      component: './Journal/organize',
      breadcrumbName: '基础设置',
      title: '系统设置'
    },
  ],
};
