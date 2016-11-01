import SonidosLibresPlayer from '../components/sonidosLibresPlayer'
import { getProposals } from '../actions';

import { connect } from 'react-redux';

const mapStateToProps = (state, router) => {
  return {
    audios: state.audios.audios,
    setted: state.audios.setted,
}}

export default connect(mapStateToProps)(SonidosLibresPlayer);
