import React, {Component} from 'react';
import { CA_DASHBOARD, ARTIST_DASHBOARD } from '../utils/constants'
class Navbar extends Component{
    render(){
        return(
            <header id="header" role="banner">
                <div className="main-nav fixed-menu">
                    <div className="container">
                        <div className="header-top">
                            <div className="pull-right social-icons">
                                <a href="#"><i className="fa fa-twitter"></i></a>
                                <a href="#"><i className="fa fa-facebook"></i></a>
                                <a href="#"><i className="fa fa-google-plus"></i></a>
                                <a href="#"><i className="fa fa-youtube"></i></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="#">
                                    <img className="img-responsive" src={require('../../images/logo.png')} alt="logo"/>
                                </a>
                            </div>
                            <div className="collapse navbar-collapse">
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a href="#">Home</a></li>
                                    <li><a href={`#${CA_DASHBOARD}/${this.props.user_id}/`}>Crear Convocatoria</a></li>
                                    <li><a href={`#${CA_DASHBOARD}/${this.props.user_id}/convocatorias`}>Convocatorias</a></li>
                                    <li><a href={`#${ARTIST_DASHBOARD}/${this.props.user_id}/convocatorias`}>Participar</a></li>
                                    {/*<li className="scroll active"><a href="#home">Home</a></li>*/}
                                    {/*<li className="scroll"><a href="#explore">Explore</a></li>*/}
                                    {/*<li className="scroll"><a href="#event">Event</a></li>*/}
                                    {/*<li className="scroll"><a href="#about">About</a></li>*/}
                                    {/*<li className="no-scroll"><a href="#twitter">Twitter</a></li>*/}
                                    {/*<li><a className="no-scroll" href="#" target="_blank">PURCHASE TICKETS</a></li>*/}
                                    {/*<li className="scroll"><a href="#contact">Contact</a></li>*/}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Navbar;
