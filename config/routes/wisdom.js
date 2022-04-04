const Microsite = '/wisdom';
export default {
  breadcrumbName: '智慧助残',
  path: Microsite,
  routes: [
    {
      path: `${Microsite}/internal`,
      component: './Wisdom/internal',
      breadcrumbName: '残疾人之家',
      title: '智慧助残'
    },
    {
      path: `${Microsite}/internal/:treePath/*`,
      component: './Wisdom/internal',
      breadcrumbName: '残疾人之家',
      title: '智慧助残'
    },
    {
      path: `${Microsite}/personnel`,
      component: './Wisdom/personnel',
      breadcrumbName: '残疾人信息库',
      title: '智慧助残'
    },
    {
      path: `${Microsite}/personnel/add`,
      component: './Wisdom/personnel/add',
      breadcrumbName: '添加学生',
      title: '智慧助残'
    },
    {
      path: `${Microsite}/personnel/add/:id`,
      component: './Wisdom/personnel/add',
      breadcrumbName: '编辑信息',
      title: '智慧助残'
    },
    {
      path: `${Microsite}/personnel/modules/field`,
      component: './Wisdom/personnel/modules/field',
      breadcrumbName: '设置字段',
      title: '智慧助残'
    },
    {
      path: `${Microsite}/business`,
      component: './Wisdom/business',
      breadcrumbName: '残疾人业务对象管理',
      title: '智慧助残'
    },
  ],
};
