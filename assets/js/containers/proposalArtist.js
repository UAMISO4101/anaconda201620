import Proposal from '../components/proposal'
import {  choosedProposal,setPlayerAudios } from '../actions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  choosedProposal: (proposalId) => dispatch(choosedProposal(proposalId)),
  changedSongs: (audios) => dispatch(setPlayerAudios(audios)),
  selectProposal: () => {},
})

export default connect(()=>({}),mapDispatchToProps)(Proposal);
