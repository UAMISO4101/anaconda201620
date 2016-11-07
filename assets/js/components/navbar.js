import React, {Component} from 'react';
import { CA_DASHBOARD, ARTIST_DASHBOARD } from '../utils/constants'
import { auth } from '../utils/auth';
import { USER_ROLES } from '../utils/constants';
import { Link } from 'react-router'

const ArtistNavBarComponent = <li><a href={`#${ARTIST_DASHBOARD}/1/convocatorias`}>Participar</a></li> ;

const authComponent = () => {
  if (auth.loggedIn()) {
    return(
      <li className="scroll active">
        <button className='btn btn-danger' style={{padding: '20px', 'font-size': '18px'}} onClick={()=>{
            auth.logout(()=>{
              window.location = "#";
            });
          }}>Logout</button>
        </li>
      )
  } else {
    return(
      <li className="scroll active">
        <Link to='/auth'>authenticación</Link>
      </li>
    )
  }
}
const ComercialAgentNavBarComponent = [
    <li><a href={`#${CA_DASHBOARD}`}>Crear Convocatoria</a></li>,
    <li><a href={`#${CA_DASHBOARD}/convocatorias`}>Convocatorias</a></li>
]
const userTypeComponent = () => {
  switch (auth.getUserRole()) {
    case USER_ROLES.ARTIST :
        return ArtistNavBarComponent;
      break;
    case USER_ROLES.COMERCIAL_AGENT :
        return ComercialAgentNavBarComponent;
      break;
    default:
      return null
  }
}

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
                                    { userTypeComponent() }
                                    { authComponent() }
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
