import Notifications from '../components/notifications'
import { SERVER_URL } from '../utils/constants';
import {
  editNotification,
  fetchOpenNotifications,
  getActualNotification,
  hideSAModal,
  hideNotifictionModal,
  publishNotification,
  setActualUserType,
  setUserId,
  showNotifictionModal,
  showSAModal,
} from '../actions';

import { connect } from 'react-redux';

const mapStateToProps = (state,  { params: { id }}) => ({
  notifications: state.notifications,
  saModal: state.saModal,
  userId: parseInt(id, 10),
  userType: 'artist',
});

const mapDispatchToProps = dispatch => ({
  editNotification: (id) => {dispatch(editNotification)},
  fetchNotifications: () => dispatch(fetchOpenNotifications()),
  getActualNotification: (notifications,notificationId) => dispatch(getActualNotification(notifications,notificationId)),
  hideSAModal: () => dispatch(hideSAModal()),
  publishNotification: (id) => {dispatch(publishNotification)},
  setActualUserType: (userType) => {dispatch(setActualUserType(userType))},
  setUserId: (id) => {dispatch(setUserId(id))},
  showNotifictionModal: (modalProps) => {dispatch(showNotifictionModal(modalProps))}
})
export default connect(mapStateToProps,mapDispatchToProps)(Notifications);
