import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Modal, OverlayTrigger, Button } from 'react-bootstrap';

import Requests from './requests';
import {CA_DASHBOARD} from '../utils/constants';

class NotificationForm extends Component{

  constructor(props){
    super(props);
    this.state = {showModal: false};
  }

  closeModal() { this.setState({ showModal: false }); }
  openModal() { this.setState({ showModal: true }); }

  render(){
    return(
      <div className="sd notificationForm row">
        <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Requests/>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
        <div className="col-md-3"></div>
        <div className="col-md-6 sd borderForm" >
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-sm-12">
                <input ref="name" type="text" className="form-control" placeholder="Nombre de convocatoria "/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input ref="description" type="text" className="form-control" id="description" placeholder="Description"/>
              </div>
            </div>
            <div className="form-group">
              <div className=" col-sm-12 text-center">
                <div className="checkbox closedCheckedbox">
                  <label className="radio-inline"><input ref="public" type="radio" name="optradio" defaultChecked/>Pública</label>
                  <label className="radio-inline"><input ref="private" type="radio" name="optradio"/>Privada</label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-9">
                <span className="requests">
                  <input type="text" className="form-control" id="requestList" placeholder="Lista de Solicitudes" disabled/>
                </span>
              </div>
              <div className="col-sm-3">
                <button onClick={this.openModal.bind(this)} type="button" className="btn btn-info pull-right">
                  <span className="glyphicon glyphicon-comment" aria-hidden="true"></span> Solicitudes
                  </button>
                </div>
              </div>
              <div className="form-group">
                <div className=" col-sm-5">
                  <h4><span className="label label-default" />Fecha Inicio<span/></h4>
                  <input ref="initialDate" type="date" className="pull-left dates "/>
                </div>
                <div className="col-sm-offset-2 col-sm-5">
                  <h4><span className="label label-default" />Fecha Cierre<span/></h4>
                  <input ref="closingDate" type="date" className="pull-right dates"/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-push-4 col-sm-4 col-xs-12">
                  <button onClick={this.onSave.bind(this)} type="submit" className="btn btn-success">¿Comenzamos?</button>
                </div>
              </div>
            </form>
          </div>

          <div className="col-md-3"></div>
        </div>
      )}

      onSave(event){
        event.preventDefault();

        let name         = ReactDOM.findDOMNode(this.refs.name).value;
        let description  = ReactDOM.findDOMNode(this.refs.description).value;
        let vPublic      = ReactDOM.findDOMNode(this.refs.public).checked ? "PB" : false;
        let vPrivate     = ReactDOM.findDOMNode(this.refs.private).checked ? "PR" : false;
        let initialDate  = ReactDOM.findDOMNode(this.refs.initialDate).value;
        let closingDate  = ReactDOM.findDOMNode(this.refs.closingDate).value;

        // let fRequests     = requests(); //<-- #ToDo set the REQUESTS ¿After or Before?
        let notificationObj = {
          name, description, initialDate, closingDate,
          notifycationType: vPublic || vPrivate
        }
        debugger;
        this.props.onSave(Object.assign({}, this.props.notification, notificationObj));

        console.log()
        // browserHistory.push(`${CA_DASHBOARD}/convocatorias`);

      }
    }

    export default NotificationForm;
