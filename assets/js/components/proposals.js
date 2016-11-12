import React, {Component} from 'react';
import { ListGroupItem } from 'react-bootstrap';
import FaEraser from 'react-icons/lib/fa/eraser';
import ProposalContent from '../containers/proposalContent';
import SweetAlert from 'sweetalert-react';
import { CA_DASHBOARD, SERVER_URL } from '../utils/constants';

class Proposals extends Component {
  constructor(props){
    super(props);
    this.state = {
      closingDate: null,
      description: null,
      initialDate: null,
      name: null,
      notif : null,
      prev: false,
    };
  }
  componentDidMount(){
    this.props.fetchProposals(this.props.notification.id);
    if (this.props.notification.notification_state == "CER"){
       this.setState({show: true})
    }
  }

  render(){
    if(this.props.notification.notification_state == "CER"){
      return(
        <SweetAlert
          show={this.state.show}
          type="warning"
          title="Convocatoria cerrada"
          text="Esta Convocatoria ya está cerrada porqué se escogió la propuesta ganadora"
          onConfirm={() => { this.setState({show: false}); window.location = `#${CA_DASHBOARD}/convocatorias`; }}
        />
      )
    }else{
      return (
        <div >
          <SweetAlert
            show={this.props.saModal.show}
            type={this.props.saModal.type}
            title={this.props.saModal.title}
            text={this.props.saModal.text}
            onConfirm={() => {
              this.props.hideSAModal();
              window.location = `#${CA_DASHBOARD}/convocatorias`;
            }
          }
          />
        <br/><br/><br/><br/>
        <div className="list-group">
          { this.props.proposals.map( proposal => <ProposalContent proposal={proposal} notification={this.props.notification} key={proposal.id}/> )}
        </div>
      </div>
    );
    }
  }
};

export default Proposals;
