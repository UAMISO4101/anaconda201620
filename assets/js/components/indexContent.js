import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';
import StarRatingComponent from 'react-star-rating-component';
import FaApple from 'react-icons/lib/fa/apple';


import { SERVER_URL, SOUNDS_FILTER, SOUNDS_TYPE} from '../utils/constants';

const startsFormatter = (cell, row) => {
  return (<StarRatingComponent
                      name="rate2"
                      editing={false}
                      renderStarIcon={() => <span><FaApple /></span>}
                      starCount={5}
                      value={cell}
                  />)
}

let filterVar = SOUNDS_FILTER.ALL;
let typeVar = SOUNDS_TYPE.SONG;

const translator = (varToFilter) => {
    switch(varToFilter){
        case 'all':
            return 'Todos';
            break;
        case 'recent':
            return 'Recientes';
            break;
        case 'rating':
            return 'Calificación';
            break;
        case 'album':
            return 'Albumes';
            break;
        case 'song':
            return 'Canciones';
            break;
        case 'sound':
            return 'Sonidos';
            break;
        default:
            return varToFilter;
            break;
    }
}

class IndexContent extends Component{
  constructor(props){
    super(props);
    this.coverImage = this.coverImage.bind(this);
  }
  componentDidMount(){
    console.log("IndexContent Mounted!")
    this.props.fetchSoundTracks(SOUNDS_FILTER.ALL, SOUNDS_TYPE.SONG);
  }

  closeModal() { this.setState({ showModal: false }); }
  openModal() { this.setState({ showModal: true }); }

  coverImage(cell,row){
    cell = cell != "" ? cell : 'http://orig02.deviantart.net/3d9c/f/2008/082/8/4/clave_de_sol_by_esepibe.png'; 
    return (<img src={cell} alt={cell} className='coverImage'/>)
  }
  render(){
    return(
      <div id = "twitter" className="index-content">

          <SweetAlert
              show={this.props.saModal.show}
              type={this.props.saModal.type}
              title={this.props.saModal.title}
              text={this.props.saModal.text}
              onConfirm={() => this.props.hideSAModal()}
          />
          <div className="row">
            <div className="border col-sm-12" >
                <center>
                <h3>Nuestros Sonidos de Onda</h3>
                    </center>
                <br></br>
            </div>
          </div>
          <div className="row" >
            <div className="col-sm-push-1 col-sm-11 col-xs-12 " >
              <DropdownButton id="soundsFilterDropdown" title={translator(filterVar)} onSelect={this.soundsFilterDropdownChange.bind(this)}>
                <MenuItem eventKey={SOUNDS_FILTER.ALL}>{translator(SOUNDS_FILTER.ALL)}</MenuItem>
                <MenuItem eventKey={SOUNDS_FILTER.RATING}>{translator(SOUNDS_FILTER.RATING)}</MenuItem>
                <MenuItem eventKey={SOUNDS_FILTER.RECENT}>{translator(SOUNDS_FILTER.RECENT)}</MenuItem>
              </DropdownButton>
              <DropdownButton id="soundsTypeDropdown" title={translator(typeVar)} onSelect={this.soundsTypeDropdownChange.bind(this)}>
                <MenuItem eventKey={SOUNDS_TYPE.ALBUM}>{translator(SOUNDS_TYPE.ALBUM)}</MenuItem>
                <MenuItem eventKey={SOUNDS_TYPE.SONG}>{translator(SOUNDS_TYPE.SONG)}</MenuItem>
                <MenuItem eventKey={SOUNDS_TYPE.SOUND}>{translator(SOUNDS_TYPE.SOUND)}</MenuItem>
              </DropdownButton>
              <BootstrapTable data={this.props.soundtracks.sounds } striped={true} hover={true}>
                 <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
                 <TableHeaderColumn dataField="cover" dataFormat={this.coverImage} >Cover</TableHeaderColumn>
                 <TableHeaderColumn dataField="sound" dataAlign="center" dataSort={true}>Sonido</TableHeaderColumn>
                 <TableHeaderColumn dataField="type" dataSort={true}>Tipo</TableHeaderColumn>
                 <TableHeaderColumn dataField="artist">Artista</TableHeaderColumn>
                 <TableHeaderColumn dataField="rating"  dataSort={true} dataFormat={startsFormatter} >Rating</TableHeaderColumn>
                 <TableHeaderColumn dataField="likes"  dataSort={true} >Likes</TableHeaderColumn>
             </BootstrapTable>
            </div>
          </div>
        </div>
      )
    }

    soundsFilterDropdownChange(selectedFilter){
        filterVar = selectedFilter;
        this.props.fetchSoundTracks(filterVar, typeVar);
    }

    soundsTypeDropdownChange(selectedType){
        typeVar = selectedType;
        this.props.fetchSoundTracks(filterVar, typeVar);
    }
}

export default IndexContent;
