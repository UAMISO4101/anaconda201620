import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import NotificationForm from '../components/notificationForm';
import { addRequest } from '../actions';
import { NOTIFICATION_TYPE } from '../utils/constants';

const mapStateToProps = (state, { params: { id }}) => ({
  notification: state.notification,
  notification_state: NOTIFICATION_TYPE.CREATE,
  request: state.request,
  userId: parseInt(id, 10),
});


export default connect(mapStateToProps)(NotificationForm);
