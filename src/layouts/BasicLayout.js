/* eslint-disable import/extensions */
import React from 'react';
import { Layout, Modal } from 'antd';
import { connect, Helmet } from 'umi';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Media from 'react-media';
import SiderMenu from '@/antd-pro-components/SiderMenu';
import getPageTitle from '@/utils/getPageTitle';
import ErrorBoundary from '@/components/ErrorBoundary';
import PersonnelModal from '@/components/person-modal';
import CardModal from '@/components/card-modal';
import RoseModal from '@/components/resource-model';
import Context from './MenuContext';
import styles from './BasicLayout.less';

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.Component {
  componentDidMount() {
    // TODO: 在微前端生命周期中透传这些值
    // const {
    //   dispatch,
    //   route: { routes, authority },
    // } = this.props;
    // dispatch({
    //   type: 'selectSchool/fetchSchools',
    // }).then(() => {
    //   dispatch({
    //     type: 'user/fetchCurrent',
    //   }).then(() => {
    //     dispatch({
    //       type: 'menu/getMenuData',
    //       payload: { routes, authority },
    //     });
    //     dispatch({
    //       type: 'setting/getSetting',
    //     });
    //   });
    // });
  }

  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap,
    };
  }

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if (key === 'selectSchool') {
      return;
    }
    if (key === 'logout') {
      Modal.confirm({
        title: '是否确认退出平台',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          dispatch({
            type: 'login/logout',
          });
        },
      });
    }
  };

  render() {
    const {
      navTheme,
      children,
      location: { pathname },
      isMobile,
      menuData,
      breadcrumbNameMap,
      currentUser = {},
      // hideSilderMenu
    } = this.props;

    // console.log("hideSilderMenu", hideSilderMenu);
    // const { hideSilderMenu } = window;

    if (Object.keys(currentUser).length === 0) {
      return null;
    }

    let logoUrl;
    if (currentUser.orgId) {
      logoUrl = `http://classpic.oss-cn-hangzhou.aliyuncs.com/avatar/${currentUser.orgId}.jpg`;
    }

    // const isTop = PropsLayout === 'topmenu';
    // const isHome = window.location.pathname === '/';

    // 工作流界面配置
    const workFlowPage =
      window.location.href.indexOf('/v2/workFlow') > -1 ||
      window.location.href.indexOf('/v2/iframe/workFlow') > -1;
    const workFlowStyle = workFlowPage ? { background: '#fff' } : {};
    const layout = (
      <div className="wrapper">
        <Layout className={styles['wrapper-layout']}>
          <Layout
            className="wrapper-layout-body"
            style={{
              ...workFlowStyle,
            }}
          >
            <SiderMenu
              className={styles['home-sider']}
              logo={logoUrl}
              theme={navTheme}
              menuData={menuData}
              isMobile={isMobile}
              {...this.props}
            />
            {/* {(isTop && !isMobile) || isHome || hideSilderMenu ? null : (

            )} */}
            <ErrorBoundary>
              <Layout className="wrapper-layout-body-content">
                {children}
                {/* {hideSilderMenu && children}
                {!hideSilderMenu && menuData.length !== 0 && children} */}
              </Layout>
            </ErrorBoundary>
          </Layout>
        </Layout>
      </div>
    );
    return (
      <React.Fragment>
        {/* <DocumentTitle
          title={getPageTitle(pathname, breadcrumbNameMap) || currentUser.schoolName || ''}
        > */}
        <Helmet>
          <title>{getPageTitle(pathname, breadcrumbNameMap)}</title>
        </Helmet>
        <ContainerQuery query={query}>
          {params => (
            <Context.Provider value={this.getContext()}>
              <div
                style={{ overflowX: 'auto', height: '100%' }}
                id="width-scroll-container"
                className={classNames(params)}
              >
                {layout}
              </div>
            </Context.Provider>
          )}
        </ContainerQuery>
        {/* </DocumentTitle> */}
        <PersonnelModal />
        <CardModal />
        <RoseModal />
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting, menu: menuModel, user }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  currentUser: user.currentUser,
  hideSilderMenu: menuModel.hideSilderMenu,
  ...setting,
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
