import Notifications from './notifications'
import { SERVER_URL } from '../utils/constants';
import {
  editNotification,
  fetchNotifications,
  hideSAModal,
  publishNotification,
  showSAModal,
} from '../actions';

import { connect } from 'react-redux';

const mapStateToProps = (state,  { params: { tipo }}) => ({
  notifications: state.notifications,
  tipo : state.tipo,
  saModal: state.saModal,
  user_type: 'artist'
});

const mapDispatchToProps = dispatch => ({
  editNotification: (id) => {dispatch(editNotification)},
  fetchNotifications: () => dispatch(fetchNotifications()),
  hideSAModal: () => dispatch(hideSAModal()),
  publishNotification: (id) => {dispatch(publishNotification)}
})
export default connect(mapStateToProps,mapDispatchToProps)(Notifications);
