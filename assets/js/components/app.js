import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from './navbar';
import SonidosLibresPlayerContent from '../containers/sonidosLibresPlayerContent';
import { StickyContainer, Sticky } from 'react-sticky';
import injectTapEventPlugin from 'react-tap-event-plugin';
import  Loading from 'react-loading';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();
const style = {
  margin: 12,
};
const App = ({children}) => {
    return(
        <MuiThemeProvider>
          <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css"/>
            <Navbar/>
            <div  className="navbarMarginTopForContainer back">
                {children}
            </div>
              <SonidosLibresPlayerContent />
              </div>
        </MuiThemeProvider>



    )
}

export default App;
