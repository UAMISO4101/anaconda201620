import React, {Component} from 'react';
import { CA_DASHBOARD } from '../utils/constants'

class Navbar extends Component{
    render(){
        return(
            <nav className="navbar navbar-default navbar-fixed-top ">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Sonidos Libres</a>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><a href="#">Home</a></li>
                            <li><a href={`#${CA_DASHBOARD}`}>Crear Convocatoria</a></li>
                            <li><a href={`#${CA_DASHBOARD}/convocatorias`}>Convocatorias</a></li>

                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;
