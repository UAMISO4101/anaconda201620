/**
* Created by danielordonez on 10/5/16.
*/
import Request from '../components/request'
import { deleteRequest } from '../actions';

import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  deleteRequest: (requestId) => dispatch(deleteRequest(requestId))
})

export default connect(()=>({}),mapDispatchToProps)(Request);
