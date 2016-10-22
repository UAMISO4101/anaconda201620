import React, {Component} from 'react';
import { ListGroupItem } from 'react-bootstrap'
import FaEraser from 'react-icons/lib/fa/eraser'

class Request extends Component {
  constructor(props){
    super(props);
    this.deleteRequest = this.deleteRequest.bind(this);
  }

  deleteRequest(event){
    this.props.deleteRequest(this.props.rq.id)
  }

  render(){
    return (
      <li className="list-group-item">
        {`${this.props.rq.name} \n ${this.props.rq.features}.`}
        <button type="button" onClick={this.deleteRequest} className="btn btn-default" aria-label="Left Align">
         <FaEraser/>
        </button>
      </li>);
    }
};

export default Request;
