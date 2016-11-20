import * as reducers from './reducers';
import { requireAuth, isArtist, isComercialAgent } from './utils/auth';
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
import LoginContent from './containers/loginContent';
import NotificationFormContent from './containers/notificationFormContent';
import NotificationFormEdit from './containers/notificationFormEdit';
import NotificationArtist from './containers/notificationArtist';
import Notification from './components/notifications';
import SoundtracksContent from './containers/soundtracksContent';
import NotificationContent from './containers/notificationsContent';
import ProposalsContent from './containers/proposalsContent';
import Page404 from './components/page404';

function run () {
  let state = store.getState();
  ReactDOM.render((<Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} >
        <IndexRedirect to='/' />
        <IndexRoute component={SoundtracksContent} />
        <Route path='auth' component={LoginContent} />

        <Route path="dashboard" onEnter={requireAuth}>
          <Route path="agente-comercial/:id" onEnter={isComercialAgent}>
            <IndexRoute component={NotificationFormContent} />
            <Route path="convocatoria/:notificationId" >
              <IndexRoute component={NotificationFormEdit} />
              <Route path='votacion' component={ProposalsContent} />
            </Route>
            <Route path="convocatorias" component={NotificationContent} />
          </Route>
          
          <Route path="artista/:id" onEnter={isArtist}>
            <IndexRedirect to="/convocatorias" />
            <Route path="convocatorias" component={NotificationArtist} />
            <Route path="convocatoria/:notificationId" >
              <Route path='votacion' component={ProposalsContent} />
            </Route>
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
