const Microsite = '/property';
export default {
  breadcrumbName: '资产管理平台',
  path: Microsite,
  routes: [
    {
      path: `${Microsite}/platform`,
      component: './Property/platform',
      breadcrumbName: '资源平台管理',
      title: '资产管理平台'
    },
    {
      path: `${Microsite}/platform/:treePath/*`,
      component: './Property/platform',
      breadcrumbName: '资源平台管理',
      title: '资产管理平台'
    },
    {
      path: `${Microsite}/platform/add`,
      component: './Property/platform/add',
      breadcrumbName: '编辑',
      title: '资产管理平台'
    },
    {
      path: `${Microsite}/platform/add/:id`,
      component: './Property/platform/add',
      breadcrumbName: '编辑',
      title: '资产管理平台'
    },

    {
      path: `${Microsite}/resource`,
      component: './Property/resource',
      breadcrumbName: '资源点管理',
      title: '资产管理平台'
    },
    {
      path: `${Microsite}/resource/detail`,
      component: './Property/resource/detail',
      breadcrumbName: '详情',
      title: '资产管理平台'
    },
    {
      path: `${Microsite}/resource/detail/:id`,
      component: './Property/resource/detail',
      breadcrumbName: '详情',
      title: '资产管理平台'
    },
    {
      path: `${Microsite}/resource/add`,
      component: './Property/resource/add',
      breadcrumbName: '编辑',
      title: '资产管理平台'
    },
    {
      path: `${Microsite}/resource/add/:id`,
      component: './Property/resource/add',
      breadcrumbName: '编辑',
      title: '资产管理平台'
    },

    {
      path: `${Microsite}/equipment`,
      component: './Property/equipment',
      breadcrumbName: '设备管理',
      title: '资产管理平台'
    },
    {
      path: `${Microsite}/personalassets`,
      component: './Property/personalassets',
      breadcrumbName: '个人设备管理',
      title: '资产管理平台'
    },
    {
      path: `${Microsite}/equipment/tabs`,
      component: './Property/equipment/tabs',
      breadcrumbName: '配置',
      title: '资产管理平台'
    },
    {
      path: `${Microsite}/equipment/tabs/*`,
      component: './Property/equipment/tabs',
      breadcrumbName: '配置',
      title: '资产管理平台'
    },
  ],
};
