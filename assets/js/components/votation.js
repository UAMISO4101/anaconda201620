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
        active: 0,
        selectedAudio: null,
   };
  }

  render(){
    let artist = this.props.vt.artist;
    let artworks = this.props.vt.artworks;
    return (
      <div className="row">
        <hr/><hr/>
        <div className="col-sm-3" style={{textAlign: 'center'}}>
          <FaUserSecret size={60} color='#19708D' /><br/>
          <h3>{artist}</h3>
          <br/>
          <h4 className="">{this.state.selectedAudio || 'Escoge una canción'}</h4>
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
                  return (<img src={audio.cover || DEFAULT_IMAGE} alt={artist} data-action={()=>{
                    this.setState({
                      selectedAudio: artist
                    });
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
