import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import NotificationForm from '../components/notificationForm';
import { setRequest, getNotifications } from '../actions';
import { NOTIFICATION_TYPE } from '../utils/constants';


const mapStateToProps = (state, { params: { notificationId }}) => {
    let actualNotification = state.notifications.notifications.filter(notification => notification.id === parseInt(notificationId, 10))[0];
    actualNotification = actualNotification ? actualNotification : state.notifications.notifications[0];
    return {
      request: state.request || actualNotification.request,
      notification: actualNotification,
      notification_state: NOTIFICATION_TYPE.EDIT,
    }
}

const mapDispatchToProps = dispatch => ({
      setRequest: (notificationId) => dispatch( setRequest(notificationId)),
      getNotifications: () => dispatch( getNotifications(null))
})


export default connect(mapStateToProps,mapDispatchToProps)(NotificationForm);
