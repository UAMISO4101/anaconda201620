
import Notifications from '../components/notifications'
import { SERVER_URL } from '../utils/constants';
import {
  editNotification,
  fetchNotifications,
  getActualNotification,
  hideSAModal,
  publishNotification,
  setActualUserType,
  setUserId,
  setUsertype,
  showNotifictionModal,
  showSAModal,
} from '../actions';

import { connect } from 'react-redux';

const mapStateToProps = (state,  { params: { id }}) => ({
  notifications: state.notifications,
  tipo : state.tipo,
  saModal: state.saModal,
  userId: id || "",
  userType: 'comercial_agent',
});

const mapDispatchToProps = dispatch => ({
  editNotification: (id) => {dispatch(editNotification)},
  fetchNotifications: (id) => dispatch(fetchNotifications(id)),
  getActualNotification: (notifications,notificationId) => dispatch(getActualNotification(notifications,notificationId)),
  hideSAModal: () => dispatch(hideSAModal()),
  publishNotification: (id) => {dispatch(publishNotification)},
  setActualUserType: (userType) => {dispatch(setActualUserType(userType))},
  setUserId: (id) => {dispatch(setUserId(id))},
  setUsertype: (modalProps) => {dispatch(setUsertype(userType))},
  showNotifictionModal: (modalProps) => {dispatch(showNotifictionModal(modalProps))}
})
export default connect(mapStateToProps,mapDispatchToProps)(Notifications);
