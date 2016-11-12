import {DEFAULT_IMAGE} from "./utils/constants.js";
const artworkBlank = 	{value: 1, label: "Default Artwork"};
export const artworks = (state=[artworkBlank],  action) => {
  switch (action.type) {
    case 'GET_ARTIST_ARTWORKS':
      return action.data || state;
      break;
    default:
      return state ;
  }
}

import {audiosDefault} from "./testData/audios";
export const audios = (state={audios:audiosDefault, setted: true},action) => {
  switch (action.type) {
    case 'RESET_AUDIOS':
      return Object.assign({}, state, {
        setted: false
      });
    case 'SET_AUDIOS':
      let audios = [];
      let proposals = action.data;
      for (let i=0, l=proposals.length; l>i; i+=1) {
        proposals[i].audios.forEach(audio => {
          audios.push(audio);
        });
      }
      return {audios: audios, setted: true} || state;
    default:
      return Object.assign({}, state, {
        setted: false
      });
  }
}

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

const requestDeafult = {name: "requestDeafult", features: "Default Feature"};
const notificationDefault  = { id: 1, cover: "",name: "notification A", notificationType: "Private", initialDate: new Date(), closingDate: new Date(), description: "my description for notification A", publishingState: false, request: [requestDeafult] };
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

const proposalDefault = {
  id: "proposalId",
  artist: "artistId",
  audios: [audiosDefault]
}
export const proposals = (state=[proposalDefault], action) => {
  let proposals = null
  switch (action.type) {
    case 'GET_PROPOSALS':
      proposals = action.data.map(proposal => {
        return Object.assign({}, proposal, {choosed: false})
      });
      return proposals || state;
    case 'CHOOSED_PROPOSAL':
      proposals = state.map(proposal => {
        return (proposal.id==action.data) ? Object.assign({}, proposal, { choosed: true }) : proposal;
      });
      return proposals
    default:
      return state ;
  }
}

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

const soundtrackDefault = null;
export const soundtracks = (state=soundtrackDefault,  action) => {
  switch (action.type) {
    case 'GET_SOUNDTRACKS':
      return action.data || state;
      break;
    case 'GET_SOUNDTRACK_BY_ARTIST':
      return action.data || state;
      break;
    default:
      return state ;
  }
};

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

export const userID = (state=null, action) => {
  switch (action.type) {
    case 'SET_USER_ID':
      return action.data
    default:
      return state ;
  }
}
export const userType = (state=[], action) => {
  switch (action.type) {
    case 'SET_USER_TYPE':
      return action.data
    default:
      return state ;
  }
}

export const votation = (state={notification: {selectedProposals: []}},action) => {
  switch (action.type) {
    case 'ADD_PROPOSAL':
      let selectedProposals = state.notification.selectedProposals;
      let proposals = Object.assign({}, {
        id: action.data.notificationId,
        selectedProposals: selectedProposals.concat(action.data.proposalId)
      })
      return proposals
    default:
      return state ;
  }
}
