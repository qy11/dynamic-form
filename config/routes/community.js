const Microsite = '/community';
export default {
  breadcrumbName: '社区通讯录',
  path: Microsite,
  routes: [
    {
      path: `${Microsite}/housing`,
      component: './Community/housing',
      breadcrumbName: '业务社区通讯录-小区',
      title: '社区通讯录'
    },
    {
      path: `${Microsite}/housing/:treePath/*`,
      component: './Community/housing',
      breadcrumbName: '业务社区通讯录-小区',
      title: '社区通讯录'
    },
    {
      path: `${Microsite}/position/add`,
      component: './Community/housing/add',
      breadcrumbName: '添加小区',
      title: '社区通讯录'
    },
    {
      path: `${Microsite}/position/add/:id`,
      component: './Community/housing/add',
      breadcrumbName: '添加小区',
      title: '社区通讯录'
    },
    {
      path: `${Microsite}/buildingManage`,
      component: './Community/buildingManage',
      breadcrumbName: '小区房屋管理',
      title: '社区通讯录'
    },
    {
      path: `${Microsite}/buildingManage/detail`,
      component: './Community/buildingManage/detail',
      breadcrumbName: '详情',
      title: '社区通讯录'
    },
    {
      path: `${Microsite}/buildingManage/detail/:id`,
      component: './Community/buildingManage/detail',
      breadcrumbName: '详情',
      title: '社区通讯录'
    },
    {
      path: `${Microsite}/buildingManage/add`,
      component: './Community/buildingManage/add',
      breadcrumbName: '编辑',
      title: '社区通讯录'
    },
    {
      path: `${Microsite}/buildingManage/add/:id`,
      component: './Community/buildingManage/add',
      breadcrumbName: '编辑',
      title: '社区通讯录'
    },
    {
      path: `${Microsite}/resident`,
      component: './Community/resident',
      breadcrumbName: '社区居民列表',
      title: '社区通讯录'
    },
    {
      path: `${Microsite}/notbound`,
      component: './Community/notbound',
      breadcrumbName: '未绑定临时房屋管理',
      title: '社区通讯录'
    },
    {
      path: `${Microsite}/crowd`,
      component: './Community/crowd',
      breadcrumbName: '居民群管理',
      title: '社区通讯录'
    },
    {
      path: `${Microsite}/crowd/detail`,
      component: './Community/crowd/Detail',
      breadcrumbName: '居民群详情',
      title: '社区通讯录'
    },
    {
      path: `${Microsite}/crowd/detail/:id`,
      component: './Community/crowd/Detail',
      breadcrumbName: '居民群详情',
      title: '社区通讯录'
    },
    {
      path: `${Microsite}/houseManage`,
      component: './Community/houseManage',
      breadcrumbName: '社区房屋管理',
      title: '社区通讯录'
    },
    {
      path: `${Microsite}/houseManage/detail`,
      component: './Community/houseManage/detail',
      breadcrumbName: '详情',
      title: '社区通讯录'
    },
    {
      path: `${Microsite}/houseManage/detail/:id`,
      component: './Community/houseManage/detail',
      breadcrumbName: '详情',
      title: '社区通讯录'
    },
    {
      path: `${Microsite}/houseManage/add`,
      component: './Community/houseManage/add',
      breadcrumbName: '编辑',
      title: '社区通讯录'
    },
    {
      path: `${Microsite}/houseManage/add/:id`,
      component: './Community/houseManage/add',
      breadcrumbName: '编辑',
      title: '社区通讯录'
    },
  ],
};
