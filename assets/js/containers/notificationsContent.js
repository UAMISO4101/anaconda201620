
import Notifications from '../components/notifications'
import { SERVER_URL } from '../utils/constants';
import {
  editNotification,
  fetchNotifications,
  hideSAModal,
  publishNotification,
  showNotifictionModal,
  showSAModal,
} from '../actions';

import { connect } from 'react-redux';

const mapStateToProps = (state,  { params: { tipo }}) => ({
  notifications: state.notifications,
  tipo : state.tipo,
  saModal: state.saModal,
  userType: 'comercial_agent'
});

const mapDispatchToProps = dispatch => ({
  editNotification: (id) => {dispatch(editNotification)},
  fetchNotifications: () => dispatch(fetchNotifications()),
  hideSAModal: () => dispatch(hideSAModal()),
  publishNotification: (id) => {dispatch(publishNotification)},
  showNotifictionModal: (modalProps) => {dispatch(showNotifictionModal(modalProps))}
})
export default connect(mapStateToProps,mapDispatchToProps)(Notifications);
