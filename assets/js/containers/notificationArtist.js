import Notifications from '../components/notifications'
import { SERVER_URL } from '../utils/constants';
import {
  editNotification,
  fetchNotifications,
  getActualNotification,
  hideSAModal,
  hideNotifictionModal,
  publishNotification,
  setActualUserType,
  showNotifictionModal,
  showSAModal,
} from '../actions';

import { connect } from 'react-redux';

const mapStateToProps = (state,  { params: { tipo }}) => ({
  notifications: state.notifications,
  tipo : state.tipo,
  saModal: state.saModal,
  userType: 'artist'
});

const mapDispatchToProps = dispatch => ({
  editNotification: (id) => {dispatch(editNotification)},
  fetchNotifications: () => dispatch(fetchNotifications()),
  getActualNotification: (notifications,notificationId) => dispatch(getActualNotification(notifications,notificationId)),
  hideSAModal: () => dispatch(hideSAModal()),
  publishNotification: (id) => {dispatch(publishNotification)},
  setActualUserType: (userType) => {dispatch(setActualUserType(userType))},
  showNotifictionModal: (modalProps) => {dispatch(showNotifictionModal(modalProps))}
})
export default connect(mapStateToProps,mapDispatchToProps)(Notifications);
