import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import FormItem from './formItem';
import mockData from '../query.json';
import styles from './index.less';
import delSvg from '@/assets/icon/icon-delete.svg';

const { Option } = Select;

const relationArr = [
  {
    label: '并且',
    value: 'and',
  },
  {
    label: '或者',
    value: 'or',
  },
];

function Modules(props, ref) {
  /**
   * @param num 删除用
   * @param handleDelParentList 删除函数
   * @param grandItem item
   * @param grandIndex index
   */

  const { num, handleDelParentList, grandItem, grandIndex } = props;

  const initialDataFn = () => {
    const initialDataChild = [];
    for (let i = 0; i < 1; i += 1) {
      initialDataChild.push({ key: i });
    }
    return initialDataChild;
  };

  /**
   * 回显的数据
   */
  const [data, setData] = useState(grandItem || []);

  /**
   * 需要返回的数据
   */
  const [outParams, setOutParams] = useState(grandItem || []);

  const setOutPutData = () => {
    const bufferArr = mockData.data.filter(item => outParams.some(iv => iv.code === item.code));
    // console.log('bufferArr', bufferArr);
    // console.log('==outParams~~', outParams);

    const finalArr = [];

    outParams.forEach(it => {
      bufferArr.forEach(buffer => {
        if (it.code === buffer.code) {
          finalArr.push({
            ...it,
            name: buffer?.name,
            ruleType: buffer?.type,
            key: it.id,
          });
        }
      });
    });
    return finalArr;
  };

  useImperativeHandle(ref, () => ({
    getData: setOutPutData(),
  }));

  useEffect(() => {
    // console.log('outParams', outParams);
  }, [outParams]);

  const handleClick = () => {
    setData([...data, { key: data[data.length - 1].key + 1 }]);
  };

  const handleDeleteList = params => {
    setData(data.filter(item => item.key !== params));
    setOutParams(outParams.filter(item => item.id !== params));
  };

  const handleTitleSelect = e => {
    // setData([...data, { key: data[data.length - 1].key + 1 }]);
    data.map((iv, idx) => ({
      ...data,
      groupCondition: e.value,
      key: idx,
    }));
    console.log('title', e, outParams);

    let newParams = [];

    if (grandIndex === 1) {
      newParams = outParams.map(item => ({
        ...item,
        groupCondition: '',
        key: item.id,
      }));
    } else {
      newParams = outParams.map(item => ({
        ...item,
        groupCondition: e.value,
        key: item.id,
      }));
    }
    setOutParams([...newParams]);
  };

  const handleFormItem = ({ parentNum, type, value, reFresh, id }) => {
    const params = {
      [type]: value,
      groupNum: parentNum,
      id,
    };

    const isIndex = outParams.findIndex(item => item.id === id);
    if (isIndex > -1) {
      if (reFresh) {
        outParams[isIndex] = params;
        setOutParams([...outParams]);
        return;
      }
      outParams[isIndex] = {
        ...outParams[isIndex],
        [type]: value,
      };
      setOutParams([...outParams]);
      return;
    }
    setOutParams([...outParams, params]);
  };

  return (
    <section className={styles['ssp-form-list']}>
      {grandIndex !== 0 && (
        <Select
          labelInValue
          className={styles['relation-select']}
          name="groupCondition"
          onChange={handleTitleSelect}
          value={data[0].groupCondition}
        >
          {relationArr.map(item => (
            <Option key={item.value} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      )}
      <section className="ssp-form">
        <div className="label-title">第{grandIndex + 1}组</div>
        <div className="form-item">
          {data.map(item => (
            <FormItem
              key={item.key}
              data={mockData.data}
              parentItem={item}
              parentNum={grandIndex}
              handleDeleteList={handleDeleteList}
              handleFormItem={handleFormItem}
            />
          ))}
          <p className="add-text">
            <span onClick={handleClick}>
              <PlusOutlined /> 增加规则
            </span>
          </p>
          {grandIndex !== 0 && (
            <img
              src={delSvg}
              alt=""
              className="icon-delList"
              onClick={() => handleDelParentList(num)}
            />
          )}
        </div>
      </section>
    </section>
  );
}

export default forwardRef(Modules);
