import React, {Component} from 'react';
import { CA_DASHBOARD, ARTIST_DASHBOARD } from '../utils/constants'
import { auth } from '../utils/auth';
import { USER_ROLES } from '../utils/constants';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';

const ArtistNavBarComponent = (userId) => {return <li><a href={`#${ARTIST_DASHBOARD}/${userId}/convocatorias`}>Participar</a></li>} ;
const style = {margin: 5};
const authComponent = () => {
  if (auth.loggedIn()) {
    let user = auth.getUserInformation();
    return(
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">

            <Avatar
         src={ user.image != "null" ? user.image : "http://thumb9.shutterstock.com/display_pic_with_logo/1186124/180542816/stock-vector-vector-hipster-icon-180542816.jpg" } className="img-thumbnail" alt={user.username}
         size={30}
         style={style}
       />
            <strong>{user.username}</strong>
            <span className="glyphicon glyphicon-chevron-down"></span>
        </a>
        <ul className="dropdown-menu">
            <li>
                <div className="navbar-login">
                    <div className="row">
                        <div className="col-sm-4">
                            <p className="text-center">
                                <img src={ user.image != "null" ? user.image : "http://thumb9.shutterstock.com/display_pic_with_logo/1186124/180542816/stock-vector-vector-hipster-icon-180542816.jpg" } className="img-thumbnail" alt={user.username} width="40" height="40" />
                            </p>
                        </div>
                        <div className="col-sm-8">
                            <p className="text-left"><strong>{user.username}</strong></p>
                            <p className="text-left small">{user.email}</p>
                        </div>
                    </div>
                </div>
            </li>
            <li className="divider"></li>
            <li>
                <div className="navbar-login navbar-login-session">
                    <div className="row">
                        <div className="col-lg-12">
                            <p>
                                <button className='btn btn-danger btn-block' onClick={()=>{
                                    auth.logout(()=>{
                                      window.location = "#";
                                    });
                                  }}>Logout</button>
                            </p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
      </li>
    )
  } else {
    return(
      <li className="scroll active">
        <Link to='/auth'>Cuenta</Link>
      </li>
    )
  }
}
const ComercialAgentNavBarComponent = (userId) => {
  return [
    <li><a href={`#${CA_DASHBOARD}/${userId}/`}>Crear Convocatoria</a></li>,
    <li><a href={`#${CA_DASHBOARD}/${userId}/convocatorias`}>Convocatorias</a></li>
]}
const userTypeComponent = (userId) => {
  switch (auth.getUserInformation().role) {
    case USER_ROLES.ARTIST :
        return ArtistNavBarComponent(userId);
      break;
    case USER_ROLES.COMERCIAL_AGENT :
        return ComercialAgentNavBarComponent(userId);
      break;
    default:
      return null
  }
}

class Navbar extends Component{
    render(){
        let userId = window.localStorage.userId;
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
                                    { userTypeComponent(userId) }
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
