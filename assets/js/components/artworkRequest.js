import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {AU} from '../testData/states';


class ArtworkRequest extends Component {

    constructor(props) {
      super(props);
       this.state = {
          country: 'AU',
          clearable: true,
    			disabled: false,
          onFocus: '',
    			searchable: true,
    			selectValue: 'new-south-wales',
          show: false,
      };
      this.updateValue = this.updateValue.bind(this);
    }

    switchCountry (e) {
  		var newCountry = e.target.value;
  		console.log('Country changed to ' + newCountry);
  		this.setState({
  			country: newCountry,
  			selectValue: null
  		});
  	}

  	updateValue (newValue) {
  		console.log('State changed to ' + newValue);
  		this.setState({
  			selectValue: newValue
  		});
  	}

  	focusStateSelect () {
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
          return( <TableHeaderColumn dataFormat={this.requestUpload.bind(this)}> Upload Artwork </TableHeaderColumn> )
        case "comercial_agent":
          return( <TableHeaderColumn hidden={true}> </TableHeaderColumn> )
        default:
          return( <TableHeaderColumn hidden={true}> </TableHeaderColumn> )
      }
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

    requestUpload(cell, row){
      return (
        <div className="section artwork-selection">
  				<Select ref="stateSelect"
             autofocus
             options={AU}
             simpleValue
             clearable={this.state.clearable}
             name="selected-state"
             disabled={this.state.disabled}
             value={this.state.selectValue}
             onChange={this.updateValue}
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
