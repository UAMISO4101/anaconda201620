import React, {Component} from 'react';
import { ListGroupItem } from 'react-bootstrap';
import FaEraser from 'react-icons/lib/fa/eraser';
import Votation from './votation';
import SweetAlert from 'sweetalert-react';
import { auth } from '../utils/auth';
import { USER_ROLES } from '../utils/constants';


class Proposals extends Component {

  componentDidMount(){
    this.props.fetchProposals(this.props.notification.id);
  }

  proposalType(){
    switch (auth.getUserRole()) {
      case USER_ROLES.ARTIST :
          return ;
        break;
      case USER_ROLES.COMERCIAL_AGENT :
          return this.props.proposals.map( vt => <Votation vt={vt} key={vt.id}/> );
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
            onConfirm={() => this.props.hideSAModal()}
        />
        <br/><br/><br/><br/>
        <div className="list-group">
          { proposalType() }
        </div>
      </div>
    );
  }
};

export default Proposals;
