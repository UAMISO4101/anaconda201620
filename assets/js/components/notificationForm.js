import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import { Modal, OverlayTrigger, Button, Form,
  FormControl,
  FormGroup,Col,
  ControlLabel, } from 'react-bootstrap';
// import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import SweetAlert from 'sweetalert-react';

import FaCalendarCheckO from 'react-icons/lib/fa/calendar-check-o'
import FaCalendarCheckMinusO from 'react-icons/lib/fa/calendar-minus-o'

import Requests from './requests';
import { CA_DASHBOARD, NOTIFICATION_TYPE,SERVER_URL } from '../utils/constants';
import Request from './request';

var moment = require('moment');

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
      closingDate: null,
      description: null,
      initialDate: null,
      name: null,
      notif : null,
      prev: false,
      showModal: false,
      sweetAlertMessage: "",
      sweetAlertTitle: "",
      sweetAlertOnConfirm: () => {this.setState({ show: false })},
      type: "warning",
      userId:  window.localStorage.userId,
    };
  }
  componentWillReceiveProps(nextProps) {
  // You don't have to do this check first, but it can help prevent an unneeded render
  if (nextProps.request !== this.props.request) {
    this.setState({ request: nextProps.request });
  }
  }
  componentDidMount(){
    if (this.props.setRequest){
      this.props.getNotifications();
      this.props.setRequest(this.props.notification.request)
      this.setState({
        closingDate: moment(moment(this.props.notification.closing_date).format("MM/DD/YYYY")),
        initialDate: moment(moment(this.props.notification.initial_date).format("MM/DD/YYYY")),
      });
    }
  }

  handleName(event){ this.setState({name: event.target.value == "" ? " " : event.target.value}); }
  handleDescription(event){ this.setState({description: event.target.value == "" ? " " : event.target.value }); }

  closeModal() { this.setState({ showModal: false , prev: false}); }
  openModal() { this.setState({ showModal: true , prev:false }); }
  closePrevModal() { this.setState({ showModal: false, prev: false }); }
  openPrevModal() { this.setState({ showModal: true , prev: true}); }

  calendarEvent(event, picker) {
      this.setState({
        initialDate: picker.startDate,
        closingDate: picker.endDate
      })
  }
  dateTimePicker(){
    switch (this.props.notification_state) {
      case NOTIFICATION_TYPE.CREATE:
            return (
              <DateRangePicker onEvent={this.calendarEvent.bind(this)} >
                 <h2 className="dateRangePicker">
                   <span>
                     <FaCalendarCheckO/>
                   </span>
                   <span> &nbsp; </span>
                   <span>
                     <FaCalendarCheckMinusO/>
                   </span>
                 </h2>
             </DateRangePicker>
          )
        break;
      case NOTIFICATION_TYPE.EDIT:
          if(this.state.initialDate){
            return(
              <DateRangePicker startDate={ this.state.initialDate } endDate={ this.state.closingDate } onEvent={this.calendarEvent.bind(this)} >
                  <h2 className="dateRangePicker hvr-buzz-out">
                    <span>
                      <FaCalendarCheckO/>
                    </span>
                    <span> &nbsp; </span>
                    <span>
                      <FaCalendarCheckMinusO/>
                    </span>
                  </h2>
              </DateRangePicker>
          )
          }else { return null;}
        break;
      default:
        return null;
    }
  }

  render(){
    return(
      <div id="notiform" className="sd notificationForm row">
        <SweetAlert
            show={this.state.show}
            type={this.state.type}
            title={this.state.sweetAlertTitle}
            text={this.state.sweetAlertMessage}
            onConfirm={this.state.sweetAlertOnConfirm}
        />
        <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
          <Modal.Header closeButton>
              { this.state.prev ? <div><Modal.Title>Información</Modal.Title><h3>Puede dar click en la X para salir</h3> </div>:<div> <Modal.Title>Solicitudes</Modal.Title>
            <h3>Al Ingresar las solicitudes dar click en la X para salir</h3></div>}


          </Modal.Header>
          <Modal.Body>
            { this.state.prev ? this.getNotifHTML() : <Requests notificationId={this.props.notification.id} />}
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
        <div className="border col-sm-12" >
                <center>
                <h3>Formulario de Convocatorias</h3>
                    </center>
                <br></br>
            </div>
        <div className="col-md-3"></div>
        <div className="col-md-6 sd borderForm" >
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-sm-12">
                <input ref="name" type="text" className="form-control" placeholder="Nombre de convocatoria" value={ this.state.name || this.props.notification.name} onChange={ this.handleName.bind(this)}/>
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
                  <span className="glyphicon glyphicon-comment" aria-hidden="true"></span>Solicitudes
                  </button>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-9 hvr-buzz-out">
                  <h4><span className="label label-default" />Fecha Inicio <i>{`${this.formatDate(this.state.initialDate) || ""}`}</i> <br/>Fecha Final <i>{`${this.formatDate(this.state.closingDate) || ""}`}</i><span/></h4>
                  {this.dateTimePicker()}
                </div>

              </div>
              <div className="form-group">
                <div className="col-sm-push-4 col-sm-4 col-xs-12">
                  <button onClick={this.onSave.bind(this)} type="submit" className="btn btn-primary-about">Previsualizar</button>
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
          this.setState({notif:notificationObj});
          this.openPrevModal();
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
        if(date){
          return date.format("YYYY/MM/DD");
        }
    }

    postServer(event){
      event.preventDefault();

      let notificationObj = this.state.notif;
      notificationObj.request = this.props.request;
      let _url = `${SERVER_URL}/comercial_agent/notifications/user/${this.props.userId}/`;
      let ajaxMethod = "POST";
      if (this.props.notification.id){
        _url        = `${SERVER_URL}/comercial_agent/notifications/${this.props.notification.id}/`;
        ajaxMethod  = "PUT";
      }
        $.ajax({
          method: ajaxMethod,
          url: _url,
          data: JSON.stringify(notificationObj),
        })
        .done(( msg ) => {
            this.setState({
              type: "success",
              show: true,
              showModal: false,
              sweetAlertOnConfirm: () => {this.setState({show: false}); window.location = `#${CA_DASHBOARD}/${this.state.userId}/convocatorias`; },
              sweetAlertMessage: "Convocatoria creada exitosamente",
              sweetAlertTitle: "Exito",
            });
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

  getNotifHTML() {
    return(
      <div>
        <h1>Información de convocatoria</h1>
          <p>Nombre: {this.state.notif.name}</p>
          <p>Descripción: {this.state.notif.description}</p>
          <p>Inicio: {this.state.notif.initialDate}</p>
          <p>Cierre: {this.state.notif.closingDate}</p>
          <p>Tipo: {this.state.notif.notificationType}</p>
          <h4>Solicitudes:</h4>
          <ul className="list-group">
            {this.props.request.map( rq => <Request rq={rq} key={rq.id}/> )}
          </ul>
          <Form horizontal onSubmit={this.postServer.bind(this)} >
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button  type="submit">
                  Enviar Convocatoria
                </Button>
              </Col>
            </FormGroup>
          </Form>
      </div>);
  }
}

export default NotificationForm;
