/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
// import DynamicFormList from './modules/dynamicformList'
import DynamicFormList from './modules/index'
import styles from './index.less'

const FormItem = Form.Item;

const { Option } = Select
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
const initial = {
  // fieldKey: 0,
  // isListField: true,
  // key: 0,
  // name: 0,
  orange: '100',
  price: '111',
  sight: 'jack'
}
const initialArrFn = () => {
  const initialObj = {}
  for (let i = 1; i < 30; i++) {
    initialObj[`name${i}`] = [initial, initial]
    initialObj[`relation${i}`] = '1'
  }
  return initialObj
}

const DynamicFieldSet = () => {

  const initialDataFn = () => {
    const initialData = []
    for (let i = 1; i < 3; i++) {
      initialData.push({ key: i })
    }
    return initialData
  }

  const [count, setCount] = useState(initialDataFn()?.length || 1)
  const [data, setData] = useState(initialDataFn());


  useEffect(() => {
    if (count !== 1 && count !== initialDataFn()?.length) {
      setData([...data, { key: count }]);
    }
  }, [count]);

  const handleAddClick = () => {
    setCount(c => c + 1)
  }

  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form:', values);
  };
  const handleDelList = (num) => {
    setData(data.filter(item => item.key !== num))
  }

  console.log("||", initialArrFn());

  return (
    <Form
      className={styles.dynamic_form}
      name="dynamic_form_item"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      initialValues={{
        ...initialArrFn()
      }}
    >
      {
        data.map((item) => <DynamicFormList key={nanoid()} form={form} count={item.key} handleDelList={handleDelList} />)
      }
      <div>
        <span onClick={handleAddClick}>增加一组规则</span>
      </div>
      <FormItem>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormItem>
    </Form>
  );
};

export default DynamicFieldSet