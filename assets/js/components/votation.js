import React, {Component} from 'react';
import { ListGroupItem } from 'react-bootstrap'
import FaUserSecret from 'react-icons/lib/fa/user-secret'
import Coverflow from 'react-coverflow';
import {StyleRoot} from 'radium';
import {DEFAULT_IMAGE} from "../utils/constants.js";

class Votations extends Component {
  constructor(props){
    super(props);
    this.state = {
     active: 0
   };
  }

  render(){
    let soundtrack = this.props.vt.soundtrack;
    let artworks = this.props.vt.artworks;
    return (
      <div className="row">
        <hr/><hr/>
        <div className="col-sm-3" style={{textAlign: 'center'}}>
          <FaUserSecret size={60} color='#19708D' /><br/>
          <h4>{soundtrack.name}</h4>
        </div>
        <div className="col-sm-9">
          <div href="#" className="list-group-item list-group-item-action active">
            <div>
              <Coverflow
                width={500}
                height={380}
                displayQuantityOfSide={2}
                navigation={true}
                enableHeading={false}
                active={this.state.active}
                >
                {this.props.vt.audios.map( audio => {
                  return (<img src={audio.cover || DEFAULT_IMAGE} alt={audio.name} data-action={()=>{
                    console.log(audio.song);
                  }} />)
                })}

              </Coverflow>
            </div>
          </div>
        </div>
      </div>


    );
  }
};

export default Votations;
