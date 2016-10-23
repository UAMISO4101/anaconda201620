import artworkRequest from '../components/artworkRequest'
import {
  editNotification
} from '../actions';

import { connect } from 'react-redux';

const mapStateToProps = (state,  router) => {
  return {
    request: state.notifications.actualNotification.request,
    userType: state.userType
  }
};

const mapDispatchToProps = dispatch => ({
  selectRequest: (id,requestFile) => {dispatch(selectRequest(id,requestFile))},
  uploadNotification: (id) => {dispatch(uploadNotification(id))}
})
export default connect(mapStateToProps,mapDispatchToProps)(artworkRequest);
