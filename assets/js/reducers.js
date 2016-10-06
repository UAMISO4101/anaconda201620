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

const modalDefault = {show: false,type: "error", title: "",text: ""};
export const saModal = (state=modalDefault, action) => {
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
const soundtrackDefault = {"sounds":[{ id: 0, sound: "", type: "", artist: "", rating: 0, likes: "" }]};
export const soundtracks = (state=soundtrackDefault,  action) => {
  switch (action.type) {
    case 'GET_SOUNDTRACKS':
      console.log(action.data);
      return action.data || state;
      break;
    default:
      return state ;
  }
};
