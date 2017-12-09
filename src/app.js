import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
// Provider component takes the store and pass it
// around differen components
import { Provider } from 'react-redux';
import { Router, Route, browserHistory  } from 'react-router';
import { syncHistoryWithStore, routerReducer, ConnectedRouter  } from 'react-router-redux';
// import { createBrowserHistory } from 'history';
import * as reducers from './reducers';
reducers.routing = routerReducer;

import * as localStore from './localStore';

import App from './components/App';
import VisibleCards from './components/VisibleCards';

// Main reducer
const store = createStore(combineReducers(reducers), localStore.get());

const history = syncHistoryWithStore(browserHistory, store);
// const history = ConnectedRouter (createBrowserHistory(), store);
// const history = syncHistoryWithStore(createBrowserHistory(), store);

// RENDERING
function run() {
  let state = store.getState();

  localStore.set(state, ['decks', 'cards']);

  ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
          <Route path='/' component={App} >
            <Route path='/deck/:deckId' component={VisibleCards} />
          </Route>
      </Router>
  </Provider>
  ), document.getElementById('root'));
}

run();
store.subscribe(run);
