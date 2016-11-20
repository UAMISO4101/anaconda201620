import React, {Component} from 'react';
import { ListGroupItem } from 'react-bootstrap';
import FaEraser from 'react-icons/lib/fa/eraser';
import ProposalContent from '../containers/proposalContent';
import SweetAlert from 'sweetalert-react';
import { CA_DASHBOARD, SERVER_URL,USER_ROLES } from '../utils/constants';
import { auth } from '../utils/auth';

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
      userId: window.localStorage.userId,
    };
  }
  componentDidMount(){
    this.props.fetchProposals(this.props.notification.id);
  }

  proposalType(){
    switch (auth.getUserRole()) {
      case USER_ROLES.ARTIST :
          return this.props.proposals.map( proposal => <ProposalArtist proposal={proposal} notification={this.props.notification} key={proposal.id}/> )
        break;
      case USER_ROLES.COMERCIAL_AGENT :
        if (this.props.notification.notification_state == "FIN"){
          let a = this.props.proposals.filter( proposal => {
           if (proposal.winner) {
             return <ProposalContent proposal={proposal} notification={this.props.notification} key={proposal.id}/>
           }
         })
         debugger
         return a
      }else {
        return this.props.proposals.map( proposal => <ProposalCommercialAgent proposal={proposal} notification={this.props.notification} key={proposal.id}/> )
      }
        break;
      default:
        return null
    }
  }

  render(){
      return (
        <div >
          <SweetAlert
            show={this.props.saModal.show}
            type={this.props.saModal.type}
            title={this.props.saModal.title}
            text={this.props.saModal.text}
            onConfirm={() => {
              this.props.hideSAModal();
              window.location = `#${CA_DASHBOARD}/${this.state.userId}/convocatorias`;
            }
          }
          />
        <br/><br/><br/><br/>
        <div className="list-group">
          { this.proposalType() }
        </div>
      </div>
    );
  }
};

export default Proposals;
