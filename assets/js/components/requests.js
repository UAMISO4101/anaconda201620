import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Checkbox,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap'

class Requests extends Component {
  render(){
    return(
      <Row bsClass="sl-modal">
        <div className="border col-sm-4">
          <h6>Lista de Solicitudes</h6>
          <ListGroup bsClass="list">
            <ListGroupItem>Item 1</ListGroupItem>
            <ListGroupItem>Item 2</ListGroupItem>
            <ListGroupItem>Item 1</ListGroupItem>
            <ListGroupItem>Item 2</ListGroupItem>
            <ListGroupItem>Item 1</ListGroupItem>
            <ListGroupItem>Item 2</ListGroupItem>
            <ListGroupItem>Item 1</ListGroupItem>
            <ListGroupItem>Item 2</ListGroupItem>
            <ListGroupItem>Item 1</ListGroupItem>
            <ListGroupItem>Item 2</ListGroupItem>
            <ListGroupItem>Item 1</ListGroupItem>
            <ListGroupItem>Item 2</ListGroupItem>
            <ListGroupItem>...</ListGroupItem>
          </ListGroup>
        </div>
        <div className="col-sm-push-1 col-sm-6 border"   >
          <br/>  <br/>
          <Form horizontal onSubmit={this.requestForm} >
            <FormGroup controlId="requestName">
              <Col sm={12}>
                <input ref="requestName" type="text" className="form-control" placeholder="Nombre de la solicitud."/>
              </Col>
            </FormGroup>

            <FormGroup controlId="requestDescription">
              <Col sm={12}>
                <input ref="requestDescription"  type="text-area" className="form-control" placeholder="Descripción"/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button  type="submit">
                  Enviar Solicitud
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </Row>
    )
  }
  requestForm(event){
    event.preventDefault();
    let name = ReactDOM.findDOMNode(this.refs.requestName).value;
    let feat = ReactDOM.findDOMNode(this.refs.requestDescription).value;
    
  }

}

export default Requests;
