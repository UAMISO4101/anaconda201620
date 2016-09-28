import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import SweetAlert from 'sweetalert-react';

import { SERVER_URL} from '../utils/constants';
import { addRequest } from '../actions';

const mapStateToProps = (state, router) => ({
  request: state.request
});


var products = [{
      id: 1,
      sound: "my sound",
      type: "A",
      artist: "Item name 1",
      popularity: 3
  },{
    id: 2,
    sound: "my sound2",
    type: "B",
    artist: "Item name 2",
    popularity: 2.4
  }];
// It's a data format example.
function priceFormatter(cell, row){
  return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
}

class IndexContent extends Component{

  constructor(props){
    super(props);
    this.state = {
      sweetAlertMessage: "",
      sweetAlertTitle: "",
      type: "error"
    };
  }

  closeModal() { this.setState({ showModal: false }); }
  openModal() { this.setState({ showModal: true }); }

  render(){
    return(
      <div className="sd notificationForm row">

          <SweetAlert
              show={this.state.show}
              type={this.state.type}
              title="Error"
              text={this.state.sweetAlertMessage}
              onConfirm={() => this.setState({ show: false })}
          />

          <div className="col-sm-push-1 col-sm-9 col-xs-12 " >
            <BootstrapTable data={products} striped={true} hover={true}>
               <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
               <TableHeaderColumn dataField="sound" dataAlign="center" dataSort={true}>Sonido</TableHeaderColumn>
               <TableHeaderColumn dataField="type" dataSort={true}>Tipo</TableHeaderColumn>
               <TableHeaderColumn dataField="artist" >Artista</TableHeaderColumn>
               <TableHeaderColumn dataField="popularity"  dataSort={true} >Popularidad</TableHeaderColumn>
           </BootstrapTable>,
          </div>
        </div>
      )
    }
}

export default connect(mapStateToProps)(IndexContent);
