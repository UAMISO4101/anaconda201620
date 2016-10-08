import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import NotificationForm from './notificationForm';
import { addRequest } from '../actions';


const mapStateToProps = (state, { params: { notificationId }}) => ({
    request: state.request,
    notification: state.notifications.notifications.filter(notification => notification.id === parseInt(notificationId, 10))[0]
})




export default connect(mapStateToProps)(NotificationForm);
