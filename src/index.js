import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory  } from 'react-router';
import { syncHistoryWithStore, routerReducer, ConnectedRouter  } from 'react-router-redux';
import * as reducers from './reducers';
reducers.routing = routerReducer;

import * as localStore from './localStore';

import App from './components/App';
import VisibleCards from './components/VisibleCards';
import NewCardModal from './components/NewCardModal';
import EditCardModal from './components/EditCardModal';
import StudyModal from './components/StudyModal';

// Main reducer
const store = createStore(combineReducers(reducers), localStore.get());

const history = syncHistoryWithStore(browserHistory, store);

function run() {
  let state = store.getState();

  localStore.set(state, ['decks', 'cards']);

  ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
          <Route path='/' component={App} >
            <Route path='/deck/:deckId' component={VisibleCards}>
              <Route path='/deck/:deckId/new' component={NewCardModal} />
              <Route path='/deck/:deckId/edit/:cardId' component={EditCardModal} />
              <Route path='/deck/:deckId/study' component={StudyModal} />
            </Route>
          </Route>
      </Router>
  </Provider>
  ), document.getElementById('root'));
}

run();
store.subscribe(run);
