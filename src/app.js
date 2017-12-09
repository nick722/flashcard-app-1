import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
// Provider component takes the store and pass it
// around differen components
import { Provider } from 'react-redux';
import { Router, Route/*, browserHistory*/ } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import * as reducers from './reducers';
reducers.routing = routerReducer;

import App from './components/App';
import VisibleCards from './components/VisibleCards';

// Main reducer
const store = createStore(combineReducers(reducers));

// const history = syncHistoryWithStore(browserHistory, store);
const history = syncHistoryWithStore(createBrowserHistory(), store);

// RENDERING
function run() {
  let state = store.getState();
  ReactDOM.render((
    // Provider is wrapping all components and
    // and gives them the store as context
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={App}>
          <Route path='/deck/:deckId' component={VisibleCards} />
        </Route>
      </Router>
  </Provider>
  ), document.getElementById('root'));
}

run();
store.subscribe(run);
