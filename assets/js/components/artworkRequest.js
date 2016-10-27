import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


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
      };
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
                      <button className='btn btn-primary'>Postularme</button>
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

  	toggleCheckbox (e) {
  		let newState = {};
  		newState[e.target.name] = e.target.checked;
  		this.setState(newState);
  	}

    tableComponent(userType){
      switch (userType){
        case "artist":
          return( <TableHeaderColumn dataField="id" dataFormat={this.requestUpload.bind(this)}> Tipo & canción </TableHeaderColumn> )
        case "comercial_agent":
          return( <TableHeaderColumn hidden={true}> </TableHeaderColumn> )
        default:
          return( <TableHeaderColumn hidden={true}> </TableHeaderColumn> )
      }
    }

    requestUpload(cell, row){
      return (
        <div className="section artwork-selection">
          <div>
            Seleccionado: { this.state.selectValue[cell] }
          </div>
  				<Select ref={cell}
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
}

export default ArtworkRequest;
