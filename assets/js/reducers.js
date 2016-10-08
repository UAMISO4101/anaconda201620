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
  let modalAlert = {};
  switch (action.type) {
    case 'HIDE_SA_MODALS':
       modalAlert = Object.assign(state, action.data, {
        show: false
      });
      return  modalAlert || state;
      break;
    case 'SHOW_SA_MODALS':
      modalAlert = Object.assign({}, action.data);
      return  modalAlert || state;
      break;
    default:
      return state ;
  }
};

const soundtrackDefault = {"sounds":
      [{ id: 1, sound: "", type: "", artist: "", rating: 0, likes: "" }]
};
export const soundtracks = (state=soundtrackDefault,  action) => {
  switch (action.type) {
    case 'GET_SOUNDTRACKS':
      return action.data || state;
      break;
    default:
      return state ;
  }
};

const notificationDefault  = { id: 1, name: "notification A", notificationType: "Private", initialDate: new Date(), closingDate: new Date(), description: "my description for notification A", publishingState: false };
const notificationsDefault = {"notifications":[notificationDefault]};
export const notifications = (state=notificationsDefault,  action) => {
  let notification = null;
  switch (action.type) {
    case 'GET_NOTIFICATIONS':
      return action.data || state;
      break;
    default:
      return state ;
  }
};
const notificationBlank  = { name: "", notificationType: "Private", initialDate: new Date(), closingDate: new Date(), description: "", publishingState: false };

export const notification = (state=notificationBlank,  action) => {
  let notification = null;
  switch (action.type) {
    case 'UPDATE_NOTIFICATION':
      notification = Object.assign({}, action.data);
      return  notification || state;
      break;
    case 'PUBLISH_NOTIFICATION':
      notification = Object.assign({}, action.data, {
        publishing_state: !action.data.publishing_state
      });
      return  notification || state;
      break;
    default:
      return state ;
  }
};
