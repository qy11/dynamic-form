const Microsite = '/workstyle';
export default {
  breadcrumbName: '工作风采',
  path: Microsite,
  routes: [
    {
      path: `${Microsite}/classify`,
      component: './Workstyle/classify',
      breadcrumbName: '分类管理',
      title: '工作风采'
    },
    {
      path: `${Microsite}/classify/add`,
      component: './Workstyle/classify/add',
      breadcrumbName: '新建',
      title: '工作风采'
    },
    {
      path: `${Microsite}/classify/add/:id`,
      component: './Workstyle/classify/add',
      breadcrumbName: '查看',
      title: '工作风采'
    },

  ],
};
