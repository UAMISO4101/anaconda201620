export const request = (state=[], action) => {
  switch (action.type) {
    case 'ADD_REQUEST':
      let newRequest = Object.assign({}, action.data, {
        id: +new Date
      });
      return state.concat([newRequest]);
      break;
    default:
      return state ;
  }
};

export const saModal = (state={show: false,type: "error", title: "",text: ""}, action) => {
  let ma = {};
  switch (action.type) {
    case 'HIDE_SA_MODALS':
       ma = Object.assign(state, action.data, {
        show: false
      });
      return  ma || state;
      break;
    case 'SHOW_SA_MODALS':
      ma = Object.assign({}, action.data);
      return  ma || state;
      break;
    default:
      return state ;
  }
};

export const soundtracks = (state=[{ id: 1, sound: "", type: "", artist: "", popularity: "" }],
                              action) => {
  switch (action.type) {
    case 'GET_SOUNDTRACKS':
      return action.data || state;
      break;
    default:
      return state ;
  }
};
