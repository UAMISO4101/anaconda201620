import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import SweetAlert from 'sweetalert-react';
import StarRatingComponent from 'react-star-rating-component';
import FaApple from 'react-icons/lib/fa/apple';


import { SERVER_URL} from '../utils/constants';
import { addRequest } from '../actions';

const startsFormatter = (cell, row) => {
  return (<StarRatingComponent
                      name="rate2"
                      editing={false}
                      renderStarIcon={() => <span><FaApple /></span>}
                      starCount={5}
                      value={cell}
                  />)
}

class IndexContent extends Component{
  componentDidMount(){
    console.log("IndexContent Mounted!")
    this.props.fetchSoundTracks();
  }

  closeModal() { this.setState({ showModal: false }); }
  openModal() { this.setState({ showModal: true }); }


  render(){
    return(
      <div className="index-content">

          <SweetAlert
              show={this.props.saModal.show}
              type={this.props.saModal.type}
              title={this.props.saModal.title}
              text={this.props.saModal.text}
              onConfirm={() => this.props.hideSAModal()}
          />
          <div className="row">
            <div className="col-sm-push-3 col-sm-8 col-xs-12 " >
                <h1>Nuestros Sonidos de Moda</h1>
                <br/>  <br/>  <br/>
            </div>
          </div>
          <div className="row" >
            <div className="col-sm-push-1 col-sm-11 col-xs-12 " >
              <BootstrapTable data={this.props.soundtracks.sounds } striped={true} hover={true}>
                 <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
                 <TableHeaderColumn dataField="sound" dataAlign="center" dataSort={true}>Sonido</TableHeaderColumn>
                 <TableHeaderColumn dataField="type" dataSort={true}>Tipo</TableHeaderColumn>
                 <TableHeaderColumn dataField="artist" >Artista</TableHeaderColumn>
                 <TableHeaderColumn dataField="rating"  dataSort={true} dataFormat={startsFormatter} >Rating</TableHeaderColumn>
                 <TableHeaderColumn dataField="likes"  dataSort={true} >Likes</TableHeaderColumn>
             </BootstrapTable>
            </div>
          </div>
        </div>
      )
    }
}

export default IndexContent;
