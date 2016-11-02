import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import NotificationForm from '../components/notificationForm';
import { setRequest, getNotifications } from '../actions';


const mapStateToProps = (state, { params: { notificationId }}) => {
    let actualNotification = state.notifications.notifications.filter(notification => notification.id === parseInt(notificationId, 10))[0];
    actualNotification = actualNotification ? actualNotification : state.notifications.notifications[0];
    return {
      request: actualNotification.request,
      notification: actualNotification
    }
}

const mapDispatchToProps = dispatch => ({
      setRequest: (notificationId) => dispatch( setRequest(notificationId)),
      getNotifications: () => dispatch( getNotifications(null))
})


export default connect(mapStateToProps,mapDispatchToProps)(NotificationForm);
