import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Checkbox,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap'
import SweetAlert from 'sweetalert-react';
import { connect } from 'react-redux';

class Notifications extends Component {
    componentDidMount(){
    console.log("Notifications Mounted!")
    this.props.fetchNotifications();
  }

  closeModal() { this.setState({ showModal: false }); }
  openModal() { this.setState({ showModal: true }); }

  constructor(props) {
    super(props);
    // this.state = {
    //   show: false,
    // };
  }
  render(){
      return(
           <div className="border col-sm-4">
           <h6>Lista de Convocatorias</h6>
           </div>
      )

  }



}

export default Notifications;
