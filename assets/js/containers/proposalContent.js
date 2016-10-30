import Proposals from '../components/proposals'
import { getProposals } from '../actions';

import { connect } from 'react-redux';

const mapStateToProps = (state, { params: { notificationId }}) => {
    let actualNotification = state.notifications.notifications.filter(notification => notification.id === parseInt(notificationId, 10))[0];
    actualNotification = actualNotification ? actualNotification : state.notifications.notifications[0];
    return {
      notification: actualNotification,
      proposals : state.proposals,
    }
}

const mapDispatchToProps = dispatch => ({
  getProposals: (artistId) => dispatch(getProposals(artistId))
})

export default connect(mapStateToProps,mapDispatchToProps)(Proposals);
