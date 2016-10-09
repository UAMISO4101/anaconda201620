import {SERVER_URL} from './utils/constants';

export const addRequest = request => ({ type: 'ADD_REQUEST', data: request });
export const getSoundTracks = (soundtracks) => ({ type: 'GET_SOUNDTRACKS', data: soundtracks });
export const showSAModal = (modalProps) => ({ type: 'SHOW_SA_MODALS', data: modalProps });
export const hideSAModal = () => ({ type: 'HIDE_SA_MODALS' });

export const fetchSoundTracks = (filter) => {
  return dispatch => {
    // #FixMe all in line 13 should be dynamic
    jQuery.ajax({
        method: "GET",
        url: `${SERVER_URL}/comercial_agent/get-sounds/${filter}`,
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
