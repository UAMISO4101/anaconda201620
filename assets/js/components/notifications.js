import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn, Button } from 'react-bootstrap-table';
import FaEdit from 'react-icons/lib/fa/edit';
import SweetAlert from 'sweetalert-react';
import { Link } from 'react-router';
import { CA_DASHBOARD, SERVER_URL } from '../utils/constants';

import NotificationShowModal from '../containers/notificationShowModal';

const getNotificationId = notification => {
  let str = notification.target.id
  let regex = /[^edit-|publish-]/g
  let notificationID =str.match(regex);
  return notificationID
}

class Notifications extends Component {

  constructor(props){
    super(props);
    this.formatEdit = this.formatEdit.bind(this);
    this.formatPublish = this.formatPublish.bind(this);
    this.editClick = this.editClick.bind(this);
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

  tableComponent(userType){
    switch (userType){
      case "artist":
        return( <TableHeaderColumn dataField="request" dataFormat={this.formatRequestsUser.bind(this)} dataSort={false}>Participar</TableHeaderColumn>)
      case "comercial_agent":
        return([
          <TableHeaderColumn dataField="id" dataFormat={this.formatEdit}  dataSort={false} >Editar</TableHeaderColumn>,
          <TableHeaderColumn dataField="publishingState" dataFormat={this.formatPublish}  dataSort={false} >Publicar</TableHeaderColumn>,
          <TableHeaderColumn dataField="request" dataFormat={this.formatRequests.bind(this)} dataSort={false} dataAlign="left">Solicitudes</TableHeaderColumn>,
          <TableHeaderColumn dataFormat={this.formatVotes.bind(this)} dataSort={false} dataAlign="left">Votaciones</TableHeaderColumn>
        ])
      default:
        return null
    }
  }

  openModal(cell,row) {
    this.props.setActualUserType(this.props.userType);
    this.props.getActualNotification(this.props.notifications.notifications, row.id);
    this.props.showNotifictionModal({ showModal: true, modalRequest: cell, userType: this.props.userType })
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
    return (<button className="btn btn-primary-participate pull-right" onClick={()=>{
      this.openModal(cell,row)
    }}  type="submit">Participar Ahora</button>);
  }

  formatEdit(cell, row){
    return (
      <Link to={`${CA_DASHBOARD}/${this.state.userId}/convocatoria/${cell}`}> <FaEdit /> </Link>
    );
  }
  formatPublish(cell, row) {
    let checkedState = row.notification_state == "PUB" ? "checked" : "";
    return (
      <input type="checkbox" onChange={this.publishClick.bind(this)} id={`publish-${row.id}`}  value={ checkedState ? true : false} />
    )
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
                <TableHeaderColumn dataField="name" dataSort={true}>Nombre</TableHeaderColumn>
                <TableHeaderColumn dataField="description" >Descripción</TableHeaderColumn>
                <TableHeaderColumn dataField="initial_date" dataSort={true}>Fecha de Inicio</TableHeaderColumn>
                <TableHeaderColumn dataField="closing_date"  dataSort={true}  >Fecha de Cierre</TableHeaderColumn>
                <TableHeaderColumn dataField="notification_type"  dataSort={true} >Tipo</TableHeaderColumn>
                { this.tableComponent(this.props.userType) }
              </BootstrapTable>
            </div>
          </div>
        </div>
      )
  }
}

export default Notifications;
