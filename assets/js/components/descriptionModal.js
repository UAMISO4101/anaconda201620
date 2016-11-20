import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Modal} from 'react-bootstrap';
import ArtworkRequestContainer from '../containers/artworkRequestContainer'

class DescriptionModal extends Component {

  closeModal() { this.props.hideDescriptionModal();  }

  render(){
    return (
      <span>
        <Modal show={this.props.showModal} onHide={this.closeModal.bind(this)} bsSize="large" >
          <Modal.Header closeButton>
              <Modal.Title>Descripción convocatoria</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="contact-section">
                  <p> {this.props.modalRequest}</p>
              </div>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </span>
    )
  }
}

export default DescriptionModal;
