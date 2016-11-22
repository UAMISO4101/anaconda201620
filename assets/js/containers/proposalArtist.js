import Proposal from '../components/proposal'
import {  choosedProposal,setPlayerAudios } from '../actions';
import { connect } from 'react-redux';
import {CA_DASHBOARD,SERVER_URL} from '../utils/constants';

const mapDispatchToProps = dispatch => ({
  choosedProposal: (proposalId) => dispatch(choosedProposal(proposalId)),
  changedSongs: (audios) => dispatch(setPlayerAudios(audios)),
  selectProposal: (self) => {
    $.ajax({
      method: 'POST',
      url: `${SERVER_URL}/comercial_agent/notifications/${self.props.notification.id}/user/${window.localStorage.userId}/postulation/${self.props.proposal.id}/vote/`,
      data: JSON.stringify({}),
    })
    .done(( msg ) => {
        self.setState({
          type: "success",
          show: true,
          showModal: false,
          sweetAlertOnConfirm: () => {self.setState({show: false}); window.location = `#${CA_DASHBOARD}/${self.state.userId}/convocatorias`; },
          sweetAlertMessage: "Vostate súper",
          sweetAlertTitle: "Exito",
        });
      })
    .fail((err) => {
      console.error(err);
      if (err.status == 403) {
        self.setState({
          show: true,
          sweetAlertTitle: "Voto Inválido",
          type: "warning",
          sweetAlertMessage: 'Lo sentimos, ya votaste por esta convocatoria',
          sweetAlertOnConfirm: () => {self.setState({show: false}); },
        });
      }else {
        self.setState({
          show: true,
          sweetAlertTitle: "Error Servidor",
          type: "error",
          sweetAlertMessage: `status: ${err.status} \nstatusText: ${err.statusText}`,
          sweetAlertOnConfirm: () => {self.setState({show: false}); },
        });
      }
    })
  },
})

export default connect(()=>({}),mapDispatchToProps)(Proposal);
