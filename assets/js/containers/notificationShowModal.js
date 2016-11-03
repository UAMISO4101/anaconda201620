import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import NotificationModal from '../components/notificationModal'

import {
  hideNotifictionModal
} from '../actions';

import { connect } from 'react-redux';

const mapStateToProps = (state,  router) => {
  return {
    showModal: state.notificationModal.showModal,
    modalRequest : state.notificationModal.modalRequest,
    userType : state.notificationModal.userType
  }
};

const mapDispatchToProps = dispatch => ({
  hideNotifictionModal: () => dispatch(hideNotifictionModal()),
})

export default connect(mapStateToProps,mapDispatchToProps)(NotificationModal);
