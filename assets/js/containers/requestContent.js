import Request from '../components/request'
import { deleteRequest } from '../actions';

import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  deleteRequest: (requestId) => dispatch(deleteRequest(requestId))
})

export default connect(()=>({}),mapDispatchToProps)(Request);
