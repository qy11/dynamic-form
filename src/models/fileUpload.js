import Toast from 'ss-mobile-toast';
import { addFileUpdate } from '../services/fileUpload';

const initState = {};

export default {
  namespace: 'fileUpload',
  state: initState,
  effects: {
    // 上传富文本中图片
    *fetchFileUpload({ params }, { call }) {
      Toast.loading('上传中...');
      try {
        const response = yield call(addFileUpdate, params);

        Toast.hide();

        return Promise.resolve(response);
      } catch (error) {
        Toast.hide();
        const { errMsg, msg } = error.data || {};
        Toast.info(errMsg || msg || '网络错误，请重试');
        return Promise.reject(error);
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    resetState() {
      return { ...initState };
    },
  },
};
