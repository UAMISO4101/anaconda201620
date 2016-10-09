/**
* Created by danielordonez on 10/5/16.
*/
import Request from './request'
import {
  editNotification,
  fetchNotifications,
  hideSAModal,
  publishNotification,
  showSAModal,
} from '../actions';

import { connect } from 'react-redux';

const mapStateToProps = (state, router) => ({

});

const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps,mapDispatchToProps)(Request);
