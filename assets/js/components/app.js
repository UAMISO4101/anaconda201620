import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from './navbar';
import NotificationForm from './notificationForm';


const App = ({children}) => {
    return(
        <div >
            <Navbar/>
            <div className="navbarMarginTopForContainer">
                {children}
            </div>
        </div>
    )
}

export default App;
