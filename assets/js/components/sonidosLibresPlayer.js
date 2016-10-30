import React, {Component} from 'react';
import { CA_DASHBOARD, ARTIST_DASHBOARD } from '../utils/constants'
import ReactMusicPlayer from './ReactMusicPlayer'

class SonidosLibresPlayer extends Component{
    render(){
      return(
        <ReactMusicPlayer songs={this.props.audios} autoplay />
      )
    }
}
export default SonidosLibresPlayer;
