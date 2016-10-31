import React, {Component} from 'react';
import { ListGroupItem } from 'react-bootstrap'
import FaUserSecret from 'react-icons/lib/fa/user-secret'
import {DEFAULT_IMAGE} from "../utils/constants.js";

class Votations extends Component {
  constructor(props){
    super(props);
    this.deleteRequest = this.deleteRequest.bind(this);
  }

  deleteRequest(event){
    this.props.deleteRequest(this.props.rq.id)
  }

  render(){
    let artist = this.props.vt.artist;
    let artworks = this.props.vt.artworks;
    return (
      <div className="row">
        <div className="col-sm-3" style={{textAlign: 'center'}}>
          <FaUserSecret size={60} color='#19708D' /><br/>
          <h4>{artist.name}</h4>
        </div>
        <div className="col-sm-9">
          <div href="#" class="list-group-item list-group-item-action active">
            <h5 class="list-group-item-heading">ABC</h5>
            <p class="list-group-item-text">xyz</p>
          </div>
        </div>
      </div>


    );
  }
};

export default Votations;
