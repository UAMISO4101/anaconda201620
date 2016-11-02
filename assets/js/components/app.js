import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from './navbar';
import SonidosLibresPlayerContent from '../containers/sonidosLibresPlayerContent';
import { StickyContainer, Sticky } from 'react-sticky';
import Fixed from 'react-fixed';
import  Loading from 'react-loading';
const App = ({children}) => {
    return(
        <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css"/>
            <Navbar/>
            <div  className="navbarMarginTopForContainer back">
                {children}
            </div>
            <Fixed>
              <SonidosLibresPlayerContent />
            </Fixed>
        </div>


    )
}

export default App;
