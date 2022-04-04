/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import delRedIcon from '@/assets/icon/del-red.svg';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 22 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 22, offset: 3 },
  },
};
const formItemAddRules = {
  wrapperCol: {
    xs: { span: 4 },
    sm: { span: 3, offset: 3 },
  },
};
const DynamicFormList = ({ count, handleDelList }) => {
  const [isShowFirst, setIsShowFirst] = useState('');
  const handleSelect = (val) => {
    console.log(val);
    setIsShowFirst(val)
  }
  return (
    <div className={styles['ssp-dynamic-list']}>
      {
        count !== 1 && (
          <FormItem noStyle name={`relation${count}`}>
            <Select style={{ width: '244px' }} placeholder="关联关系" className={styles['ssp-select']}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>
          </FormItem>
        )
      }
      <div className={styles['ssp-dynamic-form']}>
        <Form.List
          name={`name${count}`}
          className={styles.formList}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {/* {console.log('fields', fields)} */}
              {fields.map((field, index) => (
                <FormItem
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? `第${count}组` : ''}
                  required={false}
                  key={field.key}
                >
                  <Space>
                    <FormItem
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      noStyle
                      name={[field.name, 'sight']}
                    >
                      <Select style={{ width: '244px' }} onChange={handleSelect}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                    </FormItem>
                    {/* {
                      isShowFirst === 'jack' ? (
                        <FormItem
                          {...field}
                          noStyle
                          name={[field.name, 'again']}
                        >
                          <Select style={{ width: '244px' }}>
                            <Option value="jack">1</Option>
                            <Option value="lucy">2</Option>
                            <Option value="Yiminghe">3</Option>
                          </Select>
                        </FormItem>
                      ) : ''
                    } */}
                    <FormItem
                      {...field}
                      name={[field.name, 'price']}
                      noStyle
                    >
                      <Input style={{ width: '88px' }} />
                    </FormItem>
                    <FormItem
                      {...field}
                      name={[field.name, 'orange']}
                      validateTrigger={['onChange', 'onBlur']}
                      noStyle
                    >
                      <Select style={{ width: '244px' }}>
                        <Option value="100">100</Option>
                        <Option value="101">101</Option>
                      </Select>
                    </FormItem>
                    {field?.name !== 0 ? (
                      <span className={styles.del} onClick={() => remove(field.name)}>
                        删除
                      </span>
                    ) : null}
                  </Space>
                </FormItem>
              ))}

              <FormItem {...formItemAddRules}>
                <span onClick={() => add()} className={styles['add-rules']}>
                  <PlusOutlined /> 增加规则
                </span>
                <Form.ErrorList errors={errors} />
              </FormItem>
              {/* {count !== 1 && (
                <img
                  src={delRedIcon}
                  className={styles['icon-delList']}
                  onClick={() => handleDelList(count)}
                />
              )} */}
            </>
          )}
        </Form.List>
      </div>
    </div>
  );
};

export default DynamicFormList;
