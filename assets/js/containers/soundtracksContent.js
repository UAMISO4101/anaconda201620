import IndexContent from '../components/indexContent'
import { SERVER_URL } from '../utils/constants';
import { fetchSoundTracks, showSAModal, hideSAModal } from '../actions';

import { connect } from 'react-redux';

const mapStateToProps = (state, router) => ({
  soundtracks: state.soundtracks,
  saModal: state.saModal
});

const mapDispatchToProps = dispatch => ({
  fetchSoundTracks: (filter, type) => dispatch(fetchSoundTracks(filter, type)),
  hideSAModal: () => dispatch(hideSAModal())
});

export default connect(mapStateToProps,mapDispatchToProps)(IndexContent);
