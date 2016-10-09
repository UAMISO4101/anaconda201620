import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import NotificationForm from './notificationForm';
import { setRequest } from '../actions';


const mapStateToProps = (state, { params: { notificationId }}) => {
    let actualNotification = state.notifications.notifications.filter(notification => notification.id === parseInt(notificationId, 10))[0]

    return {
      request: actualNotification.request,
      notification: actualNotification
    }
}

const mapDispatchToProps = dispatch => ({
      setRequest: (request) => dispatch( setRequest(request))
})


export default connect(mapStateToProps,mapDispatchToProps)(NotificationForm);
