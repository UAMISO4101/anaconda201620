import React, {Component} from 'react';
import { ListGroupItem } from 'react-bootstrap';
import FaEraser from 'react-icons/lib/fa/eraser';
import Votation from './votation';
import SweetAlert from 'sweetalert-react';

class Proposals extends Component {

  componentDidMount(){
    this.props.fetchProposals(this.props.notification.id);
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
          { this.props.proposals.map( vt => <Votation vt={vt} key={vt.id}/> )}
        </div>
      </div>
    );
  }
};

export default Proposals;
