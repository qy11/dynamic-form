import React, { useCallback } from 'react';
import { Typography } from 'antd';
import { getDvaApp } from 'umi';

const { Link } = Typography;
export default ({ tableProps: { record }, value, userType }) => {
  const gApp = getDvaApp();

  const showModal = useCallback(
    e => {
      e.preventDefault();

      gApp._store.dispatch({
        type: 'person/save',
        payload: {
          userId: record?.id,
          type: userType,
          visible: true,
        },
      });
    },
    [record.id, userType],
  );
  return (
    <Link href="#" ellipsis style={{ overflow: 'hidden' }} onClick={showModal} title={value}>
      {value}
    </Link>
  );
};
