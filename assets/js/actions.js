export const addRequest = request => ({ type: 'ADD_REQUEST', data: request });
export const getSoundTracks = () => ({ type: 'GET_SOUNDTRACKS', data: soundtracks });
export const showSAModal = (modalProps) => ({ type: 'SHOW_SA_MODALS', data: modalProps });
export const hideSAModal = () => ({ type: 'HIDE_SA_MODALS' });

export const fetchSoundTracks = () => {
  return dispatch => {
    jQuery.ajax({
        method: "GET",
        url: "./assets/js/testData/soundtracks.json",
        statusCode: {
        200: (data) => {
          dispatch(receiveData(data))
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
