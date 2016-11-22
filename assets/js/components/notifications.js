import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn, Button } from 'react-bootstrap-table';
import FaEdit from 'react-icons/lib/fa/edit';
import SweetAlert from 'sweetalert-react';
import { Link } from 'react-router';
import { ARTIST_DASHBOARD, CA_DASHBOARD, SERVER_URL } from '../utils/constants';

import NotificationShowModal from '../containers/notificationShowModal';
import DescriptionShowModal from  '../containers/descriptionShowModal';
import RaisedButton from 'material-ui/RaisedButton';
import Queue from 'material-ui/svg-icons/av/queue'
import QueueMusic from 'material-ui/svg-icons/av/queue-music'
const getNotificationId = notification => {
  let str = notification.target.id
  let regex = /[^edit-|publish-]+/g
  let notificationID =str.match(regex);
  return notificationID
}
const style = {
  margin: '12dp',
  backgroundColor: '#212121',
  labelColor: '#f7ab24'
}
class Notifications extends Component {

  constructor(props){
    super(props);
    this.formatEdit = this.formatEdit.bind(this);
    this.formatPublish = this.formatPublish.bind(this);
    this.editClick = this.editClick.bind(this);
    this.formatRequestsUser = this.formatRequestsUser.bind(this);
    this.formatListen = this.formatListen.bind(this);
    this.state = {
      showModal: false,
      sweetAlertMessage: "",
      sweetAlertTitle: "",
      type: "warning",
      userId: window.localStorage.userId,
    };
  }
  componentDidMount(){
    this.props.fetchNotifications(this.props.userId);
    this.props.setUserId(this.props.userId);
  }
  editClick(notification){
    this.props.editNotification(getNotificationId(notification));
  }

  openModal(cell,row) {
    this.props.setActualUserType(this.props.userType);
    this.props.getActualNotification(this.props.notifications.notifications, row.id);
    this.props.showNotifictionModal({ showModal: true, modalRequest: cell, userType: this.props.userType })
  }

  openModalDetails(cell,row){
    this.props.getActualNotification(this.props.notifications.notifications, row.id);
    this.props.showDescriptionModal({ showModal: true, modalRequest: cell})
  }

  formatRequests(cell, row){
    return (<button className="btn btn-primary-participate pull-right" onClick={()=>{
      this.openModal(cell,row)
    }}  type="submit">Ver Detalles</button>);
  }
  formatVotes(cell, row){
    return (
      <Link  className="btn btn-primary-participate pull-right"
        to={`${CA_DASHBOARD}/${this.state.userId}/convocatoria/${row.id}/votacion`}>
        Ir a votaciones</Link>
    );
  }
  formatRequestsUser(cell, row){
    return (
        <center>
    <RaisedButton label="Participar Ahora"  style={style}  icon={<Queue />} labelColor={style.labelColor} onClick={()=>{
  this.openModal(cell,row)
}} />
    </center>);
  }

  formatRequestsDetail(cell, row){
    return (<center><button className="btn btn-primary-participate" onClick={()=>{
      this.openModalDetails(cell,row)
    }}  type="submit"> Ver Descripción</button></center>);
  }

  formatEdit(cell, row){
    return (
      <Link to={`${CA_DASHBOARD}/${this.state.userId}/convocatoria/${cell}`}> <FaEdit /> </Link>
    );
  }


  editClick(notification){
    this.props.editNotification(getNotificationId(notification));
  }
  publishClick(notification){
    let idNotification    = getNotificationId(notification);
    let notificationState = notification.target.checked ? "PUB" : "CRE";
    $.ajax({
      method: "PUT",
      url: `${SERVER_URL}/comercial_agent/notifications/${idNotification}/publish/`,
      data: JSON.stringify({
        "notificationState": notificationState
      }),

    })
    .done(( msg ) => {
      this.setState({
        show: true,
        sweetAlertTitle: "Exito",
        type: "success",
        sweetAlertMessage: "El estado de la convocatoría se actualizó."
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
    this.props.publishNotification(getNotificationId(notification));
  }
  formatListen(cell, row){
    return (
      <center>
        <RaisedButton label="Escuchar Propuestas" href={`#${ARTIST_DASHBOARD}/${this.props.userId}/convocatoria/${row.id}/votacion`} style={style}  icon={<QueueMusic />} labelColor={style.labelColor}  />
      </center>
    )
  }
  formatPublish(cell, row) {

    if (row.notification_state == "CRE"){
      return (<input type="checkbox" onChange={this.publishClick.bind(this)} id={`publish-${row.id}`}  value={false} />)
    } else {
      return (<input type="checkbox" disabled id={`publish-${row.id}`}  checked value={true} />)
    }
  }

  render(){
      return(
        <div className="contact-section">
          <SweetAlert
            show={this.state.show}
            type={this.state.type}
            title={this.state.sweetAlertTitle}
            text={this.state.sweetAlertMessage}
            onConfirm={() => this.setState({ show: false })}
            />
          <NotificationShowModal />
          <DescriptionShowModal />
          <center>
            <div className="border col-sm-12">
              <center>
                <h3>{this.props.userType == "comercial_agent" ? "Convocatorias" : "Postularse"}</h3>
              </center>
            </div>
          </center>
          <div className="row">
            <div className="col-sm-12 col-xs-12 " >
              <BootstrapTable data={ this.props.notifications.notifications } striped={true} hover={true} >
                <TableHeaderColumn dataField="id" isKey={true} hidden={true}>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataSort={true} width="250">Nombre</TableHeaderColumn>
                <TableHeaderColumn dataField="description" width="120" dataFormat={this.formatRequestsDetail.bind(this)} >Descripción</TableHeaderColumn>
                <TableHeaderColumn dataField="initial_date" dataSort={true} width="120">Fecha de Inicio</TableHeaderColumn>
                <TableHeaderColumn dataField="closing_date"  dataSort={true}  width="120">Fecha de Cierre</TableHeaderColumn>
                <TableHeaderColumn dataField="notification_type"  dataSort={true} width="85" >Tipo</TableHeaderColumn>
                { this.tableComponent(this.props.userType) }
              </BootstrapTable>
            </div>
          </div>
        </div>
      )
  }
  tableComponent(userType){
    switch (userType){
      case "artist":
        return( [
          <TableHeaderColumn dataField="request" dataFormat={this.formatRequestsUser } dataSort={false} width="200" dataAlign="center">Participar</TableHeaderColumn>,
          <TableHeaderColumn dataField="request" dataFormat={this.formatListen } dataSort={false} width="250" dataAlign="center">Votar</TableHeaderColumn>
          ])
      case "comercial_agent":
        return([
          <TableHeaderColumn dataField="id" dataFormat={this.formatEdit}  dataSort={false} width="85" dataAlign="center" >Editar</TableHeaderColumn>,
          <TableHeaderColumn dataField="publishingState" dataFormat={this.formatPublish}  dataSort={false}  width="85" dataAlign="center" >Publicar</TableHeaderColumn>,
          <TableHeaderColumn dataField="request" dataFormat={this.formatRequests.bind(this)} dataSort={false} dataAlign="left">Solicitudes</TableHeaderColumn>,
          <TableHeaderColumn dataFormat={this.formatVotes.bind(this)} dataSort={false} dataAlign="left">Votaciones</TableHeaderColumn>
        ])
      default:
        return null
    }
  }
}

export default Notifications;
