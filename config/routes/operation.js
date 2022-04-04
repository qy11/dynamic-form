const Microsite = '/operation';
export default {
  breadcrumbName: '运营平台',
  path: Microsite,
  routes: [
    {
      path: `${Microsite}/template`,
      component: './Operation/template',
      breadcrumbName: '行业模板',
      title: '运营平台'
    },

    {
      path: `${Microsite}/template/add`,
      component: './Operation/template/add',
      breadcrumbName: '新建',
      title: '运营平台'
    },
    {
      path: `${Microsite}/template/add/:id`,
      component: './Operation/template/add',
      breadcrumbName: '编辑',
      title: '运营平台'
    },
    {
      path: `${Microsite}/post-configuration`,
      component: './Operation/post-configuration',
      breadcrumbName: '岗位配置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/post-configuration/:treePath/*`,
      component: './Operation/post-configuration',
      breadcrumbName: '岗位配置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/rolemanagement`,
      component: './Operation/rolemanagement',
      breadcrumbName: '角色管理',
      title: '运营平台'
    },
    {
      path: `${Microsite}/rolemanagement/menu-operation`,
      component: './Operation/rolemanagement/menu-operation',
      breadcrumbName: '菜单操作权限',
      title: '运营平台'
    },
    {
      path: `${Microsite}/rolemanagement/add`,
      component: './Operation/rolemanagement/add',
      breadcrumbName: '基础设置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/rolemanagement/add/:id`,
      component: './Operation/rolemanagement/add',
      breadcrumbName: '基础设置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/adhibition`,
      component: './Operation/adhibition',
      breadcrumbName: '应用管理',
      title: '运营平台'
    },
    {
      path: `${Microsite}/adhibition/add`,
      component: './Operation/adhibition/add',
      breadcrumbName: '基础设置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/adhibition/add/:id`,
      component: './Operation/adhibition/add',
      breadcrumbName: '基础设置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/adhibition/associated`,
      component: './Operation/adhibition/associated',
      breadcrumbName: '关联套件',
      title: '运营平台'
    },
    {
      path: `${Microsite}/adhibition/associated/:appCode`,
      component: './Operation/adhibition/associated',
      breadcrumbName: '关联套件',
      title: '运营平台'
    },
    {
      path: `${Microsite}/menu`,
      component: './Operation/menu',
      breadcrumbName: '菜单权限管理',
      title: '运营平台'
    },
    {
      path: `${Microsite}/menu/:treePath/*`,
      component: './Operation/menu',
      breadcrumbName: '菜单权限管理',
      title: '运营平台'
    },
    {
      path: `${Microsite}/menu/add`,
      component: './Operation/menu/add',
      breadcrumbName: '菜单设置',
      title: '运营平台'
    },

    {
      path: `${Microsite}/organization`,
      component: './Operation/organization',
      breadcrumbName: '组织管理',
      title: '运营平台'
    },
    {
      path: `${Microsite}/organization/add`,
      component: './Operation/organization/add',
      breadcrumbName: '新建',
      title: '运营平台'
    },
    {
      path: `${Microsite}/organization/editor`,
      component: './Operation/organization/tabs',
      breadcrumbName: '编辑',
      title: '运营平台'
    },
    {
      path: `${Microsite}/organization/editor/*`,
      component: './Operation/organization/tabs',
      breadcrumbName: '编辑',
      title: '运营平台'
    },
    {
      path: `${Microsite}/organization/modules/impower`,
      component: './Operation/organization/modules/impower',
      breadcrumbName: '授权应用',
      title: '运营平台'
    },
    {
      path: `${Microsite}/organization/modules/impoweradd`,
      component: './Operation/organization/modules/impoweradd',
      breadcrumbName: '应用授权添加',
      title: '运营平台'
    },
    {
      path: `${Microsite}/organization/modules/menuimpow`,
      component: './Operation/organization/modules/menuimpow',
      breadcrumbName: '菜单管理',
      title: '运营平台'
    },
    {
      path: `${Microsite}/organization/modules/menuimpow/:treePath/*`,
      component: './Operation/organization/modules/menuimpow',
      breadcrumbName: '菜单管理',
      title: '运营平台'
    },
    // {
    //   path: `${Microsite}/organization/modules/rolemanger`,
    //   component: './Operation/organization/modules/rolemanger',
    //   breadcrumbName: '角色管理',
    // },

    {
      path: `${Microsite}/organization/modules/deptadd`,
      component: './Operation/organization/modules/deptadd',
      breadcrumbName: '添加自定义菜单',
      title: '运营平台'
    },
    {
      path: `${Microsite}/organization/modules/deptadd/:treePath/*`,
      component: './Operation/organization/modules/deptadd',
      breadcrumbName: '添加自定义菜单',
      title: '运营平台'
    },
    {
      path: `${Microsite}/organization/modules/rolemanger/:orgId`,
      component: './Operation/organization/modules/rolemanger',
      breadcrumbName: '角色管理',
      title: '运营平台'
    },
    {
      path: `${Microsite}/organization/modules/roleadd`,
      component: './Operation/organization/modules/roleadd',
      breadcrumbName: '添加角色',
      title: '运营平台'
    },
    {
      path: `${Microsite}/organization/modules/roleadd/:id`,
      component: './Operation/organization/modules/roleadd',
      breadcrumbName: '添加角色',
      title: '运营平台'
    },
    {
      path: `${Microsite}/organization/modules/basis`,
      component: './Operation/organization/modules/basis',
      breadcrumbName: '基础设置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/organization/modules/basis/:id`,
      component: './Operation/organization/modules/basis',
      breadcrumbName: '基础设置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/organization/modules/menu-operation`,
      component: './Operation/organization/modules/menu-operation',
      breadcrumbName: '组织-角色管理',
      title: '运营平台'
    },
    {
      path: `${Microsite}/organization/modules/people/:id`,
      component: './Operation/organization/modules/people',
      breadcrumbName: '人员选择',
      title: '运营平台'
    },
    {
      path: `${Microsite}/organization/modules/people-b/:id`,
      component: './Operation/organization/modules/people-b',
      breadcrumbName: '人员选择',
      title: '运营平台'
    },

    {
      path: `${Microsite}/cooperation`,
      component: './Operation/cooperation',
      breadcrumbName: '合作伙伴',
      title: '运营平台'
    },
    {
      path: `${Microsite}/cooperation/:treePath/*`,
      component: './Operation/cooperation',
      breadcrumbName: '合作伙伴',
      title: '运营平台'
    },
    {
      path: `${Microsite}/administrative`,
      component: './Operation/administrative',
      breadcrumbName: '行政区划管理',
      title: '运营平台'
    },
    {
      path: `${Microsite}/administrative/:treePath/*`,
      component: './Operation/administrative',
      breadcrumbName: '行政区划管理',
      title: '运营平台'
    },

    {
      path: `${Microsite}/workbench`,
      component: './Operation/workbench',
      breadcrumbName: '工作台',
      title: '运营平台'
    },

    {
      path: `${Microsite}/workbench/add`,
      component: './Operation/workbench/add',
      breadcrumbName: '配置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/workbench/add/:id`,
      component: './Operation/workbench/add',
      breadcrumbName: '配置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/configuration-b/:id`,
      component: './Operation/configuration-b',
      breadcrumbName: '配置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/configuration-a/:id`,
      component: './Operation/configuration-a',
      breadcrumbName: '配置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/configuration-c/:id`,
      component: './Operation/configuration-c',
      breadcrumbName: '配置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/business`,
      component: './Operation/business',
      breadcrumbName: '业务通讯录',
      title: '运营平台'
    },
    {
      path: `${Microsite}/business/*`,
      component: './Operation/business',
      breadcrumbName: '业务通讯录',
      title: '运营平台'
    },

    {
      path: `${Microsite}/tasklist`,
      component: './Operation/tasklist',
      breadcrumbName: '任务表配置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/wishList`,
      component: './Operation/wishList',
      breadcrumbName: '微心愿配置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/wishList/add`,
      component: './Operation/wishList/add',
      breadcrumbName: '新建',
      title: '运营平台'
    },
    {
      path: `${Microsite}/wishList/add/:id`,
      component: './Operation/wishList/add',
      breadcrumbName: '编辑',
      title: '运营平台'
    },
    {
      path: `${Microsite}/tasklist/add`,
      component: './Operation/tasklist/add',
      breadcrumbName: '新建',
      title: '运营平台'
    },
    {
      path: `${Microsite}/tasklist/add/:id`,
      component: './Operation/tasklist/add',
      breadcrumbName: '编辑',
      title: '运营平台'
    },
    {
      path: `${Microsite}/enumerate`,
      component: './Operation/enumerate',
      breadcrumbName: '枚举配置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/enumerate/add`,
      component: './Operation/enumerate/add',
      breadcrumbName: '新建',
      title: '运营平台'
    },
    {
      path: `${Microsite}/enumerate/add/:id`,
      component: './Operation/enumerate/add',
      breadcrumbName: '编辑',
      title: '运营平台'
    },
    {
      path: `${Microsite}/approver`,
      component: './Operation/approver',
      breadcrumbName: '审批人配置',
      title: '运营平台'
    },
    {
      path: `${Microsite}/approver/add`,
      component: './Operation/approver/add',
      breadcrumbName: '新建',
      title: '运营平台'
    },
    {
      path: `${Microsite}/approver/add/:id`,
      component: './Operation/approver/add',
      breadcrumbName: '编辑',
      title: '运营平台'
    },

    // {
    //   path: `${Microsite}/taskManagement/tasklist`,
    //   component: './Operation/taskManagement/tasklist',
    //   breadcrumbName: '任务表配置',
    // },
    // {
    //   path: `${Microsite}/taskManagement/tasklist/add`,
    //   component: './Operation/taskManagement/tasklist/add',
    //   breadcrumbName: '新建',
    // },
    // {
    //   path: `${Microsite}/taskManagement/tasklist/add/:id`,
    //   component: './Operation/taskManagement/tasklist/add',
    //   breadcrumbName: '编辑',
    // },
    // {
    //   path: `${Microsite}/taskManagement/enumerate`,
    //   component: './Operation/taskManagement/enumerate',
    //   breadcrumbName: '枚举配置',
    // },
    // {
    //   path: `${Microsite}/taskManagement/enumerate/add`,
    //   component: './Operation/taskManagement/enumerate/add',
    //   breadcrumbName: '新建',
    // },
    // {
    //   path: `${Microsite}/taskManagement/enumerate/add/:id`,
    //   component: './Operation/taskManagement/enumerate/add',
    //   breadcrumbName: '编辑',
    // },
    // {
    //   path: `${Microsite}/taskManagement/approver`,
    //   component: './Operation/taskManagement/approver',
    //   breadcrumbName: '审批人配置',
    // },
    // {
    //   path: `${Microsite}/taskManagement/approver/add`,
    //   component: './Operation/taskManagement/approver/add',
    //   breadcrumbName: '新建',
    // },
    // {
    //   path: `${Microsite}/taskManagement/approver/add/:id`,
    //   component: './Operation/taskManagement/approver/add',
    //   breadcrumbName: '编辑',
    // },
  ],
};
