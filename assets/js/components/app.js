import React, {Component} from 'react';
import Navbar from './navbar';
import NotificationForm from './notificationForm';


class App extends Component{
    render(){
        return(
            <div className="container">
                <Navbar/>
                <NotificationForm/>
            </div>
        )
    }
}

export default App;
