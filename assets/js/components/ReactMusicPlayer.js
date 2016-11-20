import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import shuffle from 'shuffle-array';
import {Row, Grid, Col} from 'react-bootstrap';
class ReactMusicPlayer extends Component {
  constructor(props){
    super(props);
    this.state = {
      active: this.props.songs[0],
      current: 0,
      progress: 0,
      random: false,
      repeat: false,
      mute: false,
      play: this.props.autoplay || false,
      songs: this.props.songs
    }
  }
  componentWillReceiveProps(nextProps) {
  // You don't have to do this check first, but it can help prevent an unneeded render
  if (nextProps.songs !== this.state.songs) {
    this.setState({ songs: nextProps.songs, active: nextProps.songs[0] });
  }
}
  componentDidMount () {
    let playerElement = this.refs.player;
    playerElement.addEventListener('timeupdate', this.updateProgress.bind(this));
    playerElement.addEventListener('ended', this.end.bind(this));
    playerElement.addEventListener('error', this.next.bind(this));
  }

  componentWillUnmount(){
    let playerElement = this.refs.player;
    playerElement.removeEventListener('timeupdate', this.updateProgress);
    playerElement.removeEventListener('ended', this.end);
    playerElement.removeEventListener('error', this.next);
  }

  setProgress(e){
    let target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
    let width = target.clientWidth;
    let rect = target.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    let duration = this.refs.player.duration;
    let currentTime = (duration * offsetX) / width;
    let progress = (currentTime * 100) / duration;
    this.refs.player.currentTime = currentTime;
    this.setState({ progress: progress });
    this.play();
  }

  updateProgress(){
    let duration = this.refs.player.duration;
    let currentTime = this.refs.player.currentTime;
    let progress = (currentTime * 100) / duration;

    this.setState({ progress: progress });
  }

  play(){
    this.setState({ play: true });
    this.refs.player.play();
  }

  pause(){
    this.setState({ play: false });
    this.refs.player.pause();
  }

  toggle(){
    this.state.play ? this.pause() : this.play();
  }

  end(){
    (this.state.repeat) ? this.play() : this.setState({ play: false });
  }

  next(){
    var total = this.state.songs.length;
    var current = (this.state.repeat) ? this.state.current : (this.state.current < total - 1) ? this.state.current + 1 : 0;
    var active = this.state.songs[current];

    this.setState({ current: current, active: active, progress: 0 });

    this.refs.player.src = active.url;
    this.play();
  }

  previous(){
    var total = this.state.songs.length;
    var current = (this.state.current > 0) ? this.state.current - 1 : total - 1;
    var active = this.state.songs[current];

    this.setState({ current: current, active: active, progress: 0 });

    this.refs.player.src = active.url;
    this.play();
  }

  randomize(){
    var s = shuffle(this.state.songs.slice());

    this.setState({ songs: (!this.state.random) ? s : this.state.songs, random: !this.state.random });
  }

  repeat(){
    this.setState({ repeat: !this.state.repeat });
  }

  toggleMute(){
    let mute = this.state.mute;

    this.setState({ mute: !this.state.mute });
    this.refs.player.volume = (mute) ? 1 : 0;
  }

  render () {

    const { active, play, progress } = this.state;

    let coverClass = classnames('player-cover', {'no-height': !!!active.cover });
    let playPauseClass = classnames('fa', {'fa-pause': play}, {'fa-play': !play});
    let volumeClass = classnames('fa', {'fa-volume-up': !this.state.mute}, {'fa-volume-off': this.state.mute});
    let repeatClass = classnames('player-btn small repeat', {'active': this.state.repeat});
    let randomClass = classnames('player-btn small random', {'active': this.state.random });

    return (
        <div className="fullwidth">
          <Row>
           <div className="player-container">
        <audio src={active.url} autoPlay={this.state.play} preload="auto" ref="player"></audio>
            <Col md={3} xs={12}>
                 <div className="player-buttons player-controls">


                    <button onClick={this.previous.bind(this)} className="player-btn medium" title="Previous Song">
                      <i className="fa fa-backward" />
                    </button>
                    <button onClick={this.toggle.bind(this)} className="player-btn big" title="Play/Pause">
                      <i className={playPauseClass} />
                    </button>
                    <button onClick={this.next.bind(this)} className="player-btn medium" title="Next Song">
                      <i className="fa fa-forward" />
                    </button>
                  </div>
               </Col>
          <Col xs={1} md={1}>
             <div className={coverClass} style={{backgroundImage: 'url('+ active.cover +')'}}></div>
          </Col>
             <Col  xs={10} md={8}>
               <div className="artist-info">
                 <div>
                    <Col xs={5} md={5}>
                   <h3 className="artist-song-name">{active.soundtrack.song}</h3>
                 </Col>
                    <Col xs={5} md={5}>

                   <h3 className="artist-name">{active.soundtrack.name}</h3>
                 </Col>
                 </div>
               </div>
               </Col>
             <Row>

               <Col md={6} xs={12}>
                <div className="player-progress-container" onClick={this.setProgress.bind(this)}>
                  <span className="player-progress-value" style={{width: progress + '%'}}></span>
                </div>
               </Col>
               <Col md={3} xs={12}>
                    <div className="player-buttons">
                      <button className="player-btn small volume" onClick={this.toggleMute.bind(this)} title="Mute/Unmute">
                        <i className={volumeClass} />
                      </button>

                      <button className={repeatClass} onClick={this.repeat.bind(this)} title="Repeat">
                        <i className="fa fa-repeat" />
                      </button>

                      <button className={randomClass} onClick={this.randomize.bind(this)} title="Shuffle">
                        <i className="fa fa-random" />
                      </button>
                    </div>
               </Col>
             </Row>

      </div>
        </Row>
        </div>


    );
  }
}

ReactMusicPlayer.propTypes = {
  autoplay: PropTypes.bool,
  songs: PropTypes.array.isRequired
};

export default ReactMusicPlayer;
