export const userType = (state=[], action) => {
  switch (action.type) {
    case 'SET_USER_TYPE':
      return action.data
    default:
      return state ;
  }
}

export const request = (state=[], action) => {
  switch (action.type) {
    case 'ADD_REQUEST':
      let newRequest = Object.assign({}, action.data, {
        id: +new Date
      });
      return state.concat([newRequest]);
      break;

    case 'SET_REQUEST':
      let requestsFromNotification = action.data.map((request) =>{
        return Object.assign({}, request, {
          id: +new Date
        });
      });
      return requestsFromNotification;
      break;

    case 'DELETE_REQUEST':
      let newState = state.filter(r => r.id !== action.data);
      return newState;
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

const requestDafault = {name: "requestDeafult", features: "Default Feature"};
const notificationDefault  = { id: 1, name: "notification A", notificationType: "Private", initialDate: new Date(), closingDate: new Date(), description: "my description for notification A", publishingState: false, request: [requestDafault] };
const notificationsDefault = {"notifications":[notificationDefault]};
export const notifications = (state=notificationsDefault,  action) => {
  switch (action.type) {
    case 'GET_NOTIFICATIONS':
      return action.data || JSON.parse(localStorage.getItem("NOTIFICATIONS")) || state;
      break;
    case 'GET_ACTUAL_NOTIFICATION':
      let actualNotification = action.data.notifications.filter(notification => notification.id === parseInt(action.data.notificationId, 10))[0];
      let notification = Object.assign({}, action.data, {
        actualNotification: actualNotification
      });
      return notification;
      break;
    default:
      return state ;
  }
};

const requestBlank = {id: 1, name: "", features: ""};
const notificationBlank  = { name: "", notificationType: "Private", initialDate: new Date(), closingDate: new Date(), description: "", publishingState: false, request: [requestBlank] };
export const notification = (state=notificationBlank,  action) => {
  let notification = null;
  switch (action.type) {
    case 'PUBLISH_NOTIFICATION':
    notification = Object.assign({}, action.data, {
      publishing_state: !action.data.publishing_state
    });
    return  notification || state;
    break;
    case 'UPDATE_NOTIFICATION':
      notification = Object.assign({}, action.data);
      return  notification || state;
      break;
    default:
      return state ;
  }
};


export const notificationModal = (state={ showModal: false, modalRequest: [] },  action) => {
  let notificationModal = {};
  switch (action.type) {
    case 'SHOW_NOTIFICATION_MODAL':
      notificationModal = Object.assign({}, action.data);
      return  notificationModal || state;
      break;
    case 'HIDE_NOTIFICATION_MODAL':
      return  {  showModal: false, modalRequest: [] } || state;
      break;
    default:
      return state ;
  }
}
