const Microsite = '/notification';
export default {
  breadcrumbName: '通知业务模型',
  path: Microsite,
  routes: [
    // {
    //   path: `${Microsite}/readingComponent`,
    //   component: './Notification/readingComponent',
    //   breadcrumbName: '阅读组件',
    // },
    {
      path: `${Microsite}/readingComponent`,
      component: './Notification/readingComponent',
      breadcrumbName: '阅读组件',
    },
  ],
};
