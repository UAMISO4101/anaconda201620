import {SERVER_URL} from './utils/constants';

export const addRequest = request => ({ type: 'ADD_REQUEST', data: request });
export const setRequest = (request) => ({ type: 'SET_REQUEST', data: request });
export const deleteRequest = (requestId) => ({ type: 'DELETE_REQUEST', data: requestId });

export const getSoundTracks = (soundtracks) => ({ type: 'GET_SOUNDTRACKS', data: soundtracks });
export const getNotifications = (notifications) => ({ type: 'GET_NOTIFICATIONS', data: notifications });
export const editNotification = (id) => ({type: 'EDIT_NOTIFICATIONS',data: id});
export const publishNotification = (id) => ({type: 'PUBLISH_NOTIFICATIONS',data: id});

export const showSAModal = (modalProps) => ({ type: 'SHOW_SA_MODALS', data: modalProps });
export const hideSAModal = () => ({ type: 'HIDE_SA_MODALS' });

export const showNotifictionModal = (modalProps) => ({ type: 'SHOW_NOTIFICATION_MODAL', data: modalProps });
export const hideNotifictionModal = () => ({ type: 'HIDE_NOTIFICATION_MODAL' });

export const setActualUserType = (userType) => ({ type: 'SET_USER_TYPE', data: userType });
export const getActualNotification = (notifications,notificationId) => ({ type: 'GET_ACTUAL_NOTIFICATION', data: {notifications, notificationId} });

export const getArtistArtworks = id => ({type: 'GET_ARTIST_ARTWORKS', data: id})

export const fetchSoundTracks = (filter) => {
  return dispatch => {
    jQuery.ajax({
        method: "GET",
        url: `${SERVER_URL}/comercial_agent/sounds/${filter}`,
        statusCode: {
        200: (data) => {
          dispatch(getSoundTracks(data))
        },
        404: (err) => {
          dispatch(showSAModal({
            show: true,
            type: "error",
            title: "Error",
            text: `status: ${err.status} \nstatusText: ${err.statusText}`
          }))
        }
      }
    });
  }
};
export const fetchNotifications = () => {
  return dispatch => {
    jQuery.ajax({
        method: "GET",
        url: `${SERVER_URL}/comercial_agent/notifications/`,
        statusCode: {
        200: (data) => {
          localStorage.setItem("NOTIFICATIONS", JSON.stringify(data));
          dispatch(getNotifications(data))
        },
        404: (err) => {
          dispatch(showSAModal({
            show: true,
            type: "error",
            title: "Error",
            text: `status: ${err.status} \nstatusText: ${err.statusText}`
          }))
        }
      }
    });
  }
};
