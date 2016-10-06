import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn, Button } from 'react-bootstrap-table';
import SweetAlert from 'sweetalert-react';

const formatRequests = (cell, row) => {;
    return (<button
                        onClick=""//Falta solo clickear
                      name="btnRequests"
                  >Ver Solicitudes</button>);
}
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
          <div>
           <div className="border col-sm-4">
                <h1>Lista de Convocatorias</h1>
               </div>
               <div className="row" >
            <div className="col-sm-push-1 col-sm-11 col-xs-12 " >
              <BootstrapTable data={this.props.notifications.notifications } striped={true} hover={true}>
                 <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
                 <TableHeaderColumn dataField="name" dataSort={true}>Nombre</TableHeaderColumn>
                 <TableHeaderColumn dataField="description" dataAlign="center" dataSort={true}>Descripción</TableHeaderColumn>
                 <TableHeaderColumn dataField="initial_date" dataSort={true}>Fecha de Inicio</TableHeaderColumn>
                 <TableHeaderColumn dataField="closing_date"  dataSort={true}  >Fecha de Cierre</TableHeaderColumn>
                 <TableHeaderColumn dataField="notification_type"  dataSort={true} >Tipo</TableHeaderColumn>
                  <TableHeaderColumn dataField="id" dataFormat={formatRequests}  dataSort={false} >Acciones</TableHeaderColumn>
             </BootstrapTable>
            </div>
          </div>
           </div>
      )

  }



}

export default Notifications;
