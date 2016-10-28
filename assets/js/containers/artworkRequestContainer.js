import artworkRequest from '../components/artworkRequest'
import {
  editNotification,
  fetchArtistArtworks,
  getSoundTracksByArtist,
  hideNotifictionModal,
} from '../actions';

import { connect } from 'react-redux';

const mapStateToProps = (state,  router) => {
  return {
    artworks: state.artworks,
    actualNotification: state.notifications.actualNotification,
    request: state.notifications.actualNotification.request,
    userType: state.userType,
    userId: state.userID,
  }
};

const mapDispatchToProps = dispatch => ({
  fetchArtistArtworks: (id) => dispatch(fetchArtistArtworks(id)),
  hideNotifictionModal: () => dispatch(hideNotifictionModal()),
  selectRequest: (id,requestFile) => dispatch(selectRequest(id,requestFile)),
  uploadNotification: (id) => dispatch(uploadNotification(id))
})
export default connect(mapStateToProps,mapDispatchToProps)(artworkRequest);
