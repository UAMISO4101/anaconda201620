import SonidosLibresPlayer from '../components/sonidosLibresPlayer'
import { getProposals } from '../actions';

import { connect } from 'react-redux';

const mapStateToProps = (state, router) => ({
      audios: state.audios
})


export default connect(mapStateToProps)(SonidosLibresPlayer);
