/**
 * code: '',
    defaultValue: '',
    groupNum: '',
    groupCondition: '',
    name: '',
    optionCondition: '',
    ruleCondition: '',
    ruleType: null,
 */
export const CODE = 'code';
export const DEFAULTVALUE = 'defaultValue';
export const GROUPNUM = 'groupNum';
export const GROUPCONDITION = 'groupCondition';
export const NAME = 'name';
export const OPTIONCONDITION = 'optionCondition';
export const RULECONDITION = 'ruleCondition';
export const RULETYPE = 'ruleType';

export const sortMulArr = (arr, str) => {
  const _arr = [];
  let _t = [];
  let _tmp; // 临时的变量

  // 按照特定的参数将数组排序将具备相同值得排在一块儿
  arr.sort(function(a, b) {
    const s = a[str];
    const t = b[str];
    return s < t ? -1 : 1;
  });
  if (arr.length) {
    _tmp = arr[0][str];
  }
  for (const i in arr) {
    if (arr[i][str] === _tmp) {
      _t.push(arr[i]);
    } else {
      _tmp = arr[i][str];
      _arr.push(_t);
      _t = [arr[i]];
    }
  }
  // 将最后的内容推出新数组
  _arr.push(_t);
  return _arr;
};
