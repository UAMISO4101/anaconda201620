import React, {Component} from 'react';
import Navbar from './navbar';
import NotificationForm from './notificationForm';


class App extends Component{
    render(){
        return(
            <div >
                <Navbar/>
                <div className="navbarMarginTopForContainer">
                    <NotificationForm/>
                </div>
            </div>
        )
    }
}

export default App;
