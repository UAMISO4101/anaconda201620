import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import NotificationForm from '../components/notificationForm';
import { addRequest } from '../actions';

const mapStateToProps = (state, { params: { id }}) => ({
  notification: state.notification,
  request: state.request,
  userId: parseInt(id, 10),
});


export default connect(mapStateToProps)(NotificationForm);
