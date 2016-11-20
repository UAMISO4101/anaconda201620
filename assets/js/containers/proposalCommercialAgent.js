import Proposal from '../components/proposal'
import {  choosedProposal } from '../actions';
import { connect } from 'react-redux';
import {CA_DASHBOARD} from '../utils/constants';

const mapDispatchToProps = dispatch => ({
  choosedProposal: (proposalId) => dispatch(choosedProposal(proposalId)),
  selectProposal: (self) => {
    self.setState({
          type: "success",
          show: true,
          showModal: false,
          sweetAlertOnConfirm: () => {self.setState({show: false}); window.location = `#${CA_DASHBOARD}/${self.state.userId}/convocatorias`; },
          sweetAlertMessage: "Escogió la postulación satisfactoriamente",
          sweetAlertTitle: "Exito",
        });

    // $.ajax({
    //   method: 'PUT',
    //   url: `${SERVER_URL}/comercial_agent/notifications/${this.props.notification.id}/set-winner/${this.props.proposal.id}/`,
    //   data: JSON.stringify({}),
    // })
    // .done(( msg ) => {
    //     this.setState({
    //       type: "success",
    //       show: true,
    //       showModal: false,
    //       sweetAlertOnConfirm: () => {this.setState({show: false}); window.location = `#${CA_DASHBOARD}/${this.state.userId}/convocatorias`; },
    //       sweetAlertMessage: "Es cogió la postulación satisfactoriamente",
    //       sweetAlertTitle: "Exito",
    //     });
    //   })
    // .fail((err) => {
    //   console.error(err);
    //   this.setState({
    //     show: true,
    //     sweetAlertTitle: "Error Servidor",
    //     type: "error",
    //     sweetAlertMessage: `status: ${err.status} \nstatusText: ${err.statusText}`
    //   });
    // })

  }
})

export default connect(()=>({}),mapDispatchToProps)(Proposal);
