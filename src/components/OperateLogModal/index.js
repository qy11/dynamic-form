import React,{useState,useEffect} from 'react'
import { ComposeManage } from 'suo-test';
import { Modal } from 'antd';
import net from '@/services/net';
import { url } from '@/services/service-utils';

export default function Index({showModal,onModalClose,appCode,bizId}) {
  const [columns, setColumns] = useState([]);
  const [visible,setVisible] = useState(false);
  useEffect(() => {
    setVisible(showModal);
  },[showModal])

  useEffect(() => {
    net(`${url?.operation}/web/log/operation/getTableColumn`, {
      method: 'GET',
    }).then(({ data }) => {
      setColumns(data.dataSource);
    });
  }, []);

  const modalProps = {
    visible,
    onCancel: onModalClose,
    footer: null,
    width: 800,
    title: '操作日志'
  }
  const props = {
    dataRequest: {
      url: `${url.operation}/web/log/operation/app/page`,
      method: 'POST',
      params: {
        bizId,
        appCode
      }
    },
    filterSpan: 12,
    filterProps: [
      {
        type: 'dateTimeRangePicker',
        name: 'time',
        className: 'student-search-name',
        allowClear: true,
        valueType: 'dateRange',
        props: {
          format: 'YYYY-MM-DD HH:mm:ss',
          allowClear: true,
        },
        label: '操作时间',
      },
      {
        type: 'search',
        name: 'keyword',
        label: '相关数据',
        className: 'employee-search-name',
        allowClear: true,
        props: {
          placeholder: '请输入内容搜索',
        },
      },
    ],
    filterClassName: 'special-filter',
    tableProps: {
      primaryKey: 'key',
      otherKey: 'key',
      columns,
    },
  };

  return (
    <div>
      <Modal {...modalProps}>
        <ComposeManage {...props} />
      </Modal>
    </div>
  )
}
