import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { CA_DASHBOARD } from './utils/constants';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducers';
reducers.routing = routerReducer;


const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware));
const history = syncHistoryWithStore(hashHistory, store);

import App from './components/app';
import NotificationForm from './components/notificationForm';
import SoundtracksContent from './components/soundtracksContent';
import Page404 from './components/page404';

function run () {
  let state = store.getState();
  ReactDOM.render((<Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} >
        <IndexRedirect to='/home' />
        <Route path="home" component={SoundtracksContent} />
        <Route path="dashboard">
          <Route path="agente-comercial" component={NotificationForm} />
        </Route>
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
