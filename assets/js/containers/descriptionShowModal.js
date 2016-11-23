import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DescriptionModal from '../components/descriptionModal'

import {
  hideDescriptionModal
} from '../actions';

import { connect } from 'react-redux';

const mapStateToProps = (state,  router) => {
  return {
    showModal: state.descriptionModal.showModal,
    modalRequest : state.descriptionModal.modalRequest
  }
};

const mapDispatchToProps = dispatch => ({
  hideDescriptionModal: () => dispatch(hideDescriptionModal())
})

export default connect(mapStateToProps,mapDispatchToProps)(DescriptionModal);
