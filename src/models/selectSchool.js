import { querySchools } from '../services/login';

export default {
  namespace: 'selectSchool',

  state: {
    schools: [],
  },

  effects: {
    *fetchSchools(_, { call, put }) {
      const schools = yield call(querySchools);

      yield put({
        type: 'save',
        payload: {
          schools,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
