/**
 * Created by danielordonez on 10/5/16.
 */
import Notifications from './notifications'
import { SERVER_URL } from '../utils/constants';
import { fetchNotifications, showSAModal, hideSAModal } from '../actions';

import { connect } from 'react-redux';

const mapStateToProps = (state, router) => ({
  notifications: state.notifications,
  saModal: state.saModal
});

const mapDispatchToProps = dispatch => ({
  fetchNotifications: () => dispatch(fetchNotifications()),
  hideSAModal: () => dispatch(hideSAModal())
});

export default connect(mapStateToProps,mapDispatchToProps)(Notifications);
