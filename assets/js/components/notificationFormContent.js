import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import NotificationForm from './notificationForm';
import { addRequest } from '../actions';

const mapStateToProps = (state, router) => ({
  request: state.request
});


export default connect(mapStateToProps)(NotificationForm);
