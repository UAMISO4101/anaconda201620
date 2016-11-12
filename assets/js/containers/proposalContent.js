import Proposal from '../components/proposal'
import { addToSelectedProposals, choosedProposal } from '../actions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  choosedProposal: (proposalId) => dispatch(choosedProposal(proposalId)),
})

export default connect(()=>({}),mapDispatchToProps)(Proposal);
