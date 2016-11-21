import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from './navbar';
import SonidosLibresPlayerContent from '../containers/sonidosLibresPlayerContent';
<<<<<<< HEAD
import { StickyContainer, Sticky } from 'react-sticky';
import injectTapEventPlugin from 'react-tap-event-plugin';
=======

>>>>>>> development
import  Loading from 'react-loading';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();
const style = {
  margin: 12,
};
const App = ({children}) => {
    let user_id = children.props.params.id;
    return(
        <MuiThemeProvider>
          <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css"/>
            <Navbar user_id={user_id}/>
            <div  className="navbarMarginTopForContainer back">
                {children}
            </div>
<<<<<<< HEAD
              <SonidosLibresPlayerContent />
              </div>
        </MuiThemeProvider>
=======
            <SonidosLibresPlayerContent />
>>>>>>> development



    )
}

export default App;
