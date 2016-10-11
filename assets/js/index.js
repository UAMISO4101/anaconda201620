import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRedirect,IndexRoute } from 'react-router';
import { CA_DASHBOARD } from './utils/constants';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducers';
reducers.routing = routerReducer;


const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware));
const history = syncHistoryWithStore(hashHistory, store);

import App from './components/app';
import NotificationFormContent from './components/notificationFormContent';
import NotificationFormEdit from './components/notificationFormEdit';
import Notification from './components/notifications';
import SoundtracksContent from './components/soundtracksContent';
import NotificationContent from './components/notificationsContent';
import Page404 from './components/page404';

function run () {
  let state = store.getState();
  ReactDOM.render((<Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} >
        <IndexRedirect to='/' />
        <IndexRoute component={SoundtracksContent} />
        <Route path="dashboard">
          <Route path="agente-comercial" >
            <IndexRoute component={NotificationFormContent} />
            <Route path='convocatoria/:notificationId' component={NotificationFormEdit} />
            <Route path="convocatorias/:tipo" component={NotificationContent} />
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
