import React from 'react';
import { ListGroupItem } from 'react-bootstrap'

const Request = ({ rq }) => {
  return (
    <li class="list-group-item">
      {`${rq.name}, ${rq.features}.`}
    </li>);
};

export default Request;
