import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DynamicList from './modules';
import mockDATA from './data.json';
import { sortMulArr } from './modules/utils';
import net from '@/services/net';
import { url, getPathnameBybase } from '@/services/service-utils';
import styles from './index.less';

const DATA = [
  [
    {
      id: 1,
      code: 'age',
      defaultValue: '19',
      groupNum: 1,
      groupCondition: '',
      name: '年龄',
      optionCondition: '>=',
      ruleCondition: '',
      ruleType: 1,
    },
    {
      id: 2,
      code: 'sex',
      defaultValue: '1',
      groupNum: 1,
      groupCondition: '',
      name: '性别',
      optionCondition: '=',
      ruleCondition: 'and',
      ruleType: 1,
    },
  ],
  [
    {
      id: 3,
      code: 'label_id',
      defaultValue: '(1)',
      groupNum: 2,
      groupCondition: 'and',
      name: '关联标签',
      optionCondition: 'in',
      ruleCondition: '',
      ruleType: 1,
    },
  ],
];

function Handle() {
  const paramsRef = useRef([]);

  // const initialDataFn = () => {
  //   const initialData = [];
  //   for (let i = 1; i < 2; i += 1) {
  //     initialData.push({ id: i });
  //   }
  //   return initialData;
  // };

  // const [columns, setColumns] = useState([]);
  const [columns, setColumns] = useState(sortMulArr(mockDATA.ruleConditionList, 'groupNum'));
  // const [columns, setColumns] = useState([[{ id: 1 }]]);

  useEffect(() => {
    net(`http://192.168.2.126:8080/web/label/rule/detail`, {
      method: 'GET',
      params: {
        id: 40,
      },
    }).then(res => {
      console.log('ajax', res);
      const { data } = res;
      // setColumns(sortMulArr(data.ruleConditionList, 'groupNum'));
    });
  }, []);

  const handleClick = () => {
    setColumns([...columns, [{ id: columns[columns.length - 1][0].id + 1 }]]);
  };
  const handleDelParentList = num => {
    setColumns(columns.filter(item => item[0].id !== num));
  };
  const handleSubmit = () => {
    const arr = [];
    console.log(paramsRef.current);
    const flatArr = paramsRef.current.flat(Infinity);
    flatArr.forEach(it => {
      (it?.getData || []).forEach(iv => {
        arr.push(iv);
      });
    });
    console.log('submit', arr);
  };
  return (
    <div className={styles['dynamic-list']}>
      {columns.map((item, index) => (
        <DynamicList
          key={item[0].id}
          num={item[0].id}
          grandIndex={index}
          ref={f => {
            paramsRef.current[item[0].id] = f;
          }}
          grandItem={item}
          handleDelParentList={handleDelParentList}
        />
      ))}

      <p className={styles['add-text']}>
        <span onClick={handleClick}>
          <PlusOutlined />
          增加一组规则
        </span>
        <Button onClick={handleSubmit}>提交</Button>
      </p>
    </div>
  );
}

export default Handle;
