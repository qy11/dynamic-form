const Microsite = '/contacts';
export default {
  breadcrumbName: '通讯录',
  path: Microsite,
  routes: [
    {
      path: `${Microsite}/internal`,
      component: './Contacts/internal',
      breadcrumbName: '内部通讯录',
      title: '通讯录'
    },
    {
      path: `${Microsite}/internal/:treePath/*`,
      component: './Contacts/internal',
      breadcrumbName: '内部通讯录',
      title: '通讯录'
    },
    {
      path: `${Microsite}/staffmanage`,
      component: './Contacts/staffmanage',
      breadcrumbName: '员工管理',
      title: '通讯录'
    },
    {
      path: `${Microsite}/housing`,
      component: './Contacts/housing',
      breadcrumbName: '业务通讯录-小区',
      title: '通讯录'
    },
    {
      path: `${Microsite}/buildingManage`,
      component: './Contacts/buildingManage',
      breadcrumbName: '小区房屋管理',
      title: '通讯录'
    },
    {
      path: `${Microsite}/handle`,
      component: './Contacts/handle',
      breadcrumbName: '手写',
      title: '通讯录'
    },
  ],
};
