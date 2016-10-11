import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn, Button } from 'react-bootstrap-table';
import FaEdit from 'react-icons/lib/fa/edit';
import SweetAlert from 'sweetalert-react';
import {Modal,OverlayTrigger, Checkbox} from 'react-bootstrap';
import { Link } from 'react-router';
import { CA_DASHBOARD, SERVER_URL } from '../utils/constants';

import ArtworkRequest from './artworkRequest';

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
        modalRequest : null
    };
  }
  componentDidMount(){
    console.log("Notifications Mounted!");
      console.log(this);
    this.props.fetchNotifications();
  }



  closeModal() { this.setState({ showModal: false }); }
  openModal(cell) {
      this.setState({ showModal: true, modalRequest: cell });
  }

  formatRequests(cell, row){
      return (<button onClick={()=>{
          this.openModal(cell)
      }}  type="submit">Ver</button>);
 }

  formatEdit(cell, row){
    return (
      <Link to={`${CA_DASHBOARD}/convocatoria/${cell}`}> <FaEdit /> </Link>
    );
  }
  formatPublish(cell, row) {
    return (
      <input type="checkbox" onChange={this.publishClick.bind(this)} id={`publish-${row.id}`}  checked={ cell == "PUB" ? true : false}/>
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
        <div>
          <SweetAlert
            show={this.state.show}
            type={this.state.type}
            title={this.state.sweetAlertTitle}
            text={this.state.sweetAlertMessage}
            onConfirm={() => this.setState({ show: false })}
            />

          <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Detalle solicitudes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ArtworkRequest request={this.state.modalRequest}/>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
          </Modal>
          <center>
             <div className="border col-sm-12">
               <center>
                 <h1>Convocatorias</h1>

               </center>

          </div>
          </center>

          <div className="row" >
            <div className="col-sm-push-1 col-sm-11 col-xs-12 " >
              <BootstrapTable data={this.props.notifications.notifications } striped={true} hover={true}>
                <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataSort={true}>Nombre</TableHeaderColumn>
                <TableHeaderColumn dataField="description" dataAlign="center" dataSort={true}>Descripción</TableHeaderColumn>
                <TableHeaderColumn dataField="initial_date" dataSort={true}>Fecha de Inicio</TableHeaderColumn>
                <TableHeaderColumn dataField="closing_date"  dataSort={true}  >Fecha de Cierre</TableHeaderColumn>
                <TableHeaderColumn dataField="notification_type"  dataSort={true} >Tipo</TableHeaderColumn>
                <TableHeaderColumn dataField="id" dataFormat={this.formatEdit}  dataSort={false} >Editar</TableHeaderColumn>
                {this.props.params.tipo!=='artista'? <TableHeaderColumn dataField="publishingState" dataFormat={this.formatPublish}  dataSort={false} >Publicar</TableHeaderColumn>:<TableHeaderColumn dataField="request" dataFormat={this.formatRequests.bind(this)} dataSort={false}>Obras</TableHeaderColumn>}
                {this.props.params.tipo!=='artista'?  <TableHeaderColumn dataField="request" dataFormat={this.formatRequests.bind(this)} dataSort={false}>Solicitudes</TableHeaderColumn> :  <TableHeaderColumn dataField="request" dataFormat={this.formatRequests.bind(this)} dataSort={false}>Participar</TableHeaderColumn>}
              </BootstrapTable>
            </div>
          </div>
        </div>
      )

  }



}

export default Notifications;
