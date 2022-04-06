/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { Select, Space, Input, InputNumber, DatePicker } from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import styles from './formItem.less';

const { Option } = Select;

const dateFormat = 'YYYY-MM-DD';

/**
 *
 * @param data ajax后端select的值
 * @param parentItem 父级遍历的内容  删除功能用
 * @param handleDelList 删除
 * @param handleFormItem onChange('type', 值, boolean)
 * @param parentNum 祖组件的index
 *
 * @returns
 */
const FormItemCom = ({ data, parentItem, handleDelList, handleFormItem, parentNum }) => {
  /**
   * @param type 类型
   * @param dataItem 显示的数据
   */
  const [type, setType] = useState(parentItem.code || '');
  const [dataItem, setDataItem] = useState({});

  /**
   * 可控组件 回显用
   */
  const [echo, setEcho] = useState(parentItem || {});

  useEffect(() => {
    if (type) {
      const dataItem = data.find(iv => iv.code === type);
      setDataItem(dataItem || {});
    } else {
      const dataItem = data.find(iv => iv.code === parentItem.code);
      setDataItem(dataItem || {});
    }
  }, [type]);

  useEffect(() => {
    // console.log('dataItem', dataItem);
  }, [dataItem]);

  const onChangeCode = value => {
    setEcho({ code: value });
    setDataItem({});
    setType(value);
    handleFormItem({ parentNum, type: 'code', value, id: parentItem.id, reFresh: true });
  };

  const fnMin = params => {
    const minNum = params.toString().split('-');
    return Number(minNum[0]);
  };
  const fnMax = params => {
    const maxNum = params.toString().split('-');
    return Number(maxNum[1]);
  };
  const handleOptionCondition = value => {
    setEcho({ ...echo, optionCondition: value });
    handleFormItem({ parentNum, type: 'optionCondition', value, id: parentItem.id });
  };

  const selectFn = (params = []) => {
    return (
      <Select style={{ width: 88 }} onChange={handleOptionCondition} value={echo.optionCondition}>
        {params.map((item, idx) => (
          <Option value={item} key={idx}>
            {item}
          </Option>
        ))}
      </Select>
    );
  };

  const handleDefaultValue = value => {
    setEcho({ ...echo, defaultValue: value });
    handleFormItem({ parentNum, type: 'defaultValue', value, id: parentItem.id });
  };

  const handleDefaultValueDate = (date, dateString) => {
    console.log('date', date, dateString);
    setEcho({ ...echo, defaultValue: dateString });
    handleFormItem({ parentNum, type: 'defaultValue', value: dateString, id: parentItem.id });
  };

  const dynamicRest = (type, dataItem) => {
    if (!isEmpty(dataItem)) {
      switch (type) {
        case 'age':
          return (
            <>
              {selectFn(dataItem?.optionConditions)}
              <InputNumber
                min={fnMin(dataItem.defaultValues)}
                max={fnMax(dataItem.defaultValues)}
                onChange={handleDefaultValue}
                value={echo.defaultValue}
              />
            </>
          );
        case 'birthday':
          return (
            <>
              {selectFn(dataItem?.optionConditions)}
              <DatePicker
                onChange={handleDefaultValueDate}
                format={dateFormat}
                value={echo?.defaultValue ? moment(echo?.defaultValue || '', dateFormat) : ''}
              />
            </>
          );
        case 'confinement_date':
          return (
            <>
              {selectFn(dataItem?.optionConditions)}
              <DatePicker
                onChange={handleDefaultValueDate}
                format={dateFormat}
                value={echo?.defaultValue ? moment(echo?.defaultValue || '', dateFormat) : ''}
              />
            </>
          );
        case 'gestational_weeks':
          return (
            <>
              {selectFn(dataItem?.optionConditions)}
              <InputNumber
                min={fnMin(dataItem.defaultValues)}
                max={fnMax(dataItem.defaultValues)}
                onChange={handleDefaultValue}
                value={echo?.defaultValue || ''}
              />
            </>
          );
        case 'user_type':
          return (
            <>
              {selectFn(dataItem?.optionConditions)}
              <Select style={{ width: 88 }} onChange={handleDefaultValue} value={echo.defaultValue}>
                {dataItem?.defaultValues.map((item, idx) => (
                  <Option value={item} key={idx}>
                    {item}
                  </Option>
                ))}
              </Select>
            </>
          );
        case 'sex':
          return (
            <>
              {selectFn(dataItem?.optionConditions)}
              <Select style={{ width: 88 }} onChange={handleDefaultValue} value={echo.defaultValue}>
                {dataItem?.defaultValues.map((item, idx) => (
                  <Option value={item} key={idx}>
                    {item}
                  </Option>
                ))}
              </Select>
            </>
          );
        case 'label_id':
          return (
            <>
              {selectFn(dataItem?.optionConditions)}
              <Input />
            </>
          );
        default:
          return <div />;
      }
    } else {
      return (
        <>
          <Input />
          <Input />
        </>
      );
    }
  };

  return (
    <section className={styles['ssp-form-item']}>
      <Space>
        <Select style={{ width: '200px' }} onChange={onChangeCode} value={echo.code}>
          {data.map((params, idx) => (
            <Option value={params.code} key={idx}>
              {params.name}
            </Option>
          ))}
        </Select>
        {dynamicRest(type, dataItem)}
        {parentItem.id !== 1 && (
          <span className={styles['item-del']} onClick={() => handleDelList(parentItem.id)}>
            删除
          </span>
        )}
      </Space>
    </section>
  );
};

export default FormItemCom;
