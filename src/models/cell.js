const initState = {
    visible: false,
    userId: '',
    type: 'cell',
    id:'',
    params: null,
  };
  
  export default {
    namespace: 'cell',
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
  