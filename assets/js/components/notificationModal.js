import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Modal} from 'react-bootstrap';
import ArtworkRequest from './artworkRequest'

class NotificationModal extends Component {

  closeModal() { this.props.hideNotifictionModal();  }

  render(){
    return (
      <span>
        <Modal show={this.props.showModal} onHide={this.closeModal.bind(this)}>
        <Modal.Header closeButton>
            {
              this.props.userType!=='artist' ?
              <Modal.Title>Detalle solicitudes</Modal.Title> :
              <Modal.Title>Postular Sonido</Modal.Title>
            }
        </Modal.Header>
        <Modal.Body>
             {
               this.props.userType!=='artist' ?
                <ArtworkRequest request={this.props.modalRequest}/> :
                <button>Subir</button>
              }
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </Modal>
      </span>
    )
  }
}

export default NotificationModal;
