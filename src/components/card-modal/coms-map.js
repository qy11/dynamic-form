import React from 'react';
import Text from 'suo-test/lib/components/compose-form/mod/text';
import Avatar from 'suo-test/lib/components/compose-form/mod/avatar';
import { mapProps } from 'recompose';
import UserText from '@/components/card-text';

const ArrayText = ({ id, value }) => {
  if (!value?.length) {
    return '-';
  }
  return (
    <div className="cf-form-text-item">
      {(value || []).map((item, index) => {
        // “教职工”详情显示特殊处理
        if (id === 'deptIds') {
          return (
            <div key={index} className="cf-form-text-item-teacher">
              <span className="cf-form-text-item-teacher_label">部门：</span>
              <span className="cf-form-text-item-teacher_value">{item}</span>
            </div>
          );
        }
        return <div key={index}>{item}</div>;
      })}
    </div>
  );
};

// @ts-ignore
const SelectUser = mapProps(({ id, value }) => ({
  id,
  value: (value || []).map(({ name }) => (id === 'deptIds' ? `${name}` : `${name}`)),
}))(ArrayText);

const Select = mapProps(({ value, dataSource }) => {
  return {
    value: (dataSource || []).find(v => v.value === value)?.label,
  };
})(Text);

// const SelectClass = mapProps(({ value }) => {
//   const { baseSchoolDepts, customSchoolDepts } = value || {};
//   const result = [];
//   if (baseSchoolDepts && baseSchoolDepts.length > 0) {
//     // 基础校区单选，只取第一项
//     result.push(
//       <div style={{ paddingRight: '10px' }}>
//         <div style={{ marginTop: '2px', fontWeight: 'bold', color: '#000' }}>基础校区：</div>
//         <div style={{ marginTop: '2px', lineHeight: '20px' }}>
//           <span style={{ color: 'rgba(0, 0, 0, .45)' }}>班级：</span>
//           <span style={{ wordBreak: 'break-all' }}>{baseSchoolDepts[0].fullPath}</span>
//         </div>
//       </div>,
//     );
//   }
//   if (customSchoolDepts && customSchoolDepts.length > 0) {
//     result.push(
//       <div style={{ paddingRight: '10px' }}>
//         <div
//           style={{
//             marginTop: baseSchoolDepts.length ? '16px' : '2px',
//             fontWeight: 'bold',
//             color: '#000',
//           }}
//         >
//           自定义校区：
//         </div>
//         {customSchoolDepts.map(_ => (
//           <div key={_.name} style={{ margin: '2px 0 10px 0', lineHeight: '20px' }}>
//             <span style={{ color: 'rgba(0, 0, 0, .45)' }}>班级：</span>
//             <span style={{ wordBreak: 'break-all' }}>{_.fullPath}</span>
//           </div>
//         ))}
//       </div>,
//     );
//   }
//   return { value: result };
// })(ArrayText);

export default {
  // 'input-btn': InputBtn,
  input: Text,
  selectUser: SelectUser,
  'select-department': SelectUser,
  select: Select,
  radio: Select,
  textarea: Text,
  mobilePhone: Text,
  number: Text,
  date: Text,
  switch: Text,
  userText: UserText,
  avatar: Avatar,
};
