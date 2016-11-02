import React, {Component} from 'react';
import { CA_DASHBOARD, ARTIST_DASHBOARD } from '../utils/constants'
import ReactMusicPlayer from './ReactMusicPlayer'

class SonidosLibresPlayer extends Component{
    render(){
      //if (this.props.setted) {
        return(
          <ReactMusicPlayer songs={this.props.audios}  />
        )
      // } else {
      //   return(
      //     null
      //   )
      // }
    }
}
export default SonidosLibresPlayer;
