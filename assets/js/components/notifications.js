import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn, Button } from 'react-bootstrap-table';
import FaEdit from 'react-icons/lib/fa/edit';
import SweetAlert from 'sweetalert-react';
import {Checkbox} from 'react-bootstrap';
import { Link } from 'react-router';
import { CA_DASHBOARD, SERVER_URL } from '../utils/constants';

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
      type: "warning"
    };
  }
  componentDidMount(){
    console.log("Notifications Mounted!")
    this.props.fetchNotifications();
  }

  formatRequests(cell, row){;
     return (<button
                         onClick=""//Falta solo clickear
                       name="btnRequests"
                   >Ver Solicitudes</button>);
 }
  formatEdit(cell, row){;
    return (
      <Link to={`${CA_DASHBOARD}/convocatoria/${cell}`}> <FaEdit /> </Link>
    );
  }
  formatPublish(cell, row) {;
    return (<Checkbox
      onClick={this.publishClick.bind(this)}
      id={`publish-${cell}`}
      />);
    }
    editClick(notification){
      this.props.editNotification(getNotificationId(notification));
    }
    publishClick(notification){
      $.ajax({
        method: "EDIT",
        url: `${SERVER_URL}/comercial_agent/notifications/${idNotification}/publish`,
        data: JSON.stringify(notificationObj),

      })
      .done(( msg ) => {
        alert( "Data Saved: " + msg );
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
                <TableHeaderColumn dataField="publishingState" dataFormat={this.formatPublish}  dataSort={false} >Publicar</TableHeaderColumn>
                 <TableHeaderColumn dataField="id" dataFormat={this.formatRequests}  dataSort={false} >Solicitudes</TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </div>
      )

    }



  }

  export default Notifications;
