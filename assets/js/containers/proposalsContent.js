import Proposals from '../components/proposals'
import { fetchProposals,hideSAModal } from '../actions';
import { CA_DASHBOARD } from '../utils/constants';
import { connect } from 'react-redux';
const userId = window.localStorage.userId;

const mapStateToProps = (state, { params: { notificationId }}) => {
    let actualNotification = state.notifications.notifications.filter(notification => notification.id === parseInt(notificationId, 10))[0];
    actualNotification = actualNotification ? actualNotification : window.location = `#${CA_DASHBOARD}/${userId}/convocatorias`;
    return {
      notification: actualNotification,
      proposals : state.proposals,
      saModal: state.saModal,
    }
}

const mapDispatchToProps = dispatch => ({
  fetchProposals: (notificationId) => dispatch(fetchProposals(notificationId)),
  hideSAModal: () => dispatch(hideSAModal()),
})

export default connect(mapStateToProps,mapDispatchToProps)(Proposals);
