import Proposal from '../components/proposal'
import { setSelectedProposal } from '../actions';

import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  setSelectedProposal: (notificationId, proposalId) => dispatch(setSelectedProposal(notificationId, proposalId)),
})

export default connect(()=>({}),mapDispatchToProps)(Proposal);
