import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router'

import { Modal, OverlayTrigger, Button } from 'react-bootstrap';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import SweetAlert from 'sweetalert-react';

import FaCalendarCheckO from 'react-icons/lib/fa/calendar-check-o'
import FaCalendarCheckMinusO from 'react-icons/lib/fa/calendar-minus-o'


import Requests from './requests';
import { CA_DASHBOARD, SERVER_URL } from '../utils/constants';


const setWarning = (name=null, description=null, initialDate=null, closingDate=null, request=0) => {
  let warning = "Llenar campos: \n";
  let initialD = new Date(initialDate);
  let closingD = new Date(closingDate);
  let today = new Date();
  warning = !name ? warning + "Nombre" : warning;
  warning = !description ? warning + " ,Descripción" : warning;
  warning = !initialDate ? warning + " ,Fecha inicio" : warning;
  warning = !closingDate ? warning + " ,Fecha Final" : warning;
  warning = !closingDate ? warning + " ,Fecha Final" : warning;
  warning = initialD > closingD ? warning + " ,Fecha final menor a la inicial" : warning;
  warning = !(initialD > today) ? warning + " ,Fecha inicial debe ser mayor a hoy" : warning;
  warning = request == 0 ? warning + " ,Solicitudes Vacia" : warning;
  return warning
}

class NotificationForm extends Component{

  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      sweetAlertMessage: "",
      sweetAlertTitle: "",
      type: "warning",
      initialDate: null,
      closingDate: null,
      name: null,
      description: null
    };
  }
  componentDidMount(){
    if (this.props.setRequest){
      this.props.setRequest(this.props.notification.request)
    }
  }
  handleName(event){ this.setState({name: event.target.value}); }
  handleDescription(event){ this.setState({description: event.target.value}); }

  closeModal() { this.setState({ showModal: false }); }
  openModal() { this.setState({ showModal: true }); }

  calendarEvent(event, picker) {
        this.setState({
          initialDate: picker.startDate,
          closingDate: picker.endDate
        })
  }

  render(){
    return(
      <div className="sd notificationForm row">
        <SweetAlert
            show={this.state.show}
            type={this.state.type}
            title={this.state.sweetAlertTitle}
            text={this.state.sweetAlertMessage}
            onConfirm={() => this.setState({ show: false })}
        />
        <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Solicitudes</Modal.Title>
            <h3>Al Ingresar las solicitudes dar click en la X para salir</h3>
          </Modal.Header>
          <Modal.Body>
            <Requests notificationId={this.props.notification.id} />
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
        <div className="col-md-3"></div>
        <div className="col-md-6 sd borderForm" >
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-sm-12">
                <input ref="name" type="text" className="form-control" placeholder="Nombre de convocatoria" value={this.state.name || this.props.notification.name} onChange={ this.handleName.bind(this)}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input ref="description" type="text" className="form-control" id="description" placeholder="Description" value={this.state.description || this.props.notification.description} onChange={ this.handleDescription.bind(this)}/>
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
                <div className="col-sm-9">
                  <h4><span className="label label-default" />Fecha Inicio Y Final<span/></h4>
                    <DateRangePicker onEvent={this.calendarEvent.bind(this)} >
                        <h2>
                          <span>
                            <FaCalendarCheckO/>
                          </span>

                          <span> &nbsp; </span>

                          <span>
                            <FaCalendarCheckMinusO/>
                          </span>
                        </h2>
                    </DateRangePicker>
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
        let initialDate  = this.state.initialDate;
        let closingDate  = this.state.closingDate;
        let today = moment();
        if(name
          && description
          && initialDate
          && closingDate
          && this.props.request.length !== 0
          && initialDate < closingDate
          && initialDate > today){
          let notificationObj = {
            name, description,
            initialDate: initialDate.format('YYYY-MM-DD'),
            closingDate: closingDate.format('YYYY-MM-DD'),
            notificationType: vPublic || vPrivate,
            request: this.props.request
          }
          this.postServer(notificationObj);

        }else{
          this.setState({
            sweetAlertMessage: setWarning(name, description, initialDate, closingDate,this.props.request.length),
            sweetAlertTitle: "Campos vacios",
            type: "warning",
            show: true
          })
        }
      }


    formatDate(date){
        return new Date(new Date(date).valueOf() + new Date().getTimezoneOffset()*60000);
    }

    postServer(notificationObj){

      let notificationId = "";
      let ajaxMethod = "POST";
      if (this.props.notification.id){
        notificationId = this.props.notification.id;
        ajaxMethod     = "EDIT";
      }

      $.ajax({
        method: ajaxMethod,
        url: `${SERVER_URL}/comercial_agent/notifications/${notificationId}`,
        data: JSON.stringify(notificationObj),

      })
      .done(( msg ) => {
          hashHistory.push(`${SERVER_URL}/#${CA_DASHBOARD}/convocatorias`)
        })
      .fail((err) => {
        console.error(err);
        this.setState({
          show: true,
          sweetAlertTitle: "Error Servidor",
          type: "error",
          sweetAlertMessage: `status: ${err.status} \nstatusText: ${err.statusText}`
        });

      })
    }
}

export default NotificationForm;
