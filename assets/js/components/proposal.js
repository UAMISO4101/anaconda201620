import React, {Component} from 'react';
import { ListGroupItem , Button} from 'react-bootstrap'
import FaUserSecret from 'react-icons/lib/fa/user-secret'
import Coverflow from 'react-coverflow';
import {StyleRoot} from 'radium';
import {CA_DASHBOARD, SERVER_URL,DEFAULT_IMAGE} from "../utils/constants.js";
import SweetAlert from 'sweetalert-react';
import RaisedButton from 'material-ui/RaisedButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import {fullWhite} from 'material-ui/styles/colors';
const style = {
  margin: '12dp',
  backgroundColor: '#212121',
  labelColor: '#fff'
}
class Proposal extends Component {
  constructor(props){
    super(props);
    this.state = {
        active: 0,
        choosedAudio:{soundtrack:{song: "Escoge una canción."}},
        selectedAudio: false,
        selectedProposal: false,
        show: false,
        sweetAlertOnConfirm: () => {},
        sweetAlertMessage: "",
        sweetAlertTitle: "",
        type: "success",
        userId: window.localStorage.userId
   };
  }

  render(){
    let artist = this.props.proposal.artist;
    let artworks = this.props.proposal.artworks;
    return (
      <div>
        <SweetAlert
            show={this.state.show}
            type={this.state.type}
            title={this.state.sweetAlertTitle}
            text={this.state.sweetAlertMessage}
            onConfirm={this.state.sweetAlertOnConfirm}
        />
        <div className={`row ${this.state.selectedProposal ? "selectedProposal" : ""}`}>
          <hr/><hr/>
          <div className="col-sm-3" style={{textAlign: 'center'}}>
            <FaUserSecret size={60} color='#19708D' /><br/>
            <h3>{artist}</h3>
            <br/>
            <br/>
            { this.selectProposalButton() }
            <br/>
            <br/>
            <RaisedButton label="Reproducir Propuesta"
           labelColor={style.labelColor}
            backgroundColor="#a4c639"
            icon={<PlayArrow color={fullWhite} />}
            onClick={()=>{
        this.props.changedSongs(this.props.proposal.audios)}
        } />
          </div>
          <div className="col-sm-9">
            <div href="#" className="">
              <div >
                <Coverflow
                  width={500}
                  height={380}
                  displayQuantityOfSide={2}
                  navigation={false}
                  enableHeading={true}
                  active={this.state.active}
                  >
                  {this.props.proposal.audios.map( audio => {
                    return (<img src={audio.cover || DEFAULT_IMAGE} alt={audio.soundtrack.song} data-action={()=>{
                      this.setState({
                        choosedAudio: audio,
                        selectedAudio: true
                      });
                    }} />)
                  })}

                </Coverflow>
              </div>
            </div>
          </div>
        </div>
        <br/><br/><hr/>
      </div>
    );
  }

  selectProposalButton() {
    if(this.props.notification.notification_type == "PB") {
      return (
        <button className="btn btn-primary" onClick={ ()=>{this.props.selectProposal(this)} } >
          Escoger esta propuesta como ganadora
        </button>
      )
    } else {
      // this.props.notification  ; CREATED = 'CRE'; PUBLISHED = 'PUB'; CLOSED = 'CER'; FINISHED = 'FIN'
      if ( this.props.notification.notification_state == "CER" && this.props.proposal.tie ) {
        return (
          <span>
            <FaThumbsOUp/> { this.props.proposal.likes } &nbsp;
            <button type="button" onClick={ this.selectProposal } className="btn btn-primary" aria-label="Left Align">
              Escoger esta obra como ganadora
            </button>
          </span>
        )
      }else{
        return (
          <span>
            <FaThumbsOUp/> { this.props.proposal.likes } &nbsp;
            <button type="button" className="btn btn-primary disabled" aria-label="Left Align">
              Publica debe haber un empate para poder Escoger Y estar cerrada
            </button>
          </span>
        )
      }
    }
  }

};



export default Proposal;
