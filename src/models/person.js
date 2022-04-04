const initState = {
  visible: false,
  userId: '',
  type: 'wisdom',
  params: null,
};

export default {
  namespace: 'person',
  state: initState,
  effects: {},

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    // hide(state) {
    //   return {
    //     ...state,
    //     formData: initState.formData,
    //   };
    // },
  },
};
