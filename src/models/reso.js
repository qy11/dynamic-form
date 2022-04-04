const initState = {
    visible: false,
    userId: '',
    type: 'reso',
    id:'',
    params: null,
  };
  
  export default {
    namespace: 'reso',
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
  