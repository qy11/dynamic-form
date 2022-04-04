import React, { useState, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import { Drawer, Skeleton } from 'antd';
import { connect, history } from 'umi';
import { cloneDeep } from 'lodash';
import { ComposeForm } from 'suo-test';
// import ImagesUpload from 'ss-images-upload';
import { ButtonList } from 'suo-test/lib/components/button';
import useAsyncEffect from 'suo-test/lib/common/use-async-effect';
import comsMap from './coms-map';
import net from '@/services/net';
import avatarPNg from '../../assets/default-avatar.png';
import { url, getPathnameBybase } from '@/services/service-utils';
import styles from './index.less';

const REQUEST_URLS = {
  wisdom: {
    edit: '/wisdom/personnel/add/',
    detail: '/web/disabled/user/detail',
    delete: '/web/disabled/user/del',
    items: '/web/disabled/user/getStudentFormColumn',
  },
  employee: {
    detail: '/user/detail?displayDetail=2',
    edit: '/contacts/staffmanage/add/',
    delete: '/user/delete',
    items: '/web/view/internalDept/getAddUserView',
  },
};

const sexEnum = {
  '2': '女',
  '1': '男',
};

const personModal = props => {
  const { dispatch, visible, userId, type, params } = props;
  const [controls, setControls] = useState([]);
  const [baseData, setBaseData] = useState([]);
  const [title, setTitle] = useState(null);
  const [requesting, setRequesting] = useState(true);

  const hideDlg = useCallback(() => {
    // dispatch({ type: 'personnel/hide', });
    dispatch({
      type: 'person/save',
      payload: {
        visible: !visible,
      },
    });
  }, [visible]);
  const goEdit = useCallback(() => {
    // const pathName = `/wisdom/personnel/add/${userId}`;
    const pathName = REQUEST_URLS[type].edit + userId;
    history.push(`${pathName}?redirecUrl=${encodeURIComponent(getPathnameBybase())}`);
    hideDlg();
  }, [userId, type, params]);

  useAsyncEffect(async () => {
    if (!visible || !userId) return;
    // 获取相应的表单项
    setRequesting(true);
    const {
      data: { dataSource },
    } = await net(url.usercenter + REQUEST_URLS[type].items, { method: 'GET' });
    setBaseData(dataSource);
    // setControls(dataSource);

    setControls(
      dataSource
        .filter(item => {
          return item.name !== 'realName';
        })
        .filter(item => {
          return item.name !== 'sex';
        })
        .filter(item => {
          return item.name !== 'birthday';
        })
        .filter(item => {
          return item.name !== 'avatar';
        }),
    );
    setRequesting(false);
  }, [visible, userId, type]);

  useAsyncEffect(async () => {
    if (!visible || !userId) return;
    const {
      data: { formValue },
    } = await net(url.usercenter + REQUEST_URLS[type]?.detail, {
      method: 'GET',
      params: { userId },
    });
    const arr = cloneDeep(formValue);
    if (arr) {
      delete arr.realName;
      delete arr.avatar;
      delete arr.sex;
      delete arr.birthday;
    }
    if (!formValue?.avatar?.startsWith('http')) {
      const { data: files } = await net(
        `${url.file}/web/file/find?appCode=contacts&bizId=${formValue.userId}`,
      );
      console.log(files, 'files');
      if (files && files.length) {
        files.forEach(val => {
          const { formName, file } = val;
          formValue[formName] = file[0]?.url;
        });
      } else {
        formValue.avatar = avatarPNg;
      }
      setTitle(formValue);
    }

    setTitle(formValue);
  }, [visible, userId, type]);

  const footer = useMemo(() => {
    return (
      <div className={styles.footerWrapper}>
        {type !== 'wisdom' && (
          <ButtonList
            dataSource={[
              {
                text: '取消',
                onClick: hideDlg,
              },
              {
                uiType: 'request',
                text: '删除',
                confirmBeforeClick: {
                  content: '您确认要删除该用户吗？',
                },
                request: {
                  url: url.usercenter + REQUEST_URLS[type].delete,
                  method: 'POST',
                  params: {
                    idList: [userId],
                  },
                },

                onSuccess() {
                  history.go(0);
                },
                buttonProps: { loading: requesting },
              },
              {
                uiType: 'default',
                text: '修改',
                onClick: goEdit,
                buttonProps: { loading: requesting, type: 'primary' },
              },
            ]}
          />
        )}
      </div>
    );
  }, [requesting, type, userId, hideDlg]);
  return (
    <Drawer
      style={{
        top: 'unset',
        right: visible ? '24px' : '-360px',
        bottom: '49px',
        height: '580px',
        width: '360px',
        transition: 'all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1)',
      }}
      mask={false}
      className={classNames(styles.detailModal, styles.userModal)}
      visible={visible}
      onClose={hideDlg}
      footer={footer}
      title={
        <div className="user-title-content">
          {baseData.find(item => item.name === 'avatar') && (
            <img className="img" src={title?.avatar} alt="" />
          )}

          <div className="user-info">
            <p className="user-name" title={title?.realName}>
              {title?.realName?.length > 8
                ? `${title?.realName?.substring(0, 7)}...`
                : title?.realName}
            </p>
            {baseData.find(item => item.name === 'sex') && (
              <span>
                {title?.sex !== null || title?.birthday?.length > 0 ? (
                  <p className="user-card">
                    {title?.sex !== null ? (
                      <span className="user-sex">{sexEnum[title?.sex]}</span>
                    ) : null}
                    <span>{title?.birthday}</span>
                  </p>
                ) : null}
              </span>
            )}
          </div>
        </div>
      }
    >
      {visible && (
        <>
          {requesting ? (
            <>
              <div>
                <Skeleton.Avatar active size="large" />
              </div>
              <div style={{ marginTop: 15 }}>
                <Skeleton.Input style={{ width: 100 }} active /> :
                <Skeleton.Input style={{ width: 150, marginLeft: 5 }} active />
              </div>
              <div style={{ marginTop: 15 }}>
                <Skeleton.Input style={{ width: 100 }} active /> :
                <Skeleton.Input style={{ width: 150, marginLeft: 5 }} active />
              </div>
              <div style={{ marginTop: 15 }}>
                <Skeleton.Input style={{ width: 100 }} active /> :
                <Skeleton.Input style={{ width: 150, marginLeft: 5 }} active />
              </div>
              <div style={{ marginTop: 15 }}>
                <Skeleton.Input style={{ width: 100 }} active /> :
                <Skeleton.Input style={{ width: 150, marginLeft: 5 }} active />
              </div>
              <div style={{ marginTop: 15 }}>
                <Skeleton.Input style={{ width: 100 }} active /> :
                <Skeleton.Input style={{ width: 150, marginLeft: 5 }} active />
              </div>
            </>
          ) : (
            <ComposeForm
              controls={controls}
              comsMap={comsMap}
              hideRequiredMark
              labelCol={{ span: 8 }}
              labelAlign="left"
              initialValuesRequest={{
                url: url.usercenter + REQUEST_URLS[type]?.detail,
                method: 'GET',
                params: { userId },
              }}
            />
          )}
        </>
      )}
    </Drawer>
  );
};

export default connect(({ person }) => ({
  ...person,
}))(personModal);
