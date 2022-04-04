import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DynamicList from './modules';
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

  const initialDataFn = () => {
    const initialData = [];
    for (let i = 1; i < 2; i += 1) {
      initialData.push({ id: i });
    }
    return initialData;
  };

  // const [data, setData] = useState(initialDataFn());
  // const [data, setData] = useState(DATA);
  const [data, setData] = useState([[{ id: 1 }]]);

  const handleClick = () => {
    setData([...data, [{ id: data[data.length - 1][0].id + 1 }]]);
  };
  const handleDelParentList = num => {
    setData(data.filter(item => item[0].id !== num));
  };
  const handleSubmit = () => {
    const arr = [];
    console.log(paramsRef.current);
    const flatArr = paramsRef.current.flat(Infinity);
    // console.log('flatArr', flatArr);
    flatArr.forEach(it => {
      // eslint-disable-next-line no-unused-expressions
      (it?.getData || []).forEach(iv => {
        arr.push(iv);
      });
    });
    console.log('submit', arr);
  };
  return (
    <div className={styles['dynamic-list']}>
      {data.map((item, index) => (
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

/**

 */
