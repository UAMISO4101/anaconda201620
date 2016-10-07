import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn, Button } from 'react-bootstrap-table';
import FaEdit from 'react-icons/lib/fa/edit';

import {Checkbox} from 'react-bootstrap';


class Notifications extends Component {

  constructor(props){
    super(props);
    this.formatEdit = this.formatEdit.bind(this);
    this.formatPublish = this.formatPublish.bind(this);
    this.editClick = this.editClick.bind(this);
  }
  componentDidMount(){
    console.log("Notifications Mounted!")
    this.props.fetchNotifications();
  }


  formatEdit(cell, row){;
      return (<button onClick={this.editClick}
                        name="btnRequests"
                        ref={`edit-${cell}`}
                    ><FaEdit /></button>);
  }
  formatPublish(cell, row) {;
      return (<Checkbox
              onClick={this.publishClick.bind(this)}
              ref={`publish-${cell}`}
              />);
  }
  editClick(){
    console.log(this.refs);
  }
  publishClick(){
    console.log(this.refs);
  }

  closeModal() { this.setState({ showModal: false }); }
  openModal() { this.setState({ showModal: true }); }


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
                 <TableHeaderColumn dataField="id" dataFormat={this.formatEdit}  dataSort={false} >Editar</TableHeaderColumn>
                 <TableHeaderColumn dataField="id" dataFormat={this.formatPublish}  dataSort={false} >Publicar</TableHeaderColumn>
             </BootstrapTable>
            </div>
          </div>
           </div>
      )

  }



}

export default Notifications;
