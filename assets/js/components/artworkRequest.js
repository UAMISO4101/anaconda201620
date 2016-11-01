import React, {Component} from 'react';
import { connect } from 'react-redux';
import {ARTIST_DASHBOARD, SERVER_URL} from '../utils/constants';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Select from 'react-select';
import SweetAlert from 'sweetalert-react';

import 'react-select/dist/react-select.css';

function buildPairs(requests, {selectValue} ) {
    let pairs = [];
    for (let request of requests) {
      let request_id = request.id;
      pairs.push({id_artwork: selectValue[request_id], id_feature: request_id});
    }
  return pairs
}
function buildPropousal(props, state){
  return {
    proposal: {
      id_user: props.userId,
      id_notification:  props.actualNotification.id,
      pairs: buildPairs(props.request, state)
    }
  }
}
class ArtworkRequest extends Component {

    constructor(props) {
      super(props);
      let selectValue = {};
      for (let request in this.props.request) {
        selectValue[request.id] = null
      }
      this.state = {
          onFocus: '',
    			searchable: true,
    			selectValue: selectValue ,
          show: false,
          sweetAlertOnConfirm: () => {this.setState({ show: false })},
          sweetAlertTitle: "",
          sweetAlertMessage: "",
          type: "warning",
      };
      this.sendRequest = this.sendRequest.bind(this);
      this.validateRequest = this.validateRequest.bind(this);
    }

    componentDidMount(){
      this.props.fetchArtistArtworks(this.props.userId);
    }

    buttonsComponent(userType){
        switch (userType){
            case "artist":
                return (
                  <div className="row" >
                    <div className="col-sm-push-1 col-sm-5 col-xs-12" >
                      <button className='btn btn-primary' onClick={this.sendRequest}>Postularme</button>
                    </div>
                    <div className="col-sm-5 col-xs-12 " >
                      <button className='btn btn-danger' onClick={()=>{
                            this.props.hideNotifictionModal();
                          }
                        }
                      >Cancelar</button>
                    </div>
                  </div>
                )
            case "comercial_agent":
                return null
            default:
                return null
        }
    }

  	focusStateSelect () {
      cosole.log("focus");
  		this.refs.stateSelect.focus();
  	}

    requestUpload(cell, row){
      let selectLabel = this.state.selectValue[cell] ? this.props.artworks.filter((artwork)=>{return(artwork.value == this.state.selectValue[cell])})[0].label : "";
      return (
        <div className="section artwork-selection">
          <div>
            Seleccionado: { selectLabel }
          </div>
  				<Select ref={`artwork-${cell}`}
             autofocus
             options={this.props.artworks}
             simpleValue
             clearable
             name="selected-state"
             value={this.state.selectValue[cell]}
             onChange={(newValue) => {
                if(newValue != this.state.selectValue[cell]){
                  let obj = this.state.selectValue;
                  obj[cell] = newValue;
                  this.setState({
                    selectValue: obj
                 });
               }
         	   }}
             searchable={this.state.searchable}
          />
  			</div>
      );
    }

    render() {
        return (
        <div className="artworkrequest-content">
            <SweetAlert
                show={this.state.show}
                type={this.state.type}
                title={this.state.sweetAlertTitle}
                text={this.state.sweetAlertMessage}
                onConfirm={this.state.sweetAlertOnConfirm}
            />
            <div className="row" >
            <div className="col-sm-push-1 col-sm-11 col-xs-12 " >
              <BootstrapTable data={this.props.request} striped={true} hover={true}>
                  <TableHeaderColumn dataField="name"  isKey={true}  dataAlign="center" dataSort={true}>Name</TableHeaderColumn>
                  <TableHeaderColumn dataField="features" dataSort={true}>Features</TableHeaderColumn>
                  { this.tableComponent(this.props.userType) }
              </BootstrapTable>
            </div>
          </div>
          { this.buttonsComponent(this.props.userType) }
        </div>
        )
    }

    sendRequest(){
      if (this.validateRequest()){
        let propousal = buildPropousal(this.props,this.state);
        console.log('propousal');
        console.log(propousal);
         $.ajax({
           method: 'POST',
           url: `${SERVER_URL}/comercial_agent/notifications/postulate-artworks/`,
           data: JSON.stringify(propousal),
         })
         .done(( msg ) => {
             this.setState({
               type: "success",
               show: true,
               showModal: false,
               sweetAlertOnConfirm: () => {this.setState({show: false}); window.location = `#${ARTIST_DASHBOARD}/${this.props.userId}/convocatorias`; },
               sweetAlertMessage: "Postulación enviada exitosamente",
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
      }else {
        this.setState({
          sweetAlertMessage: "Por favor escoge una obra para cada solicitud.",
          sweetAlertTitle: "Campos vacios",
          type: "warning",
          show: true
        });
      }
    }

    toggleCheckbox (e) {
      let newState = {};
      newState[e.target.name] = e.target.checked;
      this.setState(newState);
    }

    tableComponent(userType){
      switch (userType){
        case "artist":
          return( <TableHeaderColumn dataField="id" dataFormat={this.requestUpload.bind(this)}> Tipo & Obra </TableHeaderColumn> )
        case "comercial_agent":
          return( <TableHeaderColumn hidden={true}> </TableHeaderColumn> )
        default:
          return( <TableHeaderColumn hidden={true}> </TableHeaderColumn> )
      }
    }

    validateRequest(){
      for (let request of this.props.request) {
        if (this.state.selectValue[request.id] == null) {
          return false;
        }
      }
      return true;

    }
}

export default ArtworkRequest;
