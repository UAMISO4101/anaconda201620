import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';



class ArtworkRequest extends Component {

    constructor(props) {
        super(props);
         this.state = {
            show: false,
        };
    }

    tableComponent(userType){
      switch (userType){
        case "artist":
          return( null)
        case "comercial_agent":
          return null
        default:
          return null
      }
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
        </div>
        )
    }
}

export default ArtworkRequest;
