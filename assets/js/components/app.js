import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from './navbar';
import SonidosLibresPlayerContent from '../containers/sonidosLibresPlayerContent';

import  Loading from 'react-loading';
const App = ({children}) => {
    let user_id = children.props.params.id;
    return(
        <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css"/>
            <Navbar user_id={user_id}/>
            <div  className="navbarMarginTopForContainer back">
                {children}
            </div>
            <SonidosLibresPlayerContent />

        </div>


    )
}

export default App;
