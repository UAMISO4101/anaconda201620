import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducers';
reducers.routing = routerReducer;


const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware));
const history = syncHistoryWithStore(hashHistory, store);

import App from './components/app';
import Navbar from './components/navbar';
/*
<Router history={history}>
  <Route path='/' component={Navbar}>
    <Route path="dashboard" >
      <Route path="agente-comercial" component={App} />
    </Route>
  </Route>
  <Redirect from="/" to="dashboard/agente-comercial" />
</Router>

*/
function run () {
  let state = store.getState();
  ReactDOM.render((<Provider store={store}>
    <Router history={history}>
      <Route path='/'>
        <IndexRedirect to="/dashboard/agente-comercial" />
        <Route path="dashboard">
          <Route path="agente-comercial" component={App} />
        </Route>
      </Route>
    </Router>
  </Provider>), document.getElementById("container"));
}




function init () {
  run();
  store.subscribe(run);
}

init();
