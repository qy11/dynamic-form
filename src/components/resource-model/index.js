import React, { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { Drawer, Skeleton } from 'antd';
import { connect } from 'umi';
import { cloneDeep } from 'lodash';
import { ComposeForm } from 'suo-test';
import useAsyncEffect from 'suo-test/lib/common/use-async-effect';
import comsMap from './coms-map';
import net from '@/services/net';
import { url } from '@/services/service-utils';
import styles from './index.less';

const REQUEST_URLS = {
  reso: {
    detail: '/pc/assets/resource/detail',
    items: '/pc/assets/deptView/getResource',
  },
};

const roseModal = props => {
  const { dispatch, visible, userId, type } = props;
  const [controls, setControls] = useState([]);
  const [requesting, setRequesting] = useState(true);
  const [formColumns, setFormColumns] = useState([]);
  const columns = [
    {
      uiType: '',
      name: 'name',
      label: '设备名称',
    },
    {
      uiType: '',
      name: 'code',
      label: '设备编号',
    },
    {
      uiType: '',
      name: 'typeDesc',
      label: '设备类型',
    },
    // {
    //   uiType: '',
    //   name: 'resourceName',
    //   label: '所属资源点',
    // },
  ];
  const hideDlg = useCallback(() => {
    // dispatch({ type: 'personnel/hide', });
    dispatch({
      type: 'reso/save',
      payload: {
        visible: !visible,
      },
    });
  }, [visible]);
  useEffect(() => {
    net(`${url?.usercenter}/pc/assets/equipment/findList`, {
      method: 'GET',
      params: {
        resourceId: userId,
      },
    }).then(({ data }) => {
      const _data = data?.dataSource;
      const list = _data.map(item => {
        const obj = {};
        columns.forEach(val => {
          const { name, label, uiType } = val;
          obj[name] = {
            label,
            value: item[name] || '-',
            uiType,
          };
        });
        return obj;
      });

      setFormColumns(list);
    });
  }, [userId]);

  useAsyncEffect(async () => {
    if (!visible || !userId) return;
    // 获取相应的表单项
    setRequesting(true);
    const {
      data: { dataSource },
    } = await net(url.usercenter + REQUEST_URLS[type].items, { method: 'GET' });

    setControls(dataSource);

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
  }, [visible, userId, type]);

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
            <>
              <ComposeForm
                controls={controls}
                comsMap={comsMap}
                hideRequiredMark
                labelCol={{ span: 8 }}
                labelAlign="left"
                initialValuesRequest={{
                  url: url.usercenter + REQUEST_URLS[type]?.detail,
                  method: 'GET',
                  params: {
                    id: userId,
                  },
                }}
              />
              <div>
                <p>已关联设备 :</p>
                {formColumns.map(item => {
                  return Object.keys(item).map(key => {
                    return (
                      <div>
                        <span>{item[key].label} : </span>
                        <span>{item[key].value}</span>
                      </div>
                    );
                  });
                })}
              </div>
            </>
          )}
        </>
      )}
    </Drawer>
  );
};

export default connect(({ reso }) => ({
  ...reso,
}))(roseModal);
