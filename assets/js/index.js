import * as reducers from './reducers';
import { requireAuth, role } from './utils/auth';
import { CA_DASHBOARD } from './utils/constants';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect,IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

reducers.routing = routerReducer;

const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware));
const history = syncHistoryWithStore(hashHistory, store);

import App from './components/app';
import Login from './components/login';
import NotificationFormContent from './containers/notificationFormContent';
import NotificationFormEdit from './containers/notificationFormEdit';
import NotificationArtist from './containers/notificationArtist';
import Notification from './components/notifications';
import SoundtracksContent from './containers/soundtracksContent';
import NotificationContent from './containers/notificationsContent';
import ProposalContent from './containers/proposalContent';
import Page404 from './components/page404';

function run () {
  let state = store.getState();
  ReactDOM.render((<Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} >
        <IndexRedirect to='/' />
        <IndexRoute component={SoundtracksContent} />
        <Route path='login' component={Login} />

        <Route path="dashboard" onEnter={requireAuth}>
          <Route path="agente-comercial"  onEnter={role.comercialAgent}>
            <IndexRoute component={NotificationFormContent} />
            <Route path="convocatoria/:notificationId" >
              <IndexRoute component={NotificationFormEdit} />
              <Route path='votacion' component={ProposalContent} />
            </Route>
            <Route path="convocatorias" component={NotificationContent} />
          </Route>
          <Route path="artista/:id" onEnter={role.artist}>
            <IndexRedirect to="/convocatorias" />
            <Route path="convocatorias" component={NotificationArtist} />
          </Route>
        </Route>
        <Route path="participar(/:tipo)" component={NotificationContent} />
      </Route>
      <Route path="*" component={Page404} />
    </Router>
  </Provider>), document.getElementById("container"));
}




function init () {
  run();
  store.subscribe(run);
}

init();
